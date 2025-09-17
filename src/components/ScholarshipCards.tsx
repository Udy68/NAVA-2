import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, DollarSign, GraduationCap, Users, ExternalLink, BookOpen } from "lucide-react";

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  eligibility: string[];
  deadline: string;
  category: string;
  description: string;
  applicationLink: string;
  documentsRequired: string[];
}

export function ScholarshipCards() {
  const scholarships: Scholarship[] = [
    {
      id: "1",
      name: "National Scholarship Portal (NSP)",
      provider: "Government of India",
      amount: "₹12,000 - ₹1,25,000 per year",
      eligibility: ["Class 10th passed", "Family income < ₹2.5 lakhs", "Merit-based selection"],
      deadline: "31st October 2024",
      category: "Merit-cum-Means",
      description: "Comprehensive scholarship scheme for students from economically weaker sections with good academic performance.",
      applicationLink: "https://scholarships.gov.in",
      documentsRequired: ["Income certificate", "Caste certificate", "Mark sheets", "Bank details"]
    },
    {
      id: "2", 
      name: "Prime Minister's Special Scholarship Scheme",
      provider: "J&K Government",
      amount: "₹1,25,000 per year",
      eligibility: ["Resident of J&K", "Admission in colleges outside J&K", "Merit-based"],
      deadline: "30th September 2024",
      category: "Regional",
      description: "Special scholarship for J&K students pursuing higher education outside the state in premier institutions.",
      applicationLink: "https://www.jkscholarships.com",
      documentsRequired: ["Domicile certificate", "Admission letter", "Academic records", "Income proof"]
    },
    {
      id: "3",
      name: "Post Matric Scholarship for SC/ST",
      provider: "Ministry of Social Justice",
      amount: "₹8,000 - ₹35,000 per year",
      eligibility: ["SC/ST category", "Class 10th passed", "Pursuing post-matriculation"],
      deadline: "15th November 2024",
      category: "Social Category",
      description: "Financial assistance for SC/ST students to pursue post-matriculation studies.",
      applicationLink: "https://scholarships.gov.in",
      documentsRequired: ["Caste certificate", "Income certificate", "Academic documents", "Bank account"]
    },
    {
      id: "4",
      name: "Merit Scholarship for Technical Courses",
      provider: "AICTE",
      amount: "₹20,000 - ₹50,000 per year",
      eligibility: ["Engineering/Technical courses", "Top 10% in entrance exams", "Family income < ₹6 lakhs"],
      deadline: "20th December 2024",
      category: "Technical Education",
      description: "Scholarship for meritorious students pursuing technical education in AICTE approved institutions.",
      applicationLink: "https://www.aicte-india.org",
      documentsRequired: ["JEE/Entrance scorecard", "Income certificate", "Admission letter", "Academic transcripts"]
    },
    {
      id: "5",
      name: "Girl Child Education Scholarship",
      provider: "Various State Governments",
      amount: "₹5,000 - ₹25,000 per year",
      eligibility: ["Female students", "Class 10th passed", "Pursuing higher education"],
      deadline: "Varies by state",
      category: "Gender-based",
      description: "Special scholarship to promote higher education among girl students across various streams.",
      applicationLink: "State education portals",
      documentsRequired: ["Gender certificate", "Academic records", "Family income proof", "Bank details"]
    },
    {
      id: "6",
      name: "Central Sector Scholarship Scheme",
      provider: "Department of Higher Education",
      amount: "₹10,000 - ₹20,000 per year",
      eligibility: ["Top 20% in Class 12th", "Family income < ₹4.5 lakhs", "Regular course"],
      deadline: "31st October 2024",
      category: "Central Government",
      description: "Merit-based scholarship for students who have secured admission in recognized institutions.",
      applicationLink: "https://scholarships.gov.in",
      documentsRequired: ["Class 12 marksheet", "Income certificate", "Admission proof", "Bank account details"]
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Merit-cum-Means": "bg-blue-100 text-blue-800",
      "Regional": "bg-green-100 text-green-800", 
      "Social Category": "bg-purple-100 text-purple-800",
      "Technical Education": "bg-orange-100 text-orange-800",
      "Gender-based": "bg-pink-100 text-pink-800",
      "Central Government": "bg-indigo-100 text-indigo-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Government Scholarships</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore financial aid opportunities from government schemes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <Card key={scholarship.id} className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getCategoryColor(scholarship.category)}>
                  {scholarship.category}
                </Badge>
                <GraduationCap className="h-5 w-5 text-gray-500" />
              </div>
              <CardTitle className="text-lg mb-1">{scholarship.name}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scholarship.provider}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">{scholarship.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium text-green-700 dark:text-green-400">{scholarship.amount}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-red-700 dark:text-red-400">Deadline: {scholarship.deadline}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Eligibility:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {scholarship.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documents Required:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {scholarship.documentsRequired.map((doc, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button className="w-full" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Need Help with Applications?</h3>
            <p className="text-blue-600 dark:text-blue-300 text-sm mb-4">
              Get personalized guidance on scholarship applications and document preparation
            </p>
            <Button variant="outline" size="sm">
              Get Application Help
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}