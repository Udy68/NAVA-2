import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Target, 
  GraduationCap, 
  Code, 
  Calculator, 
  Palette, 
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Brain
} from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useToast } from "./ToastProvider";

interface StreamAssessmentPromoProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function StreamAssessmentPromo({ onNavigate }: StreamAssessmentPromoProps) {
  const { elementRef: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { addToast } = useToast();

  const handleStartStreamAssessment = () => {
    addToast({
      type: 'info',
      title: 'Stream Assessment Starting',
      description: 'Discover your ideal academic path...',
      duration: 3000
    });
    onNavigate?.("stream-assessment");
  };

  const streams = [
    {
      name: "Science",
      icon: Code,
      subjects: ["PCM", "PCB", "PCMB"],
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      name: "Commerce", 
      icon: Calculator,
      subjects: ["With Math", "Without Math", "With Computer"],
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      name: "Arts",
      icon: Palette,
      subjects: ["Humanities", "Literature", "Creative Arts"],
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      name: "Diploma",
      icon: Award,
      subjects: ["Technical", "Computer", "Medical"],
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800"
    }
  ];

  const features = [
    {
      icon: Target,
      text: "8 specialized questions for stream selection"
    },
    {
      icon: Brain,
      text: "Personalized recommendations based on your interests"
    },
    {
      icon: Clock,
      text: "Takes only 5-7 minutes to complete"
    },
    {
      icon: CheckCircle2,
      text: "Detailed subject and career path guidance"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={sectionRef}
          className={`transition-all duration-800 ease-out ${
            sectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >


          {/* Assessment CTA */}
          <Card className="border-2 border-dashed border-blue-300 dark:border-blue-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Not Sure Which Stream to Choose?
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Take our specialized Academic Stream Assessment to discover which path aligns with your interests, strengths, and career goals.
                  </p>
                  
                  <Button 
                    size="lg"
                    onClick={handleStartStreamAssessment}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 px-8 text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Take Stream Assessment
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                    What You'll Get:
                  </h4>
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                          sectionVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 translate-x-8'
                        }`}
                        style={{ 
                          transitionDelay: sectionVisible ? `${(index + 4) * 100}ms` : '0ms'
                        }}
                      >
                        <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}