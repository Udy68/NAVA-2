import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  Brain, 
  Lightbulb,
  Move,
  Maximize2,
  Minimize2
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

type EmotionState = "happy" | "neutral" | "excited" | "angry" | "sleepy" | "love" | "thinking";

interface EyePosition {
  x: number;
  y: number;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export function MovableChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [emotion, setEmotion] = useState<EmotionState>("happy");
  const [eyePosition, setEyePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Position and size state for dragging and resizing
  const [position, setPosition] = useState<Position>({ x: window.innerWidth - 100, y: window.innerHeight / 2 - 40 });
  const [chatPosition, setChatPosition] = useState<Position>({ x: window.innerWidth - 420, y: window.innerHeight / 2 - 250 });
  const [chatSize, setChatSize] = useState<Size>({ width: 384, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const botRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "👋 Hello! I'm your AI Career Advisor powered by advanced algorithms. I can help you with course recommendations, college information, career guidance, and answer questions about scholarships and internships. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "What courses should I choose after 12th?",
        "Show me career mapping for Engineering",
        "Tell me about short-term courses",
        "What jobs can I get with Commerce stream?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      const chatMaxX = window.innerWidth - chatSize.width;
      const chatMaxY = window.innerHeight - chatSize.height;
      
      setPosition(prev => ({
        x: Math.min(prev.x, maxX),
        y: Math.min(prev.y, maxY)
      }));
      
      setChatPosition(prev => ({
        x: Math.min(prev.x, chatMaxX),
        y: Math.min(prev.y, chatMaxY)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chatSize]);

  // Mouse drag functionality for bot
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return;
    
    setIsDragging(true);
    const rect = botRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Mouse drag functionality for chat window
  const handleChatMouseDown = (e: React.MouseEvent) => {
    if (e.target === resizeHandleRef.current) return;
    
    setIsDragging(true);
    const rect = chatContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // Global mouse move and up handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - (isOpen ? chatSize.width : 80)));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - (isOpen ? chatSize.height : 80)));
        
        if (isOpen) {
          setChatPosition({ x: newX, y: newY });
        } else {
          setPosition({ x: newX, y: newY });
        }
      } else if (isResizing && isOpen) {
        const rect = chatContainerRef.current?.getBoundingClientRect();
        if (rect) {
          const newWidth = Math.max(320, Math.min(e.clientX - rect.left + 20, window.innerWidth - chatPosition.x));
          const newHeight = Math.max(400, Math.min(e.clientY - rect.top + 20, window.innerHeight - chatPosition.y));
          setChatSize({ width: newWidth, height: newHeight });
        }
      } else if (!isOpen) {
        // Eye tracking mouse movement
        if (botRef.current) {
          const rect = botRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = e.clientX - centerX;
          const deltaY = e.clientY - centerY;
          
          const maxDistance = 100;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const normalizedDistance = Math.min(distance / maxDistance, 1);
          
          const angle = Math.atan2(deltaY, deltaX);
          const eyeRange = 8;
          
          setEyePosition({
            x: Math.cos(angle) * normalizedDistance * eyeRange,
            y: Math.sin(angle) * normalizedDistance * eyeRange
          });
          
          setLastInteraction(Date.now());
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, chatPosition, chatSize, isOpen]);

  // Resize handle mouse down
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  // Maximize/Minimize functionality
  const toggleMaximize = () => {
    if (isMaximized) {
      setChatSize({ width: 384, height: 500 });
      setChatPosition({ x: window.innerWidth - 420, y: window.innerHeight / 2 - 250 });
      setIsMaximized(false);
    } else {
      setChatSize({ width: window.innerWidth * 0.8, height: window.innerHeight * 0.8 });
      setChatPosition({ x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 });
      setIsMaximized(true);
    }
  };

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isOpen && Math.random() < 0.1) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, [isOpen]);

  // Emotion based on inactivity
  useEffect(() => {
    const emotionInterval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteraction;
      
      if (timeSinceInteraction > 10000 && !isOpen) {
        setEmotion("sleepy");
      } else if (timeSinceInteraction > 5000 && !isOpen) {
        setEmotion("neutral");
      } else if (isTyping) {
        setEmotion("thinking");
      } else {
        setEmotion("happy");
      }
    }, 1000);

    return () => clearInterval(emotionInterval);
  }, [lastInteraction, isTyping, isOpen]);

  // Handle click interactions
  const handleBotClick = () => {
    if (isDragging) return;
    
    setLastInteraction(Date.now());
    
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    setClickCount(prev => prev + 1);

    setClickTimer(setTimeout(() => {
      if (clickCount >= 2) {
        setEmotion("angry");
        setTimeout(() => setEmotion("happy"), 3000);
      } else {
        setEmotion("excited");
        setTimeout(() => setEmotion("happy"), 1500);
      }
      setClickCount(0);
    }, 300));

    if (!isOpen) {
      setIsOpen(true);
      // Position chat window near the bot
      setChatPosition({
        x: Math.max(0, Math.min(position.x - chatSize.width + 80, window.innerWidth - chatSize.width)),
        y: Math.max(0, Math.min(position.y, window.innerHeight - chatSize.height))
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const generateBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("course") || lowerMessage.includes("stream") || lowerMessage.includes("12th")) {
      return {
        content: "🎯 **Course Selection After 12th**\n\nBased on your interests and academic performance, here are the main streams with career outcomes:\n\n**📚 Science Stream (PCM/PCB)**\n• Engineering → Software Engineer, Data Scientist, Civil Engineer\n• Medical → Doctor, Pharmacist, Medical Researcher\n• Research → Scientist, Lab Technician, R&D Specialist\n\n**💼 Commerce Stream**\n• CA/CMA → Chartered Accountant, Tax Consultant\n• BBA/MBA → Business Manager, Entrepreneur\n• Economics → Policy Analyst, Financial Advisor\n\n**🎨 Arts/Humanities**\n• Psychology → Counselor, HR Specialist\n• Journalism → Media Professional, Content Creator\n• Law → Lawyer, Legal Advisor\n\n💡 **Pro Tip**: Visit our **Course-to-Career Mapping** section to see detailed visual flowcharts, salary prospects, and compare short-term vs long-term options!",
        suggestions: ["Open Course Mapping", "Show Engineering career map", "Short-term vs long-term courses", "Take career assessment"]
      };
    }

    if (lowerMessage.includes("scholarship") || lowerMessage.includes("financial aid")) {
      return {
        content: "🎓 **Scholarship Opportunities & Financial Aid**\n\n**Government Scholarships:**\n• **National Scholarship Portal**: Merit and need-based scholarships\n• **PM Special Scholarship**: For J&K students studying outside the state\n• **Technical Education Scholarships**: AICTE and other technical programs\n• **Category-based Scholarships**: SC/ST, OBC, and minority scholarships\n\n**Private & International Scholarships:**\n• **Tata Scholarships**: For undergraduate studies\n• **Reliance Foundation**: Merit-based support\n• **International Options**: Study abroad funding\n• **Corporate Scholarships**: Company-sponsored education\n\n**Application Timeline:**\n• April-June: Most applications open\n• July-August: Document submission\n• September-October: Selection process\n• November onwards: Disbursement begins\n\n💡 **Pro Tips:**\n✅ Apply early - limited seats available\n✅ Maintain good academic record\n✅ Prepare all documents in advance\n✅ Apply to multiple scholarships\n\nWould you like me to show you scholarships you're eligible for?",
        suggestions: ["Show eligible scholarships", "Application deadlines", "Required documents", "Merit vs need-based scholarships"]
      };
    }
    
    return {
      content: "🤖 **Welcome to Your AI Career Advisor!**\n\nI'm here to help you navigate your career journey with:\n\n🎯 **Career Guidance**\n• Stream selection after 10th/12th\n• Interactive course-to-career mapping with visual flowcharts\n• Job prospects and salary information\n• Short-term vs long-term course comparisons\n\n🏫 **Education Planning**\n• College recommendations and admissions\n• Scholarship and financial aid guidance\n• Timeline tracking for important dates\n\n📊 **Personalized Insights**\n• Aptitude assessment recommendations\n• Industry trends and future opportunities\n• Skill development roadmaps\n\n💼 **Career Opportunities**\n• Internship programs and placements\n• Government job preparations\n• Entrepreneurship guidance\n\n🚀 **New Feature**: Check out our **Course-to-Career Mapping** section for interactive career flowcharts and detailed analysis!\n\nWhat specific area would you like to explore? I'm here to provide detailed, actionable insights! ✨",
      suggestions: ["Open Course Mapping", "Take career assessment", "Show scholarships", "Career path analysis"]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setEmotion("thinking");

    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setEmotion("love");
      setTimeout(() => setEmotion("happy"), 2000);
    }, 1500 + Math.random() * 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle ESC key to close chat
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setEmotion("happy");
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen]);

  // Enhanced close function with emotion feedback
  const handleCloseChat = () => {
    setIsOpen(false);
    setEmotion("neutral");
    setTimeout(() => setEmotion("happy"), 1000);
  };
  
  // Emotion-based eye and mouth styles
  const getEyeStyle = (isLeft: boolean) => {
    const baseEyeStyle = {
      transform: `translate(${eyePosition.x * (isLeft ? -1 : 1)}px, ${eyePosition.y}px)`
    };

    if (isBlinking || emotion === "sleepy") {
      return {
        ...baseEyeStyle,
        height: isBlinking ? "2px" : (emotion === "sleepy" ? "4px" : "8px"),
        transition: "height 0.15s ease"
      };
    }

    if (emotion === "angry") {
      return {
        ...baseEyeStyle,
        borderRadius: "0% 100% 0% 100%",
        backgroundColor: "#ef4444"
      };
    }

    if (emotion === "love") {
      return {
        ...baseEyeStyle,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        backgroundColor: "#ec4899"
      };
    }

    if (emotion === "excited") {
      return {
        ...baseEyeStyle,
        borderRadius: "50%",
        width: "12px",
        height: "12px",
        backgroundColor: "#06b6d4"
      };
    }

    return baseEyeStyle;
  };

  const getMouthStyle = () => {
    switch (emotion) {
      case "happy":
        return {
          width: "20px",
          height: "10px",
          border: "2px solid #374151",
          borderTop: "none",
          borderRadius: "0 0 20px 20px"
        };
      case "excited":
        return {
          width: "16px",
          height: "16px",
          border: "2px solid #06b6d4",
          borderRadius: "50%",
          backgroundColor: "#06b6d4"
        };
      case "angry":
        return {
          width: "20px",
          height: "10px",
          border: "2px solid #ef4444",
          borderBottom: "none",
          borderRadius: "20px 20px 0 0"
        };
      case "love":
        return {
          width: "12px",
          height: "8px",
          backgroundColor: "#ec4899",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%"
        };
      case "thinking":
        return {
          width: "16px",
          height: "8px",
          border: "2px solid #6b7280",
          borderRadius: "8px"
        };
      case "sleepy":
        return {
          width: "14px",
          height: "6px",
          border: "2px solid #9ca3af",
          borderRadius: "6px"
        };
      default:
        return {
          width: "18px",
          height: "9px",
          border: "2px solid #374151",
          borderTop: "none",
          borderRadius: "0 0 18px 18px"
        };
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        ref={botRef}
        onMouseDown={handleMouseDown}
        onClick={handleBotClick}
        className={`fixed z-[100] cursor-pointer transition-all duration-500 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 hover:scale-110"
        } ${isDragging ? "cursor-move" : "cursor-pointer"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="relative flex items-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-75 animate-pulse group-hover:opacity-100"></div>
          
          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center border-2 border-white dark:border-gray-700 group-hover:shadow-3xl transition-shadow duration-300">
            <div className="relative w-12 h-12 flex flex-col items-center justify-center">
              <div className="flex space-x-3 mb-1">
                <div 
                  className="w-2 h-2 bg-white rounded-full transition-all duration-300"
                  style={getEyeStyle(true)}
                />
                <div 
                  className="w-2 h-2 bg-white rounded-full transition-all duration-300"
                  style={getEyeStyle(false)}
                />
              </div>
              
              <div 
                className="transition-all duration-300"
                style={getMouthStyle()}
              />
            </div>

            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-700">
              {emotion === "thinking" && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                </div>
              )}
              {emotion === "love" && (
                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                  ❤️
                </div>
              )}
              {emotion === "angry" && (
                <div className="w-full h-full bg-red-500 rounded-full border-2 border-white dark:border-gray-700"></div>
              )}
              {emotion === "excited" && (
                <Sparkles className="h-2 w-2 text-white absolute top-0.5 left-0.5 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed z-[100] shadow-2xl border-2 border-blue-200 dark:border-blue-700 transition-all duration-500 bg-white dark:bg-gray-900 overflow-hidden rounded-xl ${isDragging ? "cursor-move" : ""}`}
          style={{
            left: `${chatPosition.x}px`,
            top: `${chatPosition.y}px`,
            width: `${chatSize.width}px`,
            height: `${chatSize.height}px`,
          }}
        >
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 cursor-move"
            onMouseDown={handleChatMouseDown}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                      <div className="flex space-x-1 mb-0.5">
                        <div className="w-1 h-1 bg-white rounded-full" style={getEyeStyle(true)} />
                        <div className="w-1 h-1 bg-white rounded-full" style={getEyeStyle(false)} />
                      </div>
                      <div className="w-2 h-1 border border-white rounded-full" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse">
                    <Zap className="h-2 w-2 text-white absolute top-0.5 left-0.5" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Career Advisor</h3>
                  <div className="flex items-center text-xs text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    <span>Online & {emotion === "thinking" ? "Thinking..." : "Ready to Help"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMaximize}
                  className="h-8 w-8 text-white hover:bg-white/20 transition-colors"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseChat}
                  className="h-10 w-10 text-white hover:bg-red-500/80 hover:text-white transition-colors hover:scale-110 rounded-full border-2 border-white/20 hover:border-red-300/50 shadow-lg hover:shadow-xl bg-red-500/20"
                  title="Close Chat (Press ESC)"
                >
                  <X className="h-6 w-6 font-bold transition-all duration-200 hover:rotate-90" strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
            <ScrollArea className="flex-1 px-4 py-2" style={{ maxHeight: `${chatSize.height - 140}px` }}>
              <div className="space-y-4 pb-4 min-h-full">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex items-start space-x-2 ${
                      message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user" 
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                          : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 shadow-md"
                      }`}>
                        {message.type === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        )}
                      </div>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto"
                          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                      }`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                    
                    {message.suggestions && message.type === "bot" && (
                      <div className="flex flex-wrap gap-2 pl-10">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 transition-all duration-200 hover:scale-105 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:shadow-md"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-md">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about careers..."
                  className="flex-1 text-sm border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Help text */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to send
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Press ESC to close
                </p>
              </div>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            ref={resizeHandleRef}
            onMouseDown={handleResizeMouseDown}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gradient-to-r from-blue-600 to-purple-600 opacity-60 hover:opacity-80 transition-opacity"
            style={{
              borderTopLeftRadius: "4px",
            }}
          />
        </div>
      )}
    </>
  );
}