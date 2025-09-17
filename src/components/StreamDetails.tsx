import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, BookOpen, FlaskConical, Calculator, Globe, 
  Palette, TrendingUp, Target, CheckCircle2, Brain, 
  GraduationCap, Award, BarChart3, DollarSign, Scale,
  Atom, Dna, Beaker, ChevronRight, Briefcase, PieChart
} from "lucide-react";

interface StreamDetailsProps {
  stream: "science" | "commerce" | "arts";
  onNavigate?: (page: string) => void;
}

export function StreamDetails({ stream, onNavigate }: StreamDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading to prevent render timeout
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Validate stream parameter early
  if (!stream || !["science", "commerce", "arts"].includes(stream)) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Stream
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The requested stream "{stream}" is not supported.
          </p>
          <Button onClick={() => onNavigate?.("home")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading stream details...</p>
        </div>
      </div>
    );
  }
  const streamInfo = {
    science: {
      title: "Science Stream (Class 11-12)",
      subtitle: "Physics, Chemistry, Biology & Mathematics",
      description: "Science stream offers multiple combinations for engineering, medical, and research careers",
      icon: FlaskConical,
      color: "from-blue-500 to-cyan-500",
      combinations: [
        { name: "PCM", subjects: ["Physics", "Chemistry", "Mathematics"], description: "Perfect for engineering and technology" },
        { name: "PCB", subjects: ["Physics", "Chemistry", "Biology"], description: "Ideal for medical and life sciences" },
        { name: "PCMB", subjects: ["Physics", "Chemistry", "Mathematics", "Biology"], description: "Maximum flexibility for all fields" }
      ]
    },
    commerce: {
      title: "Commerce Stream (Class 11-12)",
      subtitle: "Business, Economics & Financial Studies",
      description: "Commerce stream focuses on business, trade, economics, and financial management",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      combinations: [
        { name: "With Math", subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"], description: "Opens doors to CA and analytical roles" },
        { name: "Without Math", subjects: ["Accountancy", "Business Studies", "Economics", "English"], description: "Focus on pure business concepts" },
        { name: "With Computer", subjects: ["Accountancy", "Business Studies", "Economics", "Computer Science"], description: "Business + technology skills" }
      ]
    },
    arts: {
      title: "Arts & Humanities Stream (Class 11-12)",
      subtitle: "Literature, Social Sciences & Creative Studies",
      description: "Arts stream offers diverse subjects focusing on human society, culture, and creative expression",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      combinations: [
        { name: "Humanities Core", subjects: ["History", "Political Science", "Geography", "English"], description: "Classic combination for social sciences" },
        { name: "Literature Focus", subjects: ["English Literature", "Hindi Literature", "Psychology", "History"], description: "Perfect for language enthusiasts" },
        { name: "Creative Arts", subjects: ["Fine Arts", "Music", "Psychology", "English"], description: "For creative minds" }
      ]
    }
  };

  const currentStream = streamInfo[stream];
  
  // Handle case where stream is not found
  if (!currentStream) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stream Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The requested stream details are not available.
          </p>
          <Button onClick={() => onNavigate?.("home")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
  
  const IconComponent = currentStream.icon;

  const subjects = {
    science: [
      { name: "Physics", icon: Atom, topics: ["Mechanics", "Thermodynamics", "Waves & Optics", "Electricity & Magnetism"] },
      { name: "Chemistry", icon: Beaker, topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
      { name: "Mathematics", icon: Calculator, topics: ["Calculus", "Algebra", "Coordinate Geometry", "Trigonometry"] },
      { name: "Biology", icon: Dna, topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology"] }
    ],
    commerce: [
      { name: "Accountancy", icon: BarChart3, topics: ["Financial Accounting", "Partnership Accounts", "Company Accounts"] },
      { name: "Business Studies", icon: Briefcase, topics: ["Nature of Business", "Management", "Marketing"] },
      { name: "Economics", icon: PieChart, topics: ["Microeconomics", "Macroeconomics", "Indian Economic Development"] },
      { name: "Mathematics", icon: Calculator, topics: ["Statistics", "Probability", "Linear Programming"] }
    ],
    arts: [
      { name: "History", icon: Globe, topics: ["Ancient History", "Medieval History", "Modern History", "Art & Culture"] },
      { name: "Political Science", icon: Scale, topics: ["Political Theories", "Indian Constitution", "International Relations"] },
      { name: "Geography", icon: Globe, topics: ["Physical Geography", "Human Geography", "Indian Geography"] },
      { name: "Psychology", icon: Brain, topics: ["Cognitive Psychology", "Social Psychology", "Developmental Psychology"] }
    ]
  };

  const studyTips = {
    science: [
      "Create a balanced study schedule for all subjects",
      "Focus on conceptual understanding before problem solving",
      "Regular practice of numerical problems is essential",
      "Maintain laboratory notebooks and practice diagrams"
    ],
    commerce: [
      "Read financial newspapers regularly",
      "Relate theoretical concepts to current business scenarios",
      "Practice accounting problems step by step",
      "Stay updated with economic policies"
    ],
    arts: [
      "Develop strong reading and writing habits",
      "Stay updated with current affairs",
      "Practice analytical writing regularly",
      "Participate in debates and discussions"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate?.("home")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${currentStream.color} rounded-lg flex items-center justify-center shadow-lg`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {currentStream.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              {currentStream.subtitle}
            </p>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              {currentStream.description}
            </p>
            
            {/* Quick Assessment Link */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                Unsure about your stream choice? Take our assessment to find your perfect match!
              </p>
              <Button 
                onClick={() => onNavigate?.("stream-assessment")} 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Target className="h-4 w-4 mr-2" />
                Take Stream Assessment
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="combinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combinations">Stream Combinations</TabsTrigger>
            <TabsTrigger value="subjects">Subject Details</TabsTrigger>
            <TabsTrigger value="preparation">Study Strategy</TabsTrigger>
          </TabsList>

          {/* Stream Combinations */}
          <TabsContent value="combinations" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentStream.combinations.map((combination, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{combination.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{combination.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Core Subjects:
                      </h4>
                      {combination.subjects.map((subject, i) => (
                        <div key={i} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <ChevronRight className="h-3 w-3 mr-2 text-gray-400" />
                          <span className="text-sm">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subject Details */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {subjects[stream].map((subject, index) => {
                const SubjectIcon = subject.icon;
                return (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <SubjectIcon className="h-5 w-5 mr-2" />
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Major Topics:</h4>
                        {subject.topics.map((topic, i) => (
                          <div key={i} className="flex items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Study Strategy */}
          <TabsContent value="preparation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  Study Tips for {currentStream.title.split(" ")[0]} Stream
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studyTips[stream].map((tip, index) => (
                    <div key={index} className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <CheckCircle2 className="h-4 w-4 mr-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                  Basic Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Academic</h4>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {stream === "science" ? "Strong foundation in Class 10 Science and Mathematics (70%+ recommended)" :
                       stream === "commerce" ? "Good understanding of basic mathematics and interest in business (60%+ recommended)" :
                       "Strong language and communication skills with interest in society and culture (50%+ recommended)"}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Skills Needed</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {stream === "science" ? "Analytical thinking, problem-solving, and mathematical skills" :
                       stream === "commerce" ? "Logical thinking, attention to detail, and interest in current affairs" :
                       "Reading comprehension, analytical writing, and creative thinking"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-8 border-2 border-dashed">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Not Sure if {currentStream.title.split(" ")[0]} Stream is Right for You?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Take our specialized Academic Stream Assessment to discover which stream matches your interests and strengths
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => onNavigate?.("stream-assessment")} className="bg-blue-600 hover:bg-blue-700">
                <Target className="h-4 w-4 mr-2" />
                Take Stream Assessment
              </Button>
              <Button variant="outline" onClick={() => onNavigate?.("courses")}>
                Explore All Courses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}