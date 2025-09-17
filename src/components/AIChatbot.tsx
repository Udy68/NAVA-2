import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Brain, Lightbulb } from "lucide-react";

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

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [emotion, setEmotion] = useState<EmotionState>("happy");
  const [eyePosition, setEyePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  
  const botRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
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

  // Eye tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (botRef.current && !isOpen) {
        const rect = botRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Normalize the eye movement (limit the range)
        const maxDistance = 100;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        
        const angle = Math.atan2(deltaY, deltaX);
        const eyeRange = 8; // Maximum eye movement in pixels
        
        setEyePosition({
          x: Math.cos(angle) * normalizedDistance * eyeRange,
          y: Math.sin(angle) * normalizedDistance * eyeRange
        });
        
        setLastInteraction(Date.now());
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isOpen && Math.random() < 0.1) { // 10% chance every 200ms
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
    setLastInteraction(Date.now());
    
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    setClickCount(prev => prev + 1);

    setClickTimer(setTimeout(() => {
      if (clickCount >= 2) {
        // Double tap - make angry
        setEmotion("angry");
        setTimeout(() => setEmotion("happy"), 3000);
      } else {
        // Single tap - make excited
        setEmotion("excited");
        setTimeout(() => setEmotion("happy"), 1500);
      }
      setClickCount(0);
    }, 300));

    if (!isOpen) {
      setIsOpen(true);
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
    
    // Enhanced AI responses with more detailed career information
    if (lowerMessage.includes("course") || lowerMessage.includes("stream") || lowerMessage.includes("12th")) {
      return {
        content: "🎯 **Course Selection After 12th**\n\nBased on your interests and academic performance, here are the main streams with career outcomes:\n\n**📚 Science Stream (PCM/PCB)**\n• Engineering → Software Engineer, Data Scientist, Civil Engineer\n• Medical → Doctor, Pharmacist, Medical Researcher\n• Research → Scientist, Lab Technician, R&D Specialist\n\n**💼 Commerce Stream**\n• CA/CMA → Chartered Accountant, Tax Consultant\n• BBA/MBA → Business Manager, Entrepreneur\n• Economics → Policy Analyst, Financial Advisor\n\n**🎨 Arts/Humanities**\n• Psychology → Counselor, HR Specialist\n• Journalism → Media Professional, Content Creator\n• Law → Lawyer, Legal Advisor\n\n💡 **Pro Tip**: Visit our **Course-to-Career Mapping** section to see detailed visual flowcharts, salary prospects, and compare short-term vs long-term options!",
        suggestions: ["Open Course Mapping", "Show Engineering career map", "Short-term vs long-term courses", "Take career assessment"]
      };
    }

    if (lowerMessage.includes("short") && lowerMessage.includes("course")) {
      return {
        content: "⚡ **Short-term vs Long-term Courses**\n\n**Short-term Courses (6 months - 2 years):**\n• **Digital Marketing** → Social Media Manager, SEO Specialist\n• **Web Development** → Frontend Developer, Freelancer\n• **Data Analytics** → Data Analyst, Business Intelligence\n• **Graphic Design** → UI/UX Designer, Creative Director\n\n**Benefits of Short-term:**\n✅ Quick job entry (6-18 months)\n✅ Lower investment\n✅ Industry-relevant skills\n✅ Can combine with degree\n\n**Long-term Benefits:**\n✅ Higher salary potential\n✅ Leadership opportunities\n✅ Comprehensive knowledge\n✅ Career stability\n\n**My Recommendation:** Consider short-term courses as skill boosters alongside your degree for maximum career advantage!",
        suggestions: ["Show specific short courses", "Compare salary prospects", "Digital skills courses", "Career timeline planning"]
      };
    }

    if (lowerMessage.includes("job") || lowerMessage.includes("career outcome") || lowerMessage.includes("salary")) {
      return {
        content: "💰 **Career Outcomes & Job Prospects**\n\n**Engineering Careers:**\n• Software Engineer: ₹6-25 LPA\n• Data Scientist: ₹8-30 LPA\n• Mechanical Engineer: ₹4-15 LPA\n• Civil Engineer: ₹3-12 LPA\n\n**Commerce Careers:**\n• Chartered Accountant: ₹8-50+ LPA\n• Investment Banker: ₹12-40 LPA\n• Business Analyst: ₹6-20 LPA\n• Financial Advisor: ₹4-18 LPA\n\n**Medical Careers:**\n• Doctor (MBBS): ₹8-50+ LPA\n• Pharmacist: ₹3-12 LPA\n• Medical Researcher: ₹6-25 LPA\n\n**Growth Industries (2025):**\n🚀 AI & Machine Learning\n🚀 Renewable Energy\n🚀 Healthcare Technology\n🚀 Fintech & Blockchain\n\nWant to see the complete career roadmap for any specific field?",
        suggestions: ["Show AI career path", "Healthcare tech opportunities", "Fintech career map", "Government job prospects"]
      };
    }

    if (lowerMessage.includes("engineering") || lowerMessage.includes("mapping") || lowerMessage.includes("flowchart")) {
      return {
        content: "🔧 **Engineering Course-to-Career Mapping**\n\n**Computer Science Engineering Path:**\n📚 B.Tech CSE (4 years)\n   ↓\n🎯 **Career Options:**\n• Software Developer → Senior Dev → Tech Lead → CTO\n• Data Scientist → ML Engineer → AI Research Lead\n• Cybersecurity → Security Architect → CISO\n• Product Manager → Senior PM → VP Product\n\n**Mechanical Engineering Path:**\n📚 B.Tech Mechanical (4 years)\n   ↓\n🎯 **Career Options:**\n• Design Engineer → Senior Designer → Chief Engineer\n• Manufacturing → Operations Manager → Plant Head\n• Automotive → R&D → Chief Technology Officer\n• Robotics → Automation Expert → Innovation Head\n\n**Timeline to Success:**\n• Years 1-2: Foundation & Internships\n• Years 3-5: Specialization & First Job\n• Years 5-10: Leadership & Expertise\n• Years 10+: Senior Management/Entrepreneurship\n\n🚀 **Want to see this in action?** Check out our interactive **Course-to-Career Mapping** section with visual flowcharts, salary comparisons, and detailed career timelines!",
        suggestions: ["Open Course Mapping", "CSE detailed roadmap", "Compare with short-term courses", "Engineering salary prospects"]
      };
    }
    
    if (lowerMessage.includes("commerce") || lowerMessage.includes("business") || lowerMessage.includes("ca") || lowerMessage.includes("mba")) {
      return {
        content: "💼 **Commerce Stream Career Mapping**\n\n**Chartered Accountancy Path:**\n📚 CA Foundation → Intermediate → Final (3-4 years)\n   ↓\n🎯 **Career Progression:**\n• Junior Accountant → Senior Accountant → Finance Manager\n• Tax Consultant → Tax Partner → Practice Owner\n• Audit Associate → Audit Manager → Partner\n• Corporate Finance → CFO → CEO\n\n**MBA Path:**\n📚 BBA/B.Com (3 years) → MBA (2 years)\n   ↓\n🎯 **Specialization Options:**\n• **Finance MBA** → Investment Banking, Portfolio Management\n• **Marketing MBA** → Brand Manager, Digital Marketing Head\n• **Operations MBA** → Supply Chain, Process Excellence\n• **HR MBA** → Talent Acquisition, Organizational Development\n\n**Salary Growth Timeline:**\n• Entry Level: ₹4-8 LPA\n• Mid Level (5-8 years): ₹12-25 LPA\n• Senior Level (10+ years): ₹30-60+ LPA\n\n**Alternative Fast-Track Options:**\n• CFA (Financial Analyst): 2-3 years\n• Digital Marketing Certification: 6-12 months\n• Data Analytics for Business: 8-15 months",
        suggestions: ["CA vs MBA comparison", "Finance career roadmap", "Marketing specialization", "Business analytics path"]
      };
    }

    if (lowerMessage.includes("medical") || lowerMessage.includes("doctor") || lowerMessage.includes("healthcare")) {
      return {
        content: "🏥 **Medical & Healthcare Career Mapping**\n\n**MBBS Path (Traditional):**\n📚 MBBS (5.5 years) → Internship (1 year) → MD/MS (3 years)\n   ↓\n🎯 **Specialization Options:**\n• General Physician → Senior Consultant → Hospital Director\n• Surgeon → Specialist Surgeon → Department Head\n• Pediatrician → Child Specialist → Medical Superintendent\n• Radiologist → Senior Radiologist → Imaging Center Owner\n\n**Alternative Healthcare Careers:**\n📚 **Pharmacy** (4 years) → Clinical Pharmacist → Drug Research\n📚 **Physiotherapy** (4.5 years) → Sports Therapist → Clinic Owner\n📚 **Nursing** (4 years) → Head Nurse → Hospital Administrator\n📚 **Medical Technology** (3-4 years) → Lab Manager → Diagnostic Center\n\n**Emerging Healthcare Fields:**\n🚀 **Telemedicine** → Remote Healthcare Provider\n🚀 **Health Tech** → Medical App Developer\n🚀 **Biomedical Engineering** → Medical Device Designer\n🚀 **Health Analytics** → Healthcare Data Scientist\n\n**Salary Prospects:**\n• Resident Doctor: ₹6-12 LPA\n• Specialist: ₹15-40 LPA\n• Super Specialist: ₹30-100+ LPA\n• Healthcare Entrepreneur: Unlimited potential",
        suggestions: ["NEET preparation guide", "Medical specializations", "Healthcare tech careers", "Alternative medical courses"]
      };
    }
    
    if (lowerMessage.includes("scholarship") || lowerMessage.includes("financial aid")) {
      return {
        content: "🎓 **Scholarship Opportunities & Financial Aid**\n\n**Government Scholarships:**\n• **National Scholarship Portal**: Merit and need-based scholarships\n• **PM Special Scholarship**: For J&K students studying outside the state\n• **Technical Education Scholarships**: AICTE and other technical programs\n• **Category-based Scholarships**: SC/ST, OBC, and minority scholarships\n\n**Private & International Scholarships:**\n• **Tata Scholarships**: For undergraduate studies\n• **Reliance Foundation**: Merit-based support\n• **International Options**: Study abroad funding\n• **Corporate Scholarships**: Company-sponsored education\n\n**Application Timeline:**\n• April-June: Most applications open\n• July-August: Document submission\n• September-October: Selection process\n• November onwards: Disbursement begins\n\n💡 **Pro Tips:**\n✅ Apply early - limited seats available\n✅ Maintain good academic record\n✅ Prepare all documents in advance\n✅ Apply to multiple scholarships\n\nWould you like me to show you scholarships you're eligible for?",
        suggestions: ["Show eligible scholarships", "Application deadlines", "Required documents", "Merit vs need-based scholarships"]
      };
    }
    
    // Default enhanced response
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

    // Simulate AI thinking time with more realistic delay
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
      {/* Enhanced Floating Chat Button - Right Side (adjusted for left sidebar) */}
      <div
        ref={botRef}
        onClick={handleBotClick}
        className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100] cursor-pointer transition-all duration-500 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 hover:scale-110"
        }`}
      >
        <div className="relative flex items-center group">
          {/* Pulsing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-75 animate-pulse group-hover:opacity-100"></div>
          
          {/* Main bot face */}
          <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center border-2 border-white dark:border-gray-700 group-hover:shadow-3xl transition-shadow duration-300">
            {/* Face container */}
            <div className="relative w-12 h-12 flex flex-col items-center justify-center">
              {/* Eyes */}
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
              
              {/* Mouth */}
              <div 
                className="transition-all duration-300"
                style={getMouthStyle()}
              />
            </div>

            {/* Status indicator */}
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
          
          {/* Help label - Hidden on mobile, positioned to the left */}
          <div className="mr-4 hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-lg px-3 py-2 border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-shadow duration-300 order-first">
            <div className="text-sm font-medium text-gray-900 dark:text-white">Help & Resources</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">AI Career Advisor</div>
          </div>
        </div>
      </div>

      {/* Enhanced Chat Interface - Right Side */}
      {isOpen && (
        <>
          {/* Close Button Overlay */}
          <button
            onClick={() => setIsOpen(false)}
            className="fixed right-2 md:right-4 top-[calc(50%-270px)] z-[110] w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            title="Close Chat"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div
            ref={chatContainerRef}
            className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100] w-80 md:w-96 h-[500px] shadow-2xl border-2 border-blue-200 dark:border-blue-700 transition-all duration-500 transform scale-100 opacity-100 bg-white dark:bg-gray-900 overflow-hidden rounded-xl"
          >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {/* Mini bot face in header */}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20 transition-colors hover:scale-110"
                title="Close Chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
            <ScrollArea className="flex-1 px-4 py-2 max-h-80">
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
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}