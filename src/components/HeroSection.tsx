import { Sparkles, TrendingUp, Users, Award } from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useToast } from "./ToastProvider";

interface HeroSectionProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { elementRef: heroRef, isIntersecting: heroVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: cardsRef, isIntersecting: cardsVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { addToast } = useToast();

  const features = [
    {
      icon: TrendingUp,
      title: "Career Mapping",
      description: "Visualize your career path with interactive flowcharts and discover job prospects for different degree programs.",
      color: { bg: "bg-blue-100 dark:bg-blue-900", icon: "text-blue-600 dark:text-blue-300" },
      action: () => {
        onNavigate?.("courses");
      }
    },
    {
      icon: Users,
      title: "Personalized Guidance", 
      description: "Get AI-driven recommendations based on your interests, skills, and academic background through comprehensive assessments.",
      color: { bg: "bg-green-100 dark:bg-green-900", icon: "text-green-600 dark:text-green-300" },
      action: () => {
        onNavigate?.("assessment");
      }
    },
    {
      icon: Award,
      title: "Complete Resources",
      description: "Access government college directories, scholarship opportunities, and internship programs all in one place.",
      color: { bg: "bg-purple-100 dark:bg-purple-900", icon: "text-purple-600 dark:text-purple-300" },
      action: () => {
        onNavigate?.("scholarships");
      }
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div 
            ref={heroRef}
            className={`transition-all duration-1000 ease-out ${
              heroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-6 transform hover:scale-105 transition-all duration-300 cursor-default">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Career Guidance Platform</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Welcome to Your Career Journey
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover your potential through personalized assessments, explore career paths with visual mapping, 
              and make informed decisions about your academic future.
            </p>
          </div>

          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  onClick={feature.action}
                  className={`transition-all duration-700 ease-out ${
                    cardsVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-12'
                  } bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 group cursor-pointer`}
                  style={{ 
                    transitionDelay: cardsVisible ? `${index * 150}ms` : '0ms',
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 ${feature.color.bg} rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-7 w-7 lg:h-8 lg:w-8 ${feature.color.icon}`} />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}