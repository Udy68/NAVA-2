import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Star, Users, Award } from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useToast } from "./ToastProvider";

interface CTASectionProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function CTASection({ onNavigate }: CTASectionProps) {
  const { elementRef: ctaRef, isIntersecting: ctaVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { addToast } = useToast();

  const handleStartAssessment = () => {
    addToast({
      type: 'success',
      title: 'Assessment Starting',
      description: 'Beginning your personalized career assessment journey...',
      duration: 3000
    });
    onNavigate?.("assessment");
  };

  const handleLearnMore = () => {
    addToast({
      type: 'info',
      title: 'College Directory',
      description: 'Exploring college options and information...',
      duration: 3000
    });
    onNavigate?.("colleges");
  };

  const features = [
    { icon: Star, text: "Free assessment" },
    { icon: Users, text: "Instant results" },
    { icon: Award, text: "Personalized recommendations" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div 
        ref={ctaRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className={`transition-all duration-1000 ease-out ${
          ctaVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Sparkles className="h-10 w-10 lg:h-12 lg:w-12 text-white animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-6 lg:mb-8 leading-tight">
            Ready to Discover Your Future?
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of students who have already found their perfect career path. 
            Start your personalized assessment today and take the first step towards your dream career.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-10 lg:mb-12 transition-all duration-700 ease-out ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '300ms' }}>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold"
              onClick={() => onNavigate?.("assessment")}
            >
              Start Free Assessment
              <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300 h-12 lg:h-14 px-6 lg:px-8 text-base lg:text-lg font-semibold backdrop-blur-sm"
              onClick={() => onNavigate?.("colleges")}
            >
              Learn More
            </Button>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 text-blue-200 transition-all duration-700 ease-out ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center gap-2 lg:gap-3">
                  <IconComponent className="h-5 w-5 lg:h-6 lg:w-6 text-blue-300" />
                  <span className="text-sm lg:text-base font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}