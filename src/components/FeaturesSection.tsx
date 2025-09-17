import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Target, TrendingUp, MapPin, Calendar, Brain, Users } from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useToast } from "./ToastProvider";
import { StreamCards } from "./StreamCards";

interface FeaturesSectionProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function FeaturesSection({ onNavigate }: FeaturesSectionProps) {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { elementRef: cardsRef, isIntersecting: cardsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { addToast } = useToast();

  const features = [
    {
      icon: Target,
      title: "Aptitude Assessment",
      description: "Take our comprehensive quiz to discover your interests, strengths, and personality traits. Get personalized recommendations based on your unique profile.",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
      action: () => {
        onNavigate?.("assessment");
      }
    },
    {
      icon: TrendingUp,
      title: "Career Path Mapping",
      description: "Explore detailed visual charts showing career opportunities for each degree. Understand which industries and job roles each course can lead to.",
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
      action: () => {
        onNavigate?.("courses");
      }
    },
    {
      icon: MapPin,
      title: "College Directory",
      description: "Find government colleges near you with detailed information about programs, eligibility criteria, facilities, and admission requirements.",
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
      action: () => {
        onNavigate?.("colleges");
      }
    },
    {
      icon: Calendar,
      title: "Timeline Tracker",
      description: "Never miss important dates! Get notifications for admission deadlines, scholarship applications, entrance exams, and counseling schedules.",
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
      action: () => {
        onNavigate?.("timeline");
      }
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      description: "Our intelligent system learns from your preferences and provides personalized suggestions for courses, colleges, and career paths.",
      color: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300",
      action: () => {
        onNavigate?.("dashboard");
      }
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Access resources and guidance from education experts, career counselors, and successful professionals in various fields.",
      color: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300",
      action: () => {
        onNavigate?.("auth");
      }
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-800 ease-out ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
            Everything You Need to Make the Right Choice
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools and information you need to make informed 
            decisions about your educational and career future.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                onClick={feature.action}
                className={`border-0 shadow-md hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group bg-white dark:bg-gray-800 cursor-pointer ${
                  cardsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: cardsVisible ? `${index * 100}ms` : '0ms' 
                }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-7 w-7 lg:h-8 lg:w-8" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl text-gray-900 dark:text-white leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stream Selection Section */}
      <div className="mt-16">
        <StreamCards onNavigate={onNavigate} />
      </div>
    </section>
  );
}