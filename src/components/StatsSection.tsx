import { Card, CardContent } from "./ui/card";
import { Users, GraduationCap, MapPin, Target } from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useState, useEffect } from "react";

export function StatsSection() {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { elementRef: statsRef, isIntersecting: statsVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: Users,
      value: "50,000+",
      numericValue: 50000,
      label: "Students Guided",
      description: "Successfully helped students make informed career decisions",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
    },
    {
      icon: GraduationCap,
      value: "1,200+",
      numericValue: 1200,
      label: "Course Options",
      description: "Comprehensive database of degree programs and career paths",
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
    },
    {
      icon: MapPin,
      value: "500+",
      numericValue: 500,
      label: "Government Colleges",
      description: "Listed colleges across India with detailed information",
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
    },
    {
      icon: Target,
      value: "95%",
      numericValue: 95,
      label: "Accuracy Rate",
      description: "Students satisfied with our personalized recommendations",
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300"
    }
  ];

  // Animated counter effect
  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.numericValue / steps;
      
      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(currentStep * increment, stat.numericValue);
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(currentValue);
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [statsVisible]);

  const formatValue = (index: number, originalValue: string) => {
    const counter = counters[index];
    if (originalValue.includes('%')) {
      return `${counter}%`;
    } else if (originalValue.includes('+')) {
      return counter >= 1000 ? `${Math.floor(counter / 1000)},${counter % 1000}+` : `${counter}+`;
    }
    return counter.toString();
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800 transition-colors">
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
            Trusted by Students Across India
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Our platform has helped thousands of students make the right educational choices
          </p>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className={`text-center border-0 shadow-md hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 group bg-white dark:bg-gray-700 ${
                  statsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ 
                  transitionDelay: statsVisible ? `${index * 150}ms` : '0ms' 
                }}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="flex justify-center mb-4">
                    <div className={`w-14 h-14 lg:w-16 lg:h-16 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="h-7 w-7 lg:h-8 lg:w-8" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 tabular-nums">
                    {formatValue(index, stat.value)}
                  </div>
                  <div className="text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {stat.label}
                  </div>
                  <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}