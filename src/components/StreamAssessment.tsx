import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { BackButton } from "./BackButton";
import { 
  GraduationCap, 
  BookOpen, 
  Code, 
  Calculator, 
  Palette, 
  Award,
  ChevronRight,
  RotateCcw,
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Star,
  Brain,
  Lightbulb
} from "lucide-react";

interface StreamAssessmentProps {
  onNavigate?: (page: string, params?: any) => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    streamPoints: {
      science: number;
      commerce: number;
      arts: number;
      diploma: number;
    };
  }[];
}

interface StreamResult {
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  darkBgColor: string;
  borderColor: string;
  score: number;
  description: string;
  subjects: string[];
  careerPaths: string[];
  strengths: string[];
  challenges: string[];
  salaryRange: string;
  studyDuration: string;
  topColleges: string[];
}

export function StreamAssessment({ onNavigate }: StreamAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Stream Assessment Questions - Focused on academic preferences and strengths
  const questions: Question[] = [
    {
      id: 1,
      question: "Which subject do you find most interesting and engaging?",
      options: [
        {
          id: "math-physics",
          text: "Mathematics and Physics - I love solving complex problems and understanding how things work",
          streamPoints: { science: 3, commerce: 1, arts: 0, diploma: 1 }
        },
        {
          id: "biology-chemistry",
          text: "Biology and Chemistry - I'm fascinated by living organisms and chemical processes",
          streamPoints: { science: 3, commerce: 0, arts: 0, diploma: 2 }
        },
        {
          id: "economics-business",
          text: "Economics and Business Studies - I enjoy understanding markets and financial systems",
          streamPoints: { science: 0, commerce: 3, arts: 1, diploma: 2 }
        },
        {
          id: "history-literature",
          text: "History and Literature - I love reading, writing, and understanding human culture",
          streamPoints: { science: 0, commerce: 1, arts: 3, diploma: 1 }
        },
        {
          id: "practical-skills",
          text: "Hands-on practical skills - I prefer learning by doing rather than theory",
          streamPoints: { science: 1, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    },
    {
      id: 2,
      question: "What type of problem-solving approach do you prefer?",
      options: [
        {
          id: "logical-analytical",
          text: "Logical and analytical - Using formulas, data, and scientific methods",
          streamPoints: { science: 3, commerce: 2, arts: 0, diploma: 1 }
        },
        {
          id: "creative-innovative",
          text: "Creative and innovative - Finding unique solutions through imagination",
          streamPoints: { science: 1, commerce: 1, arts: 3, diploma: 2 }
        },
        {
          id: "systematic-organized",
          text: "Systematic and organized - Following structured approaches and procedures",
          streamPoints: { science: 2, commerce: 3, arts: 1, diploma: 2 }
        },
        {
          id: "practical-hands-on",
          text: "Practical and hands-on - Learning through direct experience and application",
          streamPoints: { science: 1, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    },
    {
      id: 3,
      question: "Which career environment appeals to you most?",
      options: [
        {
          id: "laboratory-research",
          text: "Laboratories and research facilities - Conducting experiments and discoveries",
          streamPoints: { science: 3, commerce: 0, arts: 0, diploma: 1 }
        },
        {
          id: "corporate-business",
          text: "Corporate offices and business environments - Managing finances and operations",
          streamPoints: { science: 0, commerce: 3, arts: 1, diploma: 1 }
        },
        {
          id: "creative-cultural",
          text: "Creative studios and cultural institutions - Working with arts and humanities",
          streamPoints: { science: 0, commerce: 1, arts: 3, diploma: 2 }
        },
        {
          id: "technical-workshops",
          text: "Technical workshops and industrial settings - Working with tools and machinery",
          streamPoints: { science: 1, commerce: 1, arts: 0, diploma: 3 }
        },
        {
          id: "healthcare-service",
          text: "Hospitals and healthcare facilities - Helping people and providing services",
          streamPoints: { science: 2, commerce: 0, arts: 2, diploma: 2 }
        }
      ]
    },
    {
      id: 4,
      question: "How do you prefer to learn new concepts?",
      options: [
        {
          id: "experiments-formulas",
          text: "Through experiments, formulas, and scientific principles",
          streamPoints: { science: 3, commerce: 1, arts: 0, diploma: 2 }
        },
        {
          id: "case-studies-data",
          text: "Through case studies, data analysis, and real-world examples",
          streamPoints: { science: 1, commerce: 3, arts: 1, diploma: 1 }
        },
        {
          id: "stories-discussions",
          text: "Through stories, discussions, and cultural context",
          streamPoints: { science: 0, commerce: 1, arts: 3, diploma: 1 }
        },
        {
          id: "practical-projects",
          text: "Through practical projects and hands-on training",
          streamPoints: { science: 1, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    },
    {
      id: 5,
      question: "What type of academic challenge motivates you most?",
      options: [
        {
          id: "complex-calculations",
          text: "Solving complex mathematical equations and scientific problems",
          streamPoints: { science: 3, commerce: 2, arts: 0, diploma: 1 }
        },
        {
          id: "business-strategies",
          text: "Understanding market trends and developing business strategies",
          streamPoints: { science: 0, commerce: 3, arts: 1, diploma: 2 }
        },
        {
          id: "creative-expression",
          text: "Expressing ideas creatively through writing, art, or performance",
          streamPoints: { science: 0, commerce: 1, arts: 3, diploma: 1 }
        },
        {
          id: "skill-mastery",
          text: "Mastering practical skills and technical competencies",
          streamPoints: { science: 1, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    },
    {
      id: 6,
      question: "Which study duration and approach suits you better?",
      options: [
        {
          id: "long-term-theory",
          text: "4+ years of theoretical study with deep specialization (Engineering/Medicine)",
          streamPoints: { science: 3, commerce: 2, arts: 2, diploma: 0 }
        },
        {
          id: "moderate-practical",
          text: "2-3 years with balanced theory and practical application",
          streamPoints: { science: 2, commerce: 3, arts: 3, diploma: 1 }
        },
        {
          id: "short-term-skills",
          text: "6 months to 2 years focused on specific skills and immediate employment",
          streamPoints: { science: 0, commerce: 1, arts: 1, diploma: 3 }
        },
        {
          id: "flexible-learning",
          text: "Flexible duration with opportunity to add certifications later",
          streamPoints: { science: 1, commerce: 2, arts: 2, diploma: 2 }
        }
      ]
    },
    {
      id: 7,
      question: "What motivates you most about your future career?",
      options: [
        {
          id: "innovation-discovery",
          text: "Making scientific discoveries and technological innovations",
          streamPoints: { science: 3, commerce: 0, arts: 1, diploma: 1 }
        },
        {
          id: "financial-success",
          text: "Building successful businesses and achieving financial growth",
          streamPoints: { science: 1, commerce: 3, arts: 0, diploma: 2 }
        },
        {
          id: "social-impact",
          text: "Creating positive social change and cultural impact",
          streamPoints: { science: 1, commerce: 1, arts: 3, diploma: 1 }
        },
        {
          id: "quick-employment",
          text: "Getting employed quickly with practical, in-demand skills",
          streamPoints: { science: 0, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    },
    {
      id: 8,
      question: "Which subjects did you perform best in during Class 10?",
      options: [
        {
          id: "math-science-high",
          text: "Mathematics and Science (consistently scored 80%+)",
          streamPoints: { science: 3, commerce: 2, arts: 0, diploma: 1 }
        },
        {
          id: "math-social-high",
          text: "Mathematics and Social Science (good analytical skills)",
          streamPoints: { science: 1, commerce: 3, arts: 2, diploma: 1 }
        },
        {
          id: "languages-social-high",
          text: "Languages and Social Studies (strong in communication)",
          streamPoints: { science: 0, commerce: 2, arts: 3, diploma: 1 }
        },
        {
          id: "practical-subjects",
          text: "Practical subjects and hands-on activities (workshops, art, etc.)",
          streamPoints: { science: 1, commerce: 1, arts: 2, diploma: 3 }
        },
        {
          id: "average-all",
          text: "Average performance across all subjects (60-75%)",
          streamPoints: { science: 0, commerce: 1, arts: 1, diploma: 3 }
        }
      ]
    }
  ];

  const streamResults: { [key: string]: StreamResult } = {
    science: {
      name: "Science Stream",
      icon: Code,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      darkBgColor: "dark:bg-blue-950/50",
      borderColor: "border-blue-200 dark:border-blue-700",
      score: 0,
      description: "Perfect for students who love logical thinking, problem-solving, and are curious about how the world works. Science stream opens doors to engineering, medicine, research, and technology careers.",
      subjects: ["Physics", "Chemistry", "Mathematics/Biology", "English", "Optional Subject"],
      careerPaths: ["Engineering", "Medicine", "Research Scientist", "Data Science", "Biotechnology", "IT Specialist", "Pharmaceutical Sciences", "Environmental Science"],
      strengths: ["Analytical thinking", "Problem-solving", "Research skills", "Technical aptitude"],
      challenges: ["High competition", "Extensive study requirements", "Math and science proficiency needed"],
      salaryRange: "₹4-25 LPA (varies by specialization)",
      studyDuration: "4-6 years (depending on course)",
      topColleges: ["IITs", "AIIMS", "NITs", "IISc Bangalore", "BITS Pilani"]
    },
    commerce: {
      name: "Commerce Stream",
      icon: Calculator,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      darkBgColor: "dark:bg-green-950/50",
      borderColor: "border-green-200 dark:border-green-700",
      score: 0,
      description: "Ideal for students interested in business, economics, and finance. Commerce stream prepares you for careers in business management, accounting, banking, and entrepreneurship.",
      subjects: ["Accountancy", "Business Studies", "Economics", "English", "Mathematics"],
      careerPaths: ["Chartered Accountant", "Business Manager", "Investment Banker", "Entrepreneur", "Financial Analyst", "Marketing Executive", "Company Secretary", "Cost Accountant"],
      strengths: ["Business acumen", "Financial literacy", "Communication skills", "Strategic thinking"],
      challenges: ["Market volatility understanding", "Complex financial concepts", "Professional exam requirements"],
      salaryRange: "₹3-20 LPA (varies by role)",
      studyDuration: "3-5 years (including professional courses)",
      topColleges: ["SRCC", "LSR", "St. Xavier's", "Christ University", "Loyola College"]
    },
    arts: {
      name: "Arts/Humanities Stream",
      icon: Palette,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      darkBgColor: "dark:bg-purple-950/50",
      borderColor: "border-purple-200 dark:border-purple-700",
      score: 0,
      description: "Perfect for creative minds who love literature, history, and social sciences. Arts stream offers diverse career opportunities in education, civil services, media, and creative fields.",
      subjects: ["History", "Political Science", "Psychology", "English", "Optional Language/Subject"],
      careerPaths: ["Civil Services", "Teacher", "Journalist", "Lawyer", "Psychologist", "Social Worker", "Content Writer", "Diplomat"],
      strengths: ["Critical thinking", "Communication skills", "Cultural awareness", "Creative expression"],
      challenges: ["Competitive job market", "Lower initial salaries", "Need for specialization"],
      salaryRange: "₹2.5-15 LPA (varies significantly)",
      studyDuration: "3-5 years (depending on specialization)",
      topColleges: ["JNU", "DU", "BHU", "Presidency College", "Jamia Millia Islamia"]
    },
    diploma: {
      name: "Diploma Courses",
      icon: Award,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      darkBgColor: "dark:bg-orange-950/50",
      borderColor: "border-orange-200 dark:border-orange-700",
      score: 0,
      description: "Excellent for students who prefer practical, skill-based learning and want to enter the workforce quickly. Diploma courses offer specialized training in various technical and professional fields.",
      subjects: ["Specialized Technical Subjects", "Practical Training", "Industry-Relevant Skills", "Internships"],
      careerPaths: ["Technical Specialist", "Skilled Technician", "Industry Expert", "Entrepreneur", "Certified Professional", "Quality Controller", "Production Supervisor"],
      strengths: ["Practical skills", "Quick employment", "Industry relevance", "Hands-on experience"],
      challenges: ["Limited career progression", "Technology updates", "Competition from degree holders"],
      salaryRange: "₹2-8 LPA (skill-dependent)",
      studyDuration: "6 months - 3 years",
      topColleges: ["Government Polytechnics", "NTTF", "Industrial Training Institutes", "Private Technical Institutes"]
    }
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const calculateResults = () => {
    const scores = {
      science: 0,
      commerce: 0,
      arts: 0,
      diploma: 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.id === answerId);
      
      if (option) {
        scores.science += option.streamPoints.science;
        scores.commerce += option.streamPoints.commerce;
        scores.arts += option.streamPoints.arts;
        scores.diploma += option.streamPoints.diploma;
      }
    });

    // Update stream results with scores
    Object.keys(streamResults).forEach(stream => {
      streamResults[stream].score = scores[stream as keyof typeof scores];
    });

    setShowResults(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsStarted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const sortedResults = Object.values(streamResults).sort((a, b) => b.score - a.score);
  const topRecommendation = sortedResults[0];

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <BackButton />
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Academic Stream Assessment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover which academic path is right for you! This assessment will help you choose between Science, Commerce, Arts streams, or Diploma courses based on your interests, strengths, and career goals.
          </p>
        </div>

        <Card className="bg-card dark:bg-card border-border">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">What You'll Discover:</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-foreground">Your ideal academic stream (Science/Commerce/Arts)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-foreground">Whether diploma courses suit your goals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-foreground">Subject combinations that match your strengths</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="text-foreground">Career paths aligned with your interests</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Assessment Features:</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>• 8 carefully designed questions</p>
                  <p>• Takes approximately 5-7 minutes</p>
                  <p>• Personalized recommendations</p>
                  <p>• Detailed subject and career information</p>
                  <p>• Compare different academic paths</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => setIsStarted(true)}
                    className="w-full"
                    size="lg"
                  >
                    Start Stream Assessment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-4 gap-4">
          {Object.values(streamResults).map((stream) => {
            const IconComponent = stream.icon;
            return (
              <Card key={stream.name} className={`${stream.bgColor} ${stream.borderColor} border-2 hover:shadow-md transition-all duration-200 hover:scale-105`}>
                <CardContent className="p-4 text-center">
                  <IconComponent className={`w-8 h-8 ${stream.color} mx-auto mb-2`} />
                  <h3 className="font-semibold text-sm text-foreground">{stream.name}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Calculate detailed analytics for results
  const calculateDetailedAnalytics = () => {
    const totalQuestions = questions.length;
    const scores = {
      science: 0,
      commerce: 0,
      arts: 0,
      diploma: 0
    };

    const questionAnalysis: { [key: number]: { question: string; selectedOption: string; streamPoints: any } } = {};

    // Calculate scores and question analysis
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.id === answerId);
      
      if (option && question) {
        scores.science += option.streamPoints.science;
        scores.commerce += option.streamPoints.commerce;
        scores.arts += option.streamPoints.arts;
        scores.diploma += option.streamPoints.diploma;

        questionAnalysis[parseInt(questionId)] = {
          question: question.question,
          selectedOption: option.text,
          streamPoints: option.streamPoints
        };
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    return {
      scores,
      questionAnalysis,
      maxScore,
      totalScore,
      totalQuestions,
      confidenceLevel: maxScore > (totalScore - maxScore) ? "High" : maxScore > (totalScore - maxScore) * 0.7 ? "Medium" : "Low"
    };
  };

  if (showResults) {
    const analytics = calculateDetailedAnalytics();
    
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <BackButton />
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Stream Assessment Results
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Based on your responses, here are your personalized academic stream recommendations
          </p>
          <Badge variant="secondary" className="px-4 py-2">
            Confidence Level: {analytics.confidenceLevel}
          </Badge>
        </div>

        {/* Top Recommendation - Enhanced */}
        <Card className={`${topRecommendation.bgColor} ${topRecommendation.borderColor} border-2 shadow-lg`}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 ${topRecommendation.darkBgColor} rounded-full`}>
                  <topRecommendation.icon className={`w-8 h-8 ${topRecommendation.color}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-xl text-foreground">Best Match: {topRecommendation.name}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      {topRecommendation.score} points
                    </Badge>
                    <Badge variant="outline">
                      {Math.round((topRecommendation.score / analytics.maxScore) * 100)}% match
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-foreground leading-relaxed">
              {topRecommendation.description}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Core Subjects
                </h4>
                <div className="space-y-2">
                  {topRecommendation.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-muted-foreground">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Career Paths
                </h4>
                <div className="space-y-2">
                  {topRecommendation.careerPaths.slice(0, 4).map((career, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Target className="w-3 h-3 text-blue-500" />
                      <span className="text-muted-foreground">{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Key Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Salary Range:</span>
                    <span className="font-medium text-foreground">{topRecommendation.salaryRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">{topRecommendation.studyDuration}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                  Your Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topRecommendation.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                  Challenges to Consider
                </h4>
                <div className="space-y-1">
                  {topRecommendation.challenges.slice(0, 2).map((challenge, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {challenge}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Score Analysis */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold text-foreground">Complete Results Breakdown</h2>
          </div>
          
          {/* Score Overview */}
          <Card className="bg-card dark:bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Score Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {Object.entries(analytics.scores).map(([stream, score]) => (
                  <div key={stream} className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-foreground">{score}</div>
                    <div className="text-sm text-muted-foreground capitalize">{stream}</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((score / analytics.totalScore) * 100)}% of total
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Questions:</span>
                  <span className="font-medium text-foreground">{analytics.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Score:</span>
                  <span className="font-medium text-foreground">{analytics.totalScore} points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recommendation Confidence:</span>
                  <Badge variant={analytics.confidenceLevel === "High" ? "default" : analytics.confidenceLevel === "Medium" ? "secondary" : "outline"}>
                    {analytics.confidenceLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Stream Results */}
          <div className="grid gap-6">
            {sortedResults.map((stream, index) => {
              const IconComponent = stream.icon;
              const percentage = Math.round((stream.score / analytics.maxScore) * 100);
              const isTopChoice = index === 0;
              
              return (
                <Card key={stream.name} className={`${stream.bgColor} ${stream.borderColor} border-2 ${isTopChoice ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''} transition-all duration-200 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${stream.darkBgColor} rounded-full`}>
                          <IconComponent className={`w-8 h-8 ${stream.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">{stream.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant={isTopChoice ? "default" : "secondary"} className="px-3 py-1">
                              {stream.score} points ({percentage}%)
                            </Badge>
                            {isTopChoice && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                                <Star className="w-3 h-3 mr-1" />
                                Best Match
                              </Badge>
                            )}
                            <Badge variant="outline">
                              Rank #{index + 1}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Progress value={percentage} className="mb-4 h-2" />
                    
                    <p className="text-foreground mb-4 leading-relaxed">
                      {stream.description}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Subjects</h4>
                        <div className="space-y-1">
                          {stream.subjects.slice(0, 3).map((subject, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                              {subject}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Top Careers</h4>
                        <div className="space-y-1">
                          {stream.careerPaths.slice(0, 3).map((career, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground flex items-center">
                              <Target className="w-3 h-3 mr-1 text-blue-500" />
                              {career}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Quick Facts</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="text-foreground font-medium">{stream.studyDuration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Salary:</span>
                            <span className="text-foreground font-medium">{stream.salaryRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center">
                          <Lightbulb className="w-3 h-3 mr-1 text-yellow-500" />
                          Strengths
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {stream.strengths.slice(0, 3).map((strength, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1 text-orange-500" />
                          Consider
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {stream.challenges[0]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Question-by-Question Analysis */}
          <Card className="bg-card dark:bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Your Response Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.questionAnalysis).map(([questionId, analysis]) => (
                  <div key={questionId} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <h4 className="font-medium text-foreground mb-2 text-sm">Q{questionId}: {analysis.question}</h4>
                    <p className="text-sm text-muted-foreground mb-3">Your answer: "{analysis.selectedOption}"</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(analysis.streamPoints).map(([stream, points]) => (
                        <div key={stream} className="text-center">
                          <div className="text-xs font-medium text-foreground">{points}</div>
                          <div className="text-xs text-muted-foreground capitalize">{stream}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={restartAssessment}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Assessment Again</span>
          </Button>
          
          <Button
            onClick={() => {
              // Extract the stream name from the recommendation and handle different cases
              const streamName = topRecommendation.name.toLowerCase().split(' ')[0];
              if (streamName === "diploma") {
                // For diploma, navigate to courses page
                onNavigate?.("courses", { filter: "diploma" });
              } else if (["science", "commerce", "arts"].includes(streamName)) {
                onNavigate?.("stream-details", { stream: streamName });
              } else {
                // Fallback to courses page
                onNavigate?.("courses");
              }
            }}
            className="flex items-center space-x-2"
          >
            <span>Explore {topRecommendation.name} Details</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => onNavigate?.("courses")}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <span>Browse All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BackButton />
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Academic Stream Assessment
          </h1>
          <Badge variant="secondary" className="px-3 py-1">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-card dark:bg-card border-border shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg leading-relaxed text-foreground">
              {currentQ.question}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswer || ""} 
            onValueChange={(value) => handleAnswerSelect(currentQ.id, value)}
            className="space-y-3"
          >
            {currentQ.options.map((option) => (
              <div key={option.id} className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedAnswer === option.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-400' 
                  : 'border-border hover:border-blue-300 dark:hover:border-blue-600 hover:bg-muted/50'
              }`}>
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label 
                  htmlFor={option.id} 
                  className="text-sm leading-relaxed cursor-pointer flex-1 text-foreground"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Previous</span>
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            {selectedAnswer ? "Answer selected" : "Please select an answer"}
          </p>
          {selectedAnswer && (
            <div className="flex items-center justify-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 dark:text-green-400">Ready to continue</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className="flex items-center space-x-2"
          size="lg"
        >
          <span>{currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}