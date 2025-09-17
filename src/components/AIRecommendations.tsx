import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { BackButton } from "./BackButton";
import { userService } from "../services/userService";
import { PageType, UserProfile } from "../types";
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Building, 
  Award, 
  Briefcase, 
  Users, 
  Clock, 
  Star, 
  ArrowRight, 
  Zap, 
  Lightbulb, 
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  DollarSign,
  MapPin,
  Layers,
  Filter,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AIRecommendationsProps {
  onNavigate?: (page: PageType, params?: any) => void;
}

interface AIRecommendation {
  id: string;
  type: "course" | "career" | "college" | "scholarship" | "internship" | "skill";
  title: string;
  subtitle?: string;
  description: string;
  confidence: number;
  priority: "high" | "medium" | "low";
  reasoning: string[];
  actionSteps: string[];
  timeline?: string;
  potentialOutcome: string;
  requirements?: string[];
  estimatedCost?: string;
  location?: string;
  deadline?: string;
  matchScore: number;
  tags: string[];
}

interface AIInsight {
  id: string;
  type: "trend" | "opportunity" | "warning" | "tip" | "market";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  relevance: number;
  source: string;
  actionable: boolean;
}

export function AIRecommendations({ onNavigate }: AIRecommendationsProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("recommendations");
  const [filterType, setFilterType] = useState<string>("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    const user = userService.getCurrentUser();
    if (user) {
      setUserProfile(user);
      generateRecommendations(user);
    }
  }, []);

  const generateRecommendations = async (user: UserProfile) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate personalized recommendations based on user profile
    const newRecommendations: AIRecommendation[] = [
      {
        id: "1",
        type: "course",
        title: "Computer Science Engineering",
        subtitle: "IIT Delhi",
        description: "Top-tier engineering program with excellent placement opportunities and cutting-edge curriculum.",
        confidence: 92,
        priority: "high",
        reasoning: [
          `Strong match with your interests in ${user.interests.slice(0, 2).join(" and ")}`,
          "High market demand for CS graduates",
          "Aligns with your academic background",
          "Proximity to your location preferences"
        ],
        actionSteps: [
          "Prepare for JEE Advanced",
          "Focus on Mathematics and Physics",
          "Complete coding portfolio",
          "Apply by March 2025"
        ],
        timeline: "4 years",
        potentialOutcome: "₹18-25 LPA starting salary, 95% placement rate",
        requirements: ["JEE Advanced Rank < 2000", "Class 12 PCM", "75% minimum marks"],
        estimatedCost: "₹8-10 lakhs total",
        location: "Delhi",
        deadline: "March 15, 2025",
        matchScore: 92,
        tags: ["Engineering", "Technology", "High Placement", "Premier Institute"]
      },
      {
        id: "2",
        type: "scholarship",
        title: "PM Special Scholarship Scheme",
        subtitle: "Government of India",
        description: "Full financial support for J&K students pursuing higher education outside the state.",
        confidence: 89,
        priority: "high",
        reasoning: [
          "You are a resident of J&K",
          "Planning to study outside the state",
          "Academic eligibility criteria met",
          "Limited time opportunity"
        ],
        actionSteps: [
          "Gather required documents",
          "Submit online application",
          "Get income certificate",
          "Complete verification process"
        ],
        timeline: "Annual renewal",
        potentialOutcome: "Up to ₹2 lakh annual support + additional benefits",
        requirements: ["J&K Domicile", "Family income < ₹8 lakh", "Admission confirmation"],
        estimatedCost: "Free application",
        deadline: "January 31, 2025",
        matchScore: 89,
        tags: ["Financial Aid", "Government", "J&K Students", "Urgent"]
      },
      {
        id: "3",
        type: "career",
        title: "Data Science Specialist",
        subtitle: "Emerging Tech Career",
        description: "High-growth field combining your mathematical skills with technology interests.",
        confidence: 85,
        priority: "medium",
        reasoning: [
          "Growing 40% YoY in the job market",
          "Matches your quantitative aptitude",
          "High earning potential",
          "Multiple industry applications"
        ],
        actionSteps: [
          "Learn Python programming",
          "Master statistics and ML",
          "Build project portfolio",
          "Get industry certifications"
        ],
        timeline: "2-3 years skill development",
        potentialOutcome: "₹12-30 LPA, remote work options, consulting opportunities",
        requirements: ["Strong math background", "Programming skills", "Domain knowledge"],
        matchScore: 85,
        tags: ["High Growth", "Technology", "Analytics", "Remote Work"]
      },
      {
        id: "4",
        type: "internship",
        title: "Google Summer of Code 2025",
        subtitle: "Open Source Development",
        description: "Global program for university students to work on open source projects with mentorship.",
        confidence: 78,
        priority: "medium",
        reasoning: [
          "Excellent for skill development",
          "Global recognition and networking",
          "Stipend for living expenses",
          "Boosts resume significantly"
        ],
        actionSteps: [
          "Learn Git and version control",
          "Contribute to open source projects",
          "Prepare strong application",
          "Connect with potential mentors"
        ],
        timeline: "3 months (May-August)",
        potentialOutcome: "$3000 stipend + valuable experience + network",
        requirements: ["University enrollment", "Programming skills", "Open source contributions"],
        deadline: "April 2, 2025",
        matchScore: 78,
        tags: ["Open Source", "Global", "Paid", "Experience"]
      },
      {
        id: "5",
        type: "college",
        title: "Delhi Technological University",
        subtitle: "State University",
        description: "Well-established technical university with strong industry connections and research opportunities.",
        confidence: 82,
        priority: "medium",
        reasoning: [
          "Good backup option with achievable cutoffs",
          "Strong placement record",
          "Proximity to tech hub",
          "Diverse program offerings"
        ],
        actionSteps: [
          "Check admission criteria",
          "Prepare for entrance exam",
          "Visit campus",
          "Apply for multiple programs"
        ],
        timeline: "4 years",
        potentialOutcome: "₹8-15 LPA average placement, 85% placement rate",
        requirements: ["JEE Main score", "Class 12 PCM", "Counseling participation"],
        estimatedCost: "₹4-6 lakhs total",
        location: "Delhi",
        matchScore: 82,
        tags: ["State University", "Good Placement", "Affordable", "Technical"]
      },
      {
        id: "6",
        type: "skill",
        title: "Full Stack Web Development",
        subtitle: "Industry-Relevant Skill",
        description: "Comprehensive skill set in high demand across all industries with remote work opportunities.",
        confidence: 88,
        priority: "high",
        reasoning: [
          "Immediate job market applicability",
          "Can start learning immediately",
          "Freelancing opportunities available",
          "Foundation for tech entrepreneurship"
        ],
        actionSteps: [
          "Complete online bootcamp",
          "Build personal projects",
          "Create GitHub portfolio",
          "Apply for junior positions"
        ],
        timeline: "6-12 months intensive learning",
        potentialOutcome: "₹6-12 LPA entry level, freelancing ₹500-2000/hour",
        requirements: ["Computer with internet", "Dedication to learning", "Practice projects"],
        estimatedCost: "₹10-50k for courses",
        matchScore: 88,
        tags: ["Practical", "High Demand", "Remote Work", "Quick Entry"]
      }
    ];

    const newInsights: AIInsight[] = [
      {
        id: "1",
        type: "trend",
        title: "AI/ML Engineering Demand Surge",
        description: "Machine Learning engineers are experiencing 45% faster job growth compared to traditional software roles, with salaries increasing by 25% annually.",
        impact: "high",
        relevance: 95,
        source: "Industry Analysis 2024",
        actionable: true
      },
      {
        id: "2",
        type: "opportunity",
        title: "Government Tech Initiatives",
        description: "Digital India 2.0 launching 50,000+ tech jobs for young graduates with special focus on tier-2 cities and states like J&K.",
        impact: "high",
        relevance: 90,
        source: "Government Policy Updates",
        actionable: true
      },
      {
        id: "3",
        type: "warning",
        title: "Application Deadlines Approaching",
        description: "Critical scholarship and college application deadlines in the next 8 weeks. Early applications have 30% higher success rates.",
        impact: "high",
        relevance: 88,
        source: "Admission Calendar Analysis",
        actionable: true
      },
      {
        id: "4",
        type: "market",
        title: "Remote Work Revolution",
        description: "70% of tech companies now offer remote work options, especially benefiting students from non-metro areas. Geographic barriers are diminishing.",
        impact: "medium",
        relevance: 85,
        source: "Employment Trends Report",
        actionable: true
      },
      {
        id: "5",
        type: "tip",
        title: "Portfolio Over Grades",
        description: "Tech recruiters now prioritize practical skills and project portfolios over academic grades. 80% of hiring decisions based on demonstrated ability.",
        impact: "medium",
        relevance: 82,
        source: "Recruiter Survey 2024",
        actionable: true
      }
    ];

    setRecommendations(newRecommendations);
    setInsights(newInsights);
    setLastGenerated(new Date());
    setIsGenerating(false);
    
    toast.success("AI recommendations updated based on your profile!");
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "course": return <BookOpen className="h-5 w-5" />;
      case "career": return <TrendingUp className="h-5 w-5" />;
      case "college": return <Building className="h-5 w-5" />;
      case "scholarship": return <Award className="h-5 w-5" />;
      case "internship": return <Briefcase className="h-5 w-5" />;
      case "skill": return <Target className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend": return <TrendingUp className="h-4 w-4" />;
      case "opportunity": return <Zap className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "tip": return <Lightbulb className="h-4 w-4" />;
      case "market": return <Users className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium": return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "low": return "border-green-500 bg-green-50 dark:bg-green-900/20";
      default: return "border-gray-300 bg-white dark:bg-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 dark:text-red-400";
      case "medium": return "text-yellow-600 dark:text-yellow-400";
      case "low": return "text-green-600 dark:text-green-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };

  const filteredRecommendations = filterType === "all" 
    ? recommendations 
    : recommendations.filter(rec => rec.type === filterType);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please sign in to access your personalized AI recommendations
            </p>
            <Button onClick={() => onNavigate?.("auth")}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton onBack={() => onNavigate?.("dashboard")} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Career Recommendations
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized guidance powered by advanced AI analysis
              </p>
            </div>
          </div>

          {lastGenerated && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              Last updated: {lastGenerated.toLocaleDateString()} at {lastGenerated.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Profile Summary */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Analysis Summary for {userProfile.firstName}
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Profile Match:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={userProfile.profileCompletion} className="flex-1 h-2" />
                      <span className="font-medium">{userProfile.profileCompletion}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Top Interests:</span>
                    <p className="font-medium">{userProfile.interests.slice(0, 2).join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Career Goals:</span>
                    <p className="font-medium">{userProfile.goals.slice(0, 1).join(", ")}</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => userProfile && generateRecommendations(userProfile)}
                disabled={isGenerating}
                variant="outline"
                size="sm"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh AI Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Market Insights
            </TabsTrigger>
          </TabsList>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                <Layers className="h-4 w-4 mr-2" />
                All ({recommendations.length})
              </Button>
              {["course", "career", "college", "scholarship", "internship", "skill"].map(type => {
                const count = recommendations.filter(r => r.type === type).length;
                if (count === 0) return null;
                return (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                  >
                    {getRecommendationIcon(type)}
                    <span className="ml-2 capitalize">{type}s ({count})</span>
                  </Button>
                );
              })}
            </div>

            {/* Recommendations Grid */}
            <div className="grid gap-6">
              {filteredRecommendations.map((rec, index) => (
                <Card 
                  key={rec.id} 
                  className={`${getPriorityColor(rec.priority)} border-2 hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                          {getRecommendationIcon(rec.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{rec.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {rec.matchScore}% Match
                            </Badge>
                          </div>
                          {rec.subtitle && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {rec.subtitle}
                            </p>
                          )}
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {rec.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">{rec.confidence}%</span>
                        </div>
                        <Badge 
                          variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {rec.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Reasoning */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Why This Recommendation
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {rec.reasoning.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Details */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        {rec.timeline && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Duration:</span>
                            <span>{rec.timeline}</span>
                          </div>
                        )}
                        {rec.estimatedCost && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Cost:</span>
                            <span>{rec.estimatedCost}</span>
                          </div>
                        )}
                        {rec.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">Location:</span>
                            <span>{rec.location}</span>
                          </div>
                        )}
                        {rec.deadline && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-500" />
                            <span className="font-medium">Deadline:</span>
                            <span className="text-red-600 dark:text-red-400">{rec.deadline}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h5 className="font-medium text-green-800 dark:text-green-200 mb-1">
                            Expected Outcome
                          </h5>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            {rec.potentialOutcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Steps */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Next Steps
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {rec.actionSteps.map((step, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                              {i + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {rec.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-4">
              {insights.map((insight) => (
                <Alert key={insight.id} className="border-l-4 border-l-blue-500">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === "warning" ? "bg-red-100 dark:bg-red-900/20" :
                      insight.type === "opportunity" ? "bg-green-100 dark:bg-green-900/20" :
                      insight.type === "trend" ? "bg-blue-100 dark:bg-blue-900/20" :
                      "bg-yellow-100 dark:bg-yellow-900/20"
                    }`}>
                      <div className={getImpactColor(insight.impact)}>
                        {getInsightIcon(insight.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {insight.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {insight.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {insight.relevance}% Relevant
                          </Badge>
                        </div>
                      </div>
                      <AlertDescription className="text-gray-700 dark:text-gray-300 mb-2">
                        {insight.description}
                      </AlertDescription>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Source: {insight.source}</span>
                        <span className={`${getImpactColor(insight.impact)} capitalize font-medium`}>
                          {insight.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Need More Personalized Guidance?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete your profile and take our assessments to get even more accurate AI recommendations
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => onNavigate?.("assessment")} variant="default">
                <Target className="h-4 w-4 mr-2" />
                Take Career Assessment
              </Button>
              <Button onClick={() => onNavigate?.("stream-assessment")} variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Stream Assessment
              </Button>
              <Button onClick={() => onNavigate?.("dashboard")} variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}