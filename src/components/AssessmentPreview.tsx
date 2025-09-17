import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, ArrowRight, Brain, BookOpen, Code, Palette, Target, GraduationCap } from "lucide-react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useToast } from "./ToastProvider";

interface AssessmentPreviewProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function AssessmentPreview({ onNavigate }: AssessmentPreviewProps) {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { elementRef: leftRef, isIntersecting: leftVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { elementRef: rightRef, isIntersecting: rightVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { addToast } = useToast();

  const handleStartAssessment = () => {
    addToast({
      type: 'info',
      title: 'Assessment Starting',
      description: 'Redirecting to your personalized career assessment...',
      duration: 3000
    });
    onNavigate?.("assessment");
  };

  const handleStartStreamAssessment = () => {
    addToast({
      type: 'info',
      title: 'Stream Assessment Starting',
      description: 'Redirecting to your academic stream assessment...',
      duration: 3000
    });
    onNavigate?.("stream-assessment");
  };

  const sampleQuestions = [
    {
      category: "Interests",
      icon: Brain,
      question: "Which activity excites you the most?",
      options: ["Solving complex problems", "Creating artistic designs", "Leading team projects", "Analyzing data patterns"],
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
    },
    {
      category: "Skills",
      icon: Code,
      question: "What comes naturally to you?",
      options: ["Technical problem-solving", "Creative expression", "Communication", "Mathematical calculations"],
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
    },
    {
      category: "Values",
      icon: Palette,
      question: "What motivates you in your ideal career?",
      options: ["Making a social impact", "Financial stability", "Creative freedom", "Intellectual challenges"],
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
    }
  ];

  const careerSuggestions = [
    { field: "Science", match: "92%", courses: ["B.Sc Physics", "B.Tech Engineering", "B.Sc Computer Science"], color: "bg-blue-500" },
    { field: "Commerce", match: "78%", courses: ["B.Com", "BBA", "B.Com (Honours)"], color: "bg-green-500" },
    { field: "Arts", match: "65%", courses: ["B.A Psychology", "B.A English", "B.A History"], color: "bg-purple-500" }
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
            Discover Your Perfect Career Path
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Take our comprehensive assessment to understand your interests, strengths, and get 
            personalized recommendations for your future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Assessment Preview */}
          <div 
            ref={leftRef}
            className={`transition-all duration-800 ease-out ${
              leftVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <h3 className="text-2xl lg:text-3xl text-gray-900 dark:text-white mb-6 lg:mb-8">Sample Assessment Questions</h3>
            <div className="space-y-6 lg:space-y-8">
              {sampleQuestions.map((question, index) => {
                const IconComponent = question.icon;
                return (
                  <Card 
                    key={index} 
                    className={`border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      leftVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: leftVisible ? `${index * 200}ms` : '0ms' }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 ${question.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          <IconComponent className="h-5 w-5 lg:h-6 lg:w-6" />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${question.color.split(' ')[2]} mb-1`}>{question.category}</div>
                          <CardTitle className="text-lg lg:text-xl text-gray-900 dark:text-white leading-tight">{question.question}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-3">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center p-3 lg:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm lg:text-base text-gray-700 dark:text-gray-300">{option}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Results Preview */}
          <div 
            ref={rightRef}
            className={`transition-all duration-800 ease-out ${
              rightVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-12'
            }`}
          >
            <h3 className="text-2xl lg:text-3xl text-gray-900 dark:text-white mb-6 lg:mb-8">Your Personalized Results</h3>
            
            <Card className={`mb-6 lg:mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:shadow-lg transition-all duration-300 ${
              rightVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center text-green-800 dark:text-green-300 text-lg lg:text-xl">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  Assessment Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 dark:text-green-300 mb-6 text-base lg:text-lg leading-relaxed">
                  Based on your responses, we've identified your top career matches and course recommendations.
                </p>
                
                <div className="space-y-4 lg:space-y-6">
                  {careerSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 lg:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                        rightVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: rightVisible ? `${(index + 1) * 200}ms` : '0ms' }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-white text-lg">{suggestion.field}</span>
                          <div className="flex items-center">
                            <div className={`w-2 h-2 ${suggestion.color} rounded-full mr-2`}></div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">{suggestion.match} match</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.courses.map((course, courseIndex) => (
                            <span key={courseIndex} className="text-xs lg:text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button 
                size="lg" 
                onClick={handleStartAssessment}
                className={`w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white h-12 lg:h-14 text-base lg:text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${
                  rightVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: rightVisible ? '800ms' : '0ms' }}
              >
                <Brain className="mr-2 h-5 w-5" />
                Career Aptitude Assessment
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </Button>
              
              <div className={`text-center transition-all duration-800 ease-out ${
                rightVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: rightVisible ? '900ms' : '0ms' }}>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Or choose your academic path</p>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleStartStreamAssessment}
                  className="w-full h-12 lg:h-14 text-base lg:text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Academic Stream Assessment
                  <GraduationCap className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}