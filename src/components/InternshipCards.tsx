import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Clock, Briefcase, ExternalLink, Calendar, Users, IndianRupee } from "lucide-react";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  description: string;
  requirements: string[];
  skills: string[];
  applicationDeadline: string;
  posted: string;
}

export function InternshipCards() {
  const internships: Internship[] = [
    {
      id: "1",
      title: "Software Development Intern",
      company: "Tech Mahindra",
      location: "Bangalore, Karnataka",
      duration: "3 months",
      stipend: "₹15,000 - ₹20,000/month",
      type: "Technical",
      description: "Work on real-world software projects, learn modern development practices, and collaborate with experienced developers.",
      requirements: ["B.Tech/MCA student", "Knowledge of programming languages", "Strong problem-solving skills"],
      skills: ["Java", "Python", "React", "Database Management"],
      applicationDeadline: "15th December 2024",
      posted: "5 days ago"
    },
    {
      id: "2",
      title: "Digital Marketing Intern", 
      company: "Reliance Industries",
      location: "Mumbai, Maharashtra",
      duration: "6 months",
      stipend: "₹12,000 - ₹18,000/month",
      type: "Marketing",
      description: "Assist in digital marketing campaigns, social media management, and market research for various Reliance brands.",
      requirements: ["Graduate/Post-graduate", "Basic understanding of digital marketing", "Creative mindset"],
      skills: ["Social Media Marketing", "Content Creation", "Analytics", "SEO"],
      applicationDeadline: "20th December 2024",
      posted: "3 days ago"
    },
    {
      id: "3",
      title: "Research Assistant",
      company: "Indian Institute of Science",
      location: "Bangalore, Karnataka", 
      duration: "4 months",
      stipend: "₹8,000 - ₹12,000/month",
      type: "Research",
      description: "Support ongoing research projects in various scientific domains and contribute to publications.",
      requirements: ["M.Sc/B.Tech final year", "Strong analytical skills", "Research experience preferred"],
      skills: ["Data Analysis", "Research Methodology", "Technical Writing", "Laboratory Skills"],
      applicationDeadline: "10th January 2025",
      posted: "1 week ago"
    },
    {
      id: "4",
      title: "Business Analyst Trainee",
      company: "Infosys Limited",
      location: "Pune, Maharashtra",
      duration: "6 months",
      stipend: "₹18,000 - ₹25,000/month",
      type: "Business",
      description: "Learn business analysis, client interaction, and project management while working on live projects.",
      requirements: ["MBA/B.Com graduate", "Strong communication skills", "Analytical mindset"],
      skills: ["Business Analysis", "Excel", "PowerBI", "Client Communication"],
      applicationDeadline: "25th December 2024",
      posted: "2 days ago"
    },
    {
      id: "5",
      title: "Graphic Design Intern",
      company: "Ogilvy & Mather",
      location: "New Delhi",
      duration: "3 months",
      stipend: "₹10,000 - ₹15,000/month", 
      type: "Creative",
      description: "Create visual content for advertising campaigns, social media, and brand communications.",
      requirements: ["Design graduate/student", "Portfolio required", "Creative software proficiency"],
      skills: ["Adobe Creative Suite", "UI/UX Design", "Brand Design", "Typography"],
      applicationDeadline: "18th December 2024",
      posted: "4 days ago"
    },
    {
      id: "6",
      title: "Data Science Intern",
      company: "Flipkart",
      location: "Bangalore, Karnataka",
      duration: "4 months",
      stipend: "₹20,000 - ₹30,000/month",
      type: "Data Science",
      description: "Work with large datasets, build predictive models, and contribute to data-driven decision making.",
      requirements: ["B.Tech/M.Tech in CS/IT", "Knowledge of ML algorithms", "Programming skills"],
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      applicationDeadline: "30th December 2024",
      posted: "1 day ago"
    },
    {
      id: "7",
      title: "Content Writing Intern",
      company: "Times Internet",
      location: "Remote/Delhi",
      duration: "3 months",
      stipend: "₹8,000 - ₹12,000/month",
      type: "Content",
      description: "Create engaging content for various digital platforms, blogs, and marketing materials.",
      requirements: ["Graduate in any field", "Excellent writing skills", "Knowledge of digital platforms"],
      skills: ["Content Writing", "SEO Writing", "Social Media", "Research"],
      applicationDeadline: "22nd December 2024", 
      posted: "6 days ago"
    },
    {
      id: "8",
      title: "Finance Intern",
      company: "HDFC Bank",
      location: "Mumbai, Maharashtra",
      duration: "6 months", 
      stipend: "₹15,000 - ₹22,000/month",
      type: "Finance",
      description: "Learn banking operations, financial analysis, and customer service in a leading financial institution.",
      requirements: ["B.Com/MBA Finance", "Strong numerical skills", "Interest in banking"],
      skills: ["Financial Analysis", "Excel", "Banking Operations", "Customer Service"],
      applicationDeadline: "28th December 2024",
      posted: "3 days ago"
    }
  ];

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Technical": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Marketing": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Research": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Business": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Creative": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Data Science": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Content": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Finance": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
    };
    return colors[type] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Internship Opportunities</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Gain practical experience with leading companies and organizations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {internships.map((internship) => (
          <Card key={internship.id} className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getTypeColor(internship.type)}>
                  {internship.type}
                </Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400">{internship.posted}</span>
              </div>
              <CardTitle className="text-lg mb-1">{internship.title}</CardTitle>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{internship.company}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">{internship.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                  <span>{internship.location}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-600" />
                  <span>{internship.duration}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <IndianRupee className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium text-green-700 dark:text-green-400">{internship.stipend}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-red-600" />
                  <span className="text-red-700 dark:text-red-400">Apply by: {internship.applicationDeadline}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Requirements:
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  {internship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Skills:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {internship.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
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
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Want to Post an Internship?</h3>
            <p className="text-green-600 dark:text-green-300 text-sm mb-4">
              Companies can post internship opportunities to connect with talented students
            </p>
            <Button variant="outline" size="sm">
              Post Internship
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}