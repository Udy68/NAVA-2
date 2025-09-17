import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  FlaskConical, TrendingUp, Palette, ArrowRight, 
  BookOpen, GraduationCap, Users
} from "lucide-react";

interface StreamCardsProps {
  onNavigate?: (page: string, params?: any) => void;
  className?: string;
}

export function StreamCards({ onNavigate, className = "" }: StreamCardsProps) {
  const streams = [
    {
      id: "science",
      title: "Science Stream",
      subtitle: "PCM • PCB • PCMB",
      description: "Physics, Chemistry, Mathematics & Biology for engineering, medical, and research fields",
      icon: FlaskConical,
      color: "from-blue-500 to-cyan-500",
      difficulty: "High",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      highlights: ["Engineering & Medical preparation", "Strong analytical skills", "Laboratory experience"]
    },
    {
      id: "commerce",
      title: "Commerce Stream", 
      subtitle: "Business • Economics • Finance",
      description: "Business Studies, Accountancy, and Economics for future business leaders",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      difficulty: "Medium-High",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      highlights: ["Business & entrepreneurship", "Financial management", "Market understanding"]
    },
    {
      id: "arts",
      title: "Arts & Humanities",
      subtitle: "Literature • Social Sciences • Arts",
      description: "History, Political Science, Psychology, and Languages for social innovation",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      difficulty: "Medium",
      subjects: ["History", "Political Science", "Psychology", "Literature"],
      highlights: ["Critical thinking skills", "Civil services preparation", "Creative careers"]
    }
  ];

  const handleStreamClick = (streamId: string) => {
    if (onNavigate) {
      onNavigate("stream-details", { stream: streamId });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "Medium-High": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
      case "Medium": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Academic Stream
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore detailed information about Class 11-12 streams. Click any card to learn more.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {streams.map((stream) => {
          const IconComponent = stream.icon;
          return (
            <Card 
              key={stream.id} 
              className="group hover:shadow-xl transition-all duration-300 border-2 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleStreamClick(stream.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stream.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={getDifficultyColor(stream.difficulty)}>
                    {stream.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {stream.title}
                </CardTitle>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stream.subtitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {stream.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Key Subjects */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Key Subjects:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {stream.subjects.slice(0, 3).map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {stream.subjects.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{stream.subjects.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Key Highlights */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Highlights:
                  </h4>
                  <div className="space-y-1">
                    {stream.highlights.slice(0, 2).map((highlight, index) => (
                      <div key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <Button 
                  className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStreamClick(stream.id);
                  }}
                >
                  Explore {stream.title.split(" ")[0]}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Help Section */}
      <Card className="mt-8 border-2 border-dashed border-blue-200 dark:border-blue-700">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Need Help Choosing?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Take our assessment to get personalized recommendations.
          </p>
          <Button 
            onClick={() => onNavigate?.("assessment")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Take Assessment
          </Button>
        </CardContent>
      </Card>

      {/* Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">For Class 11-12 Students</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Click on any stream card above to explore detailed subject information and study strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}