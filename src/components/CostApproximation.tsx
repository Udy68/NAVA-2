import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  MapPin, 
  GraduationCap, 
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  Home,
  Utensils,
  Bus,
  Coffee,
  Lightbulb
} from "lucide-react";

interface CostBreakdown {
  category: string;
  icon: typeof DollarSign;
  amount: number;
  description: string;
  isOptional?: boolean;
}

interface CourseData {
  name: string;
  duration: string;
  avgFees: number;
  scholarshipAvailable: boolean;
  jobProspects: string;
  avgSalary: string;
  costs: CostBreakdown[];
}

export function CostApproximation() {
  const { elementRef: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { elementRef: contentRef, isIntersecting: contentVisible } = useIntersectionObserver({ threshold: 0.1 });

  const [selectedStream, setSelectedStream] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("moderate");
  const [includeOptional, setIncludeOptional] = useState(false);

  const courseData: Record<string, CourseData[]> = {
    engineering: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        avgFees: 400000,
        scholarshipAvailable: true,
        jobProspects: "Excellent",
        avgSalary: "₹8-25 LPA",
        costs: [
          { category: "Tuition Fees", icon: GraduationCap, amount: 100000, description: "Per year academic fees" },
          { category: "Hostel & Food", icon: Home, amount: 80000, description: "Accommodation and meals per year" },
          { category: "Books & Supplies", icon: BookOpen, amount: 15000, description: "Study materials and equipment per year" },
          { category: "Transportation", icon: Bus, amount: 20000, description: "Local travel and home visits per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 30000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Laptop & Software", icon: Lightbulb, amount: 60000, description: "One-time tech setup cost", isOptional: true }
        ]
      },
      {
        name: "Mechanical Engineering",
        duration: "4 years",
        avgFees: 350000,
        scholarshipAvailable: true,
        jobProspects: "Good",
        avgSalary: "₹5-18 LPA",
        costs: [
          { category: "Tuition Fees", icon: GraduationCap, amount: 87500, description: "Per year academic fees" },
          { category: "Hostel & Food", icon: Home, amount: 75000, description: "Accommodation and meals per year" },
          { category: "Books & Supplies", icon: BookOpen, amount: 20000, description: "Study materials and workshop tools per year" },
          { category: "Transportation", icon: Bus, amount: 18000, description: "Local travel and home visits per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 25000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Tool Kit", icon: Lightbulb, amount: 25000, description: "Professional tool set (one-time)", isOptional: true }
        ]
      }
    ],
    medical: [
      {
        name: "MBBS",
        duration: "5.5 years",
        avgFees: 800000,
        scholarshipAvailable: true,
        jobProspects: "Excellent",
        avgSalary: "₹8-50+ LPA",
        costs: [
          { category: "Tuition Fees", icon: GraduationCap, amount: 145000, description: "Per year academic fees" },
          { category: "Hostel & Food", icon: Home, amount: 90000, description: "Accommodation and meals per year" },
          { category: "Books & Equipment", icon: BookOpen, amount: 40000, description: "Medical books and instruments per year" },
          { category: "Transportation", icon: Bus, amount: 22000, description: "Local travel and clinical visits per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 35000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Medical Kit", icon: Lightbulb, amount: 80000, description: "Stethoscope, lab coat, instruments (one-time)", isOptional: true }
        ]
      },
      {
        name: "BDS (Dental)",
        duration: "5 years",
        avgFees: 600000,
        scholarshipAvailable: true,
        jobProspects: "Good",
        avgSalary: "₹6-30 LPA",
        costs: [
          { category: "Tuition Fees", icon: GraduationCap, amount: 120000, description: "Per year academic fees" },
          { category: "Hostel & Food", icon: Home, amount: 85000, description: "Accommodation and meals per year" },
          { category: "Books & Equipment", icon: BookOpen, amount: 35000, description: "Dental books and basic instruments per year" },
          { category: "Transportation", icon: Bus, amount: 20000, description: "Local travel and clinical practice per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 30000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Dental Kit", icon: Lightbulb, amount: 150000, description: "Professional dental instruments (one-time)", isOptional: true }
        ]
      }
    ],
    commerce: [
      {
        name: "Chartered Accountancy (CA)",
        duration: "3-4 years",
        avgFees: 80000,
        scholarshipAvailable: false,
        jobProspects: "Excellent",
        avgSalary: "₹8-50+ LPA",
        costs: [
          { category: "Course Fees", icon: GraduationCap, amount: 20000, description: "CA registration and exam fees per year" },
          { category: "Hostel & Food", icon: Home, amount: 70000, description: "Accommodation and meals per year" },
          { category: "Books & Materials", icon: BookOpen, amount: 12000, description: "Study materials and practice books per year" },
          { category: "Transportation", icon: Bus, amount: 15000, description: "Travel for articleship and classes per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 25000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Laptop & Software", icon: Lightbulb, amount: 45000, description: "Computer and accounting software (one-time)", isOptional: true }
        ]
      },
      {
        name: "Bachelor of Commerce",
        duration: "3 years",
        avgFees: 150000,
        scholarshipAvailable: true,
        jobProspects: "Good",
        avgSalary: "₹4-15 LPA",
        costs: [
          { category: "Tuition Fees", icon: GraduationCap, amount: 50000, description: "Per year academic fees" },
          { category: "Hostel & Food", icon: Home, amount: 65000, description: "Accommodation and meals per year" },
          { category: "Books & Supplies", icon: BookOpen, amount: 8000, description: "Textbooks and stationery per year" },
          { category: "Transportation", icon: Bus, amount: 12000, description: "Local travel and home visits per year" },
          { category: "Personal Expenses", icon: Coffee, amount: 20000, description: "Entertainment and miscellaneous per year", isOptional: true },
          { category: "Laptop", icon: Lightbulb, amount: 35000, description: "Computer for assignments (one-time)", isOptional: true }
        ]
      }
    ]
  };

  const locationMultipliers = {
    budget: { name: "Tier-3 Cities", multiplier: 0.7, description: "Lower cost of living" },
    moderate: { name: "Tier-2 Cities", multiplier: 1.0, description: "Moderate cost of living" },
    premium: { name: "Metro Cities", multiplier: 1.4, description: "Higher cost of living" }
  };

  const calculateTotalCost = (course: CourseData | null) => {
    if (!course) return 0;
    
    const locationMultiplier = locationMultipliers[selectedLocation as keyof typeof locationMultipliers].multiplier;
    const yearlyCosts = course.costs.filter(cost => !cost.isOptional || includeOptional);
    const oneTimeCosts = yearlyCosts.filter(cost => cost.description.includes("one-time"));
    const recurringCosts = yearlyCosts.filter(cost => !cost.description.includes("one-time"));
    
    const totalYearlyRecurring = recurringCosts.reduce((sum, cost) => sum + cost.amount, 0);
    const totalOneTime = oneTimeCosts.reduce((sum, cost) => sum + cost.amount, 0);
    const duration = parseFloat(course.duration);
    
    return ((totalYearlyRecurring * duration) + totalOneTime) * locationMultiplier;
  };

  const getSelectedCourseData = () => {
    if (!selectedStream || !selectedCourse) return null;
    return courseData[selectedStream]?.find(course => course.name === selectedCourse) || null;
  };

  const selectedCourseData = getSelectedCourseData();

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
            Education Cost Calculator
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Get accurate cost estimates for your chosen career path and plan your education budget effectively
          </p>
        </div>

        <div 
          ref={contentRef}
          className={`transition-all duration-800 ease-out ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Course Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                Course Selection & Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Stream
                  </label>
                  <Select value={selectedStream} onValueChange={setSelectedStream}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Course
                  </label>
                  <Select 
                    value={selectedCourse} 
                    onValueChange={setSelectedCourse}
                    disabled={!selectedStream}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedStream && courseData[selectedStream]?.map((course) => (
                        <SelectItem key={course.name} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Location Type
                  </label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(locationMultipliers).map(([key, data]) => (
                        <SelectItem key={key} value={key}>
                          {data.name} - {data.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="optional"
                  checked={includeOptional}
                  onChange={(e) => setIncludeOptional(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="optional" className="text-sm text-gray-700 dark:text-gray-300">
                  Include optional expenses
                </label>
              </div>
            </CardContent>
          </Card>

          {selectedCourseData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cost Breakdown */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        Detailed Cost Breakdown
                      </span>
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {selectedCourseData.duration}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-6">
                      {selectedCourseData.costs.map((cost, index) => {
                        if (cost.isOptional && !includeOptional) return null;
                        
                        const IconComponent = cost.icon;
                        const locationMultiplier = locationMultipliers[selectedLocation as keyof typeof locationMultipliers].multiplier;
                        const adjustedAmount = cost.amount * locationMultiplier;
                        const isOneTime = cost.description.includes("one-time");
                        
                        return (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {cost.category}
                                  </h4>
                                  {cost.isOptional && (
                                    <Badge variant="outline" className="text-xs">
                                      Optional
                                    </Badge>
                                  )}
                                  {isOneTime && (
                                    <Badge className="text-xs bg-green-100 text-green-800">
                                      One-time
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {cost.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                ₹{adjustedAmount.toLocaleString('en-IN')}
                              </p>
                              {!isOneTime && (
                                <p className="text-xs text-gray-500">per year</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-gray-900 dark:text-white">Total Estimated Cost:</span>
                        <span className="text-2xl text-blue-600 dark:text-blue-400">
                          ₹{calculateTotalCost(selectedCourseData).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        For {selectedCourseData.duration} in {locationMultipliers[selectedLocation as keyof typeof locationMultipliers].name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Course Info & Tips */}
              <div className="space-y-6">
                {/* Course Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                      Course Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Duration</p>
                      <p className="font-medium">{selectedCourseData.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Job Prospects</p>
                      <Badge className={
                        selectedCourseData.jobProspects === "Excellent" ? "bg-green-100 text-green-800" :
                        selectedCourseData.jobProspects === "Good" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {selectedCourseData.jobProspects}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Average Starting Salary</p>
                      <p className="font-medium text-green-600">{selectedCourseData.avgSalary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Scholarships Available</p>
                      <div className="flex items-center space-x-1">
                        {selectedCourseData.scholarshipAvailable ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={selectedCourseData.scholarshipAvailable ? "text-green-600" : "text-red-600"}>
                          {selectedCourseData.scholarshipAvailable ? "Yes" : "Limited"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      Financial Planning Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Start saving early - even ₹5,000/month can build a substantial fund</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Apply for multiple scholarships to reduce financial burden</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Consider education loans with favorable terms and tax benefits</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Look for part-time opportunities or internships during studies</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p>Compare colleges for best value - not just prestige</p>
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Calculator */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600" />
                      Return on Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const totalCost = calculateTotalCost(selectedCourseData);
                      const minSalary = parseInt(selectedCourseData.avgSalary.split('-')[0].replace(/[₹\sLPA]/g, '')) * 100000;
                      const paybackYears = Math.ceil(totalCost / minSalary);
                      
                      return (
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Investment Payback Period</p>
                            <p className="text-lg font-semibold text-blue-600">
                              ~{paybackYears} years
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>• Based on minimum starting salary</p>
                            <p>• Actual ROI may vary with career growth</p>
                            <p>• Consider non-monetary benefits too</p>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {!selectedCourseData && (
            <Card className="text-center py-12">
              <CardContent>
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Course to Get Started
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose your stream and course above to see detailed cost breakdown and financial planning insights.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}