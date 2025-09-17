import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  ChevronRight,
  BookOpen,
  Code,
  Stethoscope,
  Calculator,
  Palette,
  Globe,
  Zap,
  Target,
  Award,
  ArrowRight,
  Building,
  Lightbulb,
  School,
  FileText,
  Wrench,
  Laptop,
  Heart,
  ShoppingBag,
  Camera,
  Truck
} from "lucide-react";

interface CareerPath {
  id: string;
  title: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  salary: string;
  growth: number;
  description: string;
  skills: string[];
  jobRoles: string[];
  companies: string[];
  shortTermOptions: {
    title: string;
    duration: string;
    description: string;
    jobs: string[];
  }[];
}

interface CourseStream {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  careers: CareerPath[];
}

interface CourseCareerMappingProps {
  filter?: string;
  stream?: "science" | "commerce" | "arts";
  onNavigate?: (page: string, params?: any) => void;
}

export function CourseCareerMapping({ filter, stream, onNavigate }: CourseCareerMappingProps = {}) {
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>("class11-12");
  const [selectedStream, setSelectedStream] = useState<string>("science-stream");
  const [selectedCareer, setSelectedCareer] = useState<string>("");

  // Handle filter parameter to automatically select relevant course/career
  const handleFilterNavigation = React.useCallback((filterCategory: string) => {
    // Define arrays inline since they need to be after component definition
    const findCareerInStreams = (streams: CourseStream[], levelId: string) => {
      for (const stream of streams) {
        for (const career of stream.careers) {
          if (career.id === filterCategory) {
            setSelectedEducationLevel(levelId);
            setSelectedStream(stream.id);
            setSelectedCareer(career.id);
            return true;
          }
        }
      }
      return false;
    };

    // Search in class 11-12 options first
    if (!findCareerInStreams(class1112Options, "class11-12")) {
      // Then search in diploma options
      if (!findCareerInStreams(diplomaOptions, "diploma")) {
        // Finally search in degree programs
        findCareerInStreams(courseStreams, "degree");
      }
    }
  }, []);

  // Apply filter on component mount
  React.useEffect(() => {
    if (filter) {
      handleFilterNavigation(filter);
    }
  }, [filter]);

  // Handle stream parameter - automatically navigate to Class 11-12 streams section
  React.useEffect(() => {
    if (stream) {
      setSelectedEducationLevel("class11-12");
      
      // Map stream names to stream IDs
      const streamMapping: Record<string, string> = {
        science: "science-stream",
        commerce: "commerce-stream", 
        arts: "arts-stream"
      };
      
      const streamId = streamMapping[stream];
      if (streamId) {
        setSelectedStream(streamId);
      }
    }
  }, [stream]);

  // Function to handle stream card click - navigate to stream details
  const handleStreamCardClick = (streamId: string) => {
    if (onNavigate && selectedEducationLevel === "class11-12") {
      // Map stream IDs to navigation stream names
      const streamNavigationMapping: Record<string, string> = {
        "science-stream": "science",
        "commerce-stream": "commerce", 
        "arts-stream": "arts"
      };
      
      const streamName = streamNavigationMapping[streamId];
      if (streamName) {
        onNavigate("stream-details", { stream: streamName });
      }
    }
  };

  // Education level categories
  const educationLevels = [
    {
      id: "class11-12",
      name: "Class 11-12 Streams",
      icon: BookOpen,
      description: "Choose your subject stream for Class 11-12 after Class 10"
    },
    {
      id: "diploma",
      name: "Diploma Courses",
      icon: Award,
      description: "Professional diploma courses after Class 10 or 12"
    },
    {
      id: "degree",
      name: "Degree Programs",
      icon: GraduationCap,
      description: "Bachelor's degree and professional courses after Class 12"
    }
  ];

  // Class 11-12 Stream options (what students choose after Class 10)
  const class1112Options: CourseStream[] = [
    {
      id: "science-stream",
      name: "Science Stream",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Physics, Chemistry, Mathematics/Biology - Gateway to engineering and medical careers",
      careers: [
        {
          id: "science-pcm",
          title: "Science (PCM) - Physics, Chemistry, Mathematics",
          duration: "2 years (Class 11-12)",
          difficulty: "Medium",
          salary: "Leads to ₹5-50+ LPA careers",
          growth: 90,
          description: "Prepares for engineering, technology, and mathematical careers",
          skills: ["Logical Reasoning", "Problem Solving", "Mathematical Analysis", "Scientific Thinking", "Research Skills"],
          jobRoles: ["After graduation: Engineer", "Scientist", "Researcher", "Data Analyst", "Tech Professional"],
          companies: ["After B.Tech: Google", "Microsoft", "ISRO", "TCS", "Infosys", "IITs"],
          shortTermOptions: [
            {
              title: "JEE Preparation Coaching",
              duration: "2 years alongside 11-12",
              description: "Prepare for engineering entrance exams",
              jobs: ["Engineering College Admission", "B.Tech Programs", "Technical Careers"]
            },
            {
              title: "Mathematics Olympiad Training",
              duration: "Ongoing during 11-12",
              description: "Advanced mathematical problem solving",
              jobs: ["Scholarships", "International Recognition", "Research Opportunities"]
            }
          ]
        },
        {
          id: "science-pcb",
          title: "Science (PCB) - Physics, Chemistry, Biology",
          duration: "2 years (Class 11-12)",
          difficulty: "Hard",
          salary: "Leads to ₹8-100+ LPA careers",
          growth: 95,
          description: "Gateway to medical, dental, veterinary, and life sciences careers",
          skills: ["Biological Understanding", "Chemical Analysis", "Scientific Reasoning", "Patient Care", "Research Methods"],
          jobRoles: ["After graduation: Doctor", "Dentist", "Pharmacist", "Researcher", "Healthcare Professional"],
          companies: ["After MBBS: AIIMS", "Apollo", "Fortis", "Research Institutes", "Pharmaceutical Companies"],
          shortTermOptions: [
            {
              title: "NEET Preparation Coaching",
              duration: "2 years alongside 11-12",
              description: "Prepare for medical entrance exams",
              jobs: ["Medical College Admission", "MBBS Programs", "Healthcare Careers"]
            },
            {
              title: "Laboratory Techniques Course",
              duration: "6 months during/after 12th",
              description: "Hands-on lab skills for biology students",
              jobs: ["Lab Assistant", "Research Support", "Medical Lab Technician"]
            }
          ]
        }
      ]
    },
    {
      id: "commerce-stream",
      name: "Commerce Stream",
      icon: Calculator,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Business, Accounting, Economics - Foundation for business and finance careers",
      careers: [
        {
          id: "commerce-stream",
          title: "Commerce - Accounts, Business Studies, Economics",
          duration: "2 years (Class 11-12)",
          difficulty: "Medium",
          salary: "Leads to ₹4-50+ LPA careers",
          growth: 80,
          description: "Prepares for business, finance, accounting, and entrepreneurship careers",
          skills: ["Financial Analysis", "Business Acumen", "Mathematical Skills", "Communication", "Economics Understanding"],
          jobRoles: ["After graduation: CA", "Manager", "Banker", "Entrepreneur", "Financial Advisor"],
          companies: ["After B.Com/CA: Deloitte", "PwC", "Banks", "MNCs", "Startups"],
          shortTermOptions: [
            {
              title: "Tally & Accounting Software",
              duration: "3-4 months during 12th",
              description: "Learn practical accounting software skills",
              jobs: ["Accounting Assistant", "Data Entry", "Bookkeeper"]
            },
            {
              title: "Stock Market Basics",
              duration: "2-3 months",
              description: "Understanding financial markets and trading",
              jobs: ["Trading Assistant", "Financial Research", "Investment Advisor"]
            }
          ]
        }
      ]
    },
    {
      id: "arts-stream",
      name: "Arts/Humanities Stream",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Literature, History, Psychology, Political Science - Creative and social sciences path",
      careers: [
        {
          id: "arts-stream",
          title: "Arts - English, History, Political Science, Psychology",
          duration: "2 years (Class 11-12)",
          difficulty: "Easy",
          salary: "Leads to ₹3-25+ LPA careers",
          growth: 65,
          description: "Opens doors to creative, administrative, teaching, and social service careers",
          skills: ["Critical Thinking", "Communication", "Research", "Creative Writing", "Social Understanding"],
          jobRoles: ["After graduation: Teacher", "Civil Servant", "Journalist", "Lawyer", "Social Worker"],
          companies: ["After graduation: Government", "NGOs", "Media Houses", "Educational Institutions", "Legal Firms"],
          shortTermOptions: [
            {
              title: "Content Writing & Blogging",
              duration: "3-4 months during 12th",
              description: "Develop writing skills for digital platforms",
              jobs: ["Content Writer", "Blogger", "Social Media Manager"]
            },
            {
              title: "Public Speaking & Communication",
              duration: "2-3 months",
              description: "Enhance communication and presentation skills",
              jobs: ["Public Relations", "Event Management", "Teaching"]
            }
          ]
        }
      ]
    }
  ];

  // Diploma course options (comprehensive for both Class 10 and 12 students)
  const diplomaOptions: CourseStream[] = [
    {
      id: "technical-diploma",
      name: "Technical Diplomas",
      icon: Wrench,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Hands-on technical skills for immediate employment",
      careers: [
        {
          id: "iti-mechanical",
          title: "ITI Mechanical Trade",
          duration: "1-2 years",
          difficulty: "Easy",
          salary: "₹2-8 LPA",
          growth: 60,
          description: "Learn mechanical skills like fitting, welding, machining",
          skills: ["Machine Operation", "Welding", "Fitting", "Basic Electronics", "Safety Procedures"],
          jobRoles: ["Machine Operator", "Welder", "Fitter", "Maintenance Technician", "Production Assistant"],
          companies: ["Tata Motors", "Mahindra", "Bajaj", "Local Industries", "Manufacturing Units"],
          shortTermOptions: [
            {
              title: "Basic Welding Course",
              duration: "3-6 months",
              description: "Learn arc welding, gas welding, and basic fabrication",
              jobs: ["Welder", "Fabricator", "Workshop Assistant"]
            },
            {
              title: "Mobile Repair Course",
              duration: "2-4 months",
              description: "Smartphone and basic electronics repair",
              jobs: ["Mobile Technician", "Electronics Repair", "Service Center Associate"]
            }
          ]
        },
        {
          id: "iti-electrical",
          title: "ITI Electrical Trade",
          duration: "2 years",
          difficulty: "Easy",
          salary: "₹2.5-10 LPA",
          growth: 70,
          description: "Electrical installation, maintenance, and repair work",
          skills: ["Electrical Wiring", "Motor Repair", "Panel Making", "Safety Standards", "Circuit Design"],
          jobRoles: ["Electrician", "Electrical Technician", "Maintenance Engineer", "Panel Operator", "Electrical Supervisor"],
          companies: ["BHEL", "Power Grid", "Electrical Contractors", "Industrial Units", "Government PWD"],
          shortTermOptions: [
            {
              title: "House Wiring Course",
              duration: "2-3 months",
              description: "Residential electrical installation and repair",
              jobs: ["House Electrician", "Electrical Helper", "Wiring Contractor"]
            }
          ]
        }
      ]
    },
    {
      id: "computer-diploma",
      name: "Computer Diplomas",
      icon: Laptop,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Computer skills and digital technology programs",
      careers: [
        {
          id: "diploma-computer",
          title: "Diploma in Computer Engineering",
          duration: "3 years",
          difficulty: "Medium",
          salary: "₹3-12 LPA",
          growth: 85,
          description: "Programming, software development, and computer systems",
          skills: ["Programming", "Web Development", "Database Management", "Computer Networks", "Software Testing"],
          jobRoles: ["Junior Software Developer", "Web Developer", "System Administrator", "Technical Support", "Database Assistant"],
          companies: ["TCS", "Infosys", "Local IT Companies", "Startups", "Government IT Departments"],
          shortTermOptions: [
            {
              title: "Web Development Bootcamp",
              duration: "4-6 months",
              description: "HTML, CSS, JavaScript, and basic backend development",
              jobs: ["Frontend Developer", "Web Designer", "WordPress Developer"]
            }
          ]
        },
        {
          id: "computer-applications",
          title: "Computer Applications Course",
          duration: "6 months - 1 year",
          difficulty: "Easy",
          salary: "₹1.5-5 LPA",
          growth: 80,
          description: "Basic computer skills, office applications, and internet usage",
          skills: ["MS Office", "Internet Usage", "Email", "Basic Programming", "Data Entry"],
          jobRoles: ["Data Entry Operator", "Computer Operator", "Office Assistant", "Receptionist", "Clerk"],
          companies: ["Banks", "Government Offices", "Private Companies", "BPOs", "Retail Stores"],
          shortTermOptions: [
            {
              title: "Digital Literacy Program",
              duration: "2-3 months",
              description: "Basic computer and internet skills",
              jobs: ["Computer Operator", "Data Entry", "Office Assistant"]
            }
          ]
        }
      ]
    },
    {
      id: "medical-diploma",
      name: "Medical Diplomas",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Healthcare and medical technology programs",
      careers: [
        {
          id: "medical-lab-tech",
          title: "Diploma in Medical Lab Technology",
          duration: "2-3 years",
          difficulty: "Medium",
          salary: "₹2.5-8 LPA",
          growth: 75,
          description: "Laboratory testing, pathology, and medical diagnostics",
          skills: ["Laboratory Testing", "Pathology", "Microbiology", "Blood Testing", "Equipment Operation"],
          jobRoles: ["Lab Technician", "Pathology Assistant", "Medical Technologist", "Lab Supervisor", "Research Assistant"],
          companies: ["Hospitals", "Diagnostic Centers", "Research Labs", "Government Health Centers", "Private Clinics"],
          shortTermOptions: [
            {
              title: "Phlebotomy Course",
              duration: "2-3 months",
              description: "Blood collection and basic lab techniques",
              jobs: ["Phlebotomist", "Lab Assistant", "Sample Collector"]
            }
          ]
        }
      ]
    },
    {
      id: "business-diploma",
      name: "Business & Commerce",
      icon: ShoppingBag,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Business management and commercial skills",
      careers: [
        {
          id: "business-management",
          title: "Diploma in Business Management",
          duration: "1-2 years",
          difficulty: "Medium",
          salary: "₹2-8 LPA",
          growth: 70,
          description: "Business operations, management principles, and entrepreneurship",
          skills: ["Business Operations", "Team Management", "Marketing", "Financial Management", "Communication"],
          jobRoles: ["Assistant Manager", "Sales Executive", "Business Development", "Administrative Officer", "Entrepreneur"],
          companies: ["Retail Companies", "Service Industries", "Startups", "SMEs", "Government Organizations"],
          shortTermOptions: [
            {
              title: "Digital Marketing Course",
              duration: "3-4 months",
              description: "Social media marketing, SEO, and online advertising",
              jobs: ["Digital Marketing Executive", "Social Media Manager", "Content Creator"]
            }
          ]
        }
      ]
    },
    {
      id: "creative-diploma",
      name: "Creative & Media",
      icon: Camera,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Creative arts, media, and design programs",
      careers: [
        {
          id: "graphic-design",
          title: "Diploma in Graphic Design",
          duration: "1-2 years",
          difficulty: "Medium",
          salary: "₹2-10 LPA",
          growth: 80,
          description: "Visual design, branding, and digital media creation",
          skills: ["Adobe Creative Suite", "Typography", "Branding", "Web Design", "Print Design"],
          jobRoles: ["Graphic Designer", "Web Designer", "Brand Designer", "UI Designer", "Freelance Designer"],
          companies: ["Advertising Agencies", "Design Studios", "Media Companies", "Startups", "Freelance"],
          shortTermOptions: [
            {
              title: "Video Editing Course",
              duration: "2-3 months",
              description: "Video production and editing software training",
              jobs: ["Video Editor", "Content Creator", "YouTube Editor"]
            }
          ]
        }
      ]
    },
    {
      id: "skill-development",
      name: "Skill Development Courses",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Government skill development programs and vocational training after Class 10",
      careers: [
        {
          id: "retail-training",
          title: "Retail Sales & Customer Service",
          duration: "3-6 months",
          difficulty: "Easy",
          salary: "₹1.5-4 LPA",
          growth: 50,
          description: "Customer service, sales techniques, and retail operations",
          skills: ["Customer Service", "Sales Techniques", "Product Knowledge", "Cash Handling", "Communication"],
          jobRoles: ["Sales Executive", "Store Assistant", "Customer Service Representative", "Cashier", "Shop Manager"],
          companies: ["Reliance", "Big Bazaar", "Local Retailers", "Supermarkets", "Fashion Stores"],
          shortTermOptions: [
            {
              title: "Customer Service Training",
              duration: "1-2 months",
              description: "Communication and customer handling skills",
              jobs: ["Customer Service Rep", "Sales Assistant", "Help Desk"]
            }
          ]
        },
        {
          id: "beauty-wellness",
          title: "Beauty & Wellness",
          duration: "6-12 months",
          difficulty: "Easy",
          salary: "₹2-8 LPA",
          growth: 70,
          description: "Hair styling, makeup, skincare, and wellness services",
          skills: ["Hair Styling", "Makeup Application", "Skincare", "Customer Relations", "Business Management"],
          jobRoles: ["Hair Stylist", "Makeup Artist", "Beauty Consultant", "Salon Owner", "Wellness Therapist"],
          companies: ["Lakme", "VLCC", "Naturals", "Local Salons", "Freelance"],
          shortTermOptions: [
            {
              title: "Basic Hair Styling",
              duration: "2-3 months",
              description: "Learn basic hair cutting and styling techniques",
              jobs: ["Assistant Hair Stylist", "Salon Assistant", "Hair Stylist"]
            }
          ]
        }
      ]
    }
  ];

  // Degree level courses (existing)
  const courseStreams: CourseStream[] = [
    {
      id: "engineering",
      name: "Engineering & Technology",
      icon: Code,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Build the future with technology and innovation",
      careers: [
        {
          id: "computer-science",
          title: "Computer Science Engineering",
          duration: "4 years",
          difficulty: "Medium",
          salary: "₹6-30 LPA",
          growth: 85,
          description: "Design and develop software systems, applications, and technological solutions",
          skills: ["Programming", "Data Structures", "Algorithms", "Database Design", "System Architecture"],
          jobRoles: ["Software Engineer", "Data Scientist", "Full Stack Developer", "AI/ML Engineer", "DevOps Engineer"],
          companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro"],
          shortTermOptions: [
            {
              title: "Full Stack Web Development",
              duration: "6-8 months",
              description: "Learn frontend and backend development quickly",
              jobs: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
            },
            {
              title: "Data Analytics Bootcamp",
              duration: "4-6 months",
              description: "Master data analysis and visualization tools",
              jobs: ["Data Analyst", "Business Intelligence Analyst", "Data Visualization Specialist"]
            }
          ]
        },
        {
          id: "mechanical",
          title: "Mechanical Engineering",
          duration: "4 years",
          difficulty: "Medium",
          salary: "₹4-20 LPA",
          growth: 65,
          description: "Design, develop, and manufacture mechanical systems and products",
          skills: ["CAD Design", "Thermodynamics", "Materials Science", "Manufacturing", "Project Management"],
          jobRoles: ["Design Engineer", "Manufacturing Engineer", "Quality Engineer", "Project Manager", "R&D Engineer"],
          companies: ["Tata Motors", "Mahindra", "Bajaj", "L&T", "Bosch", "Maruti Suzuki"],
          shortTermOptions: [
            {
              title: "CAD Design Certification",
              duration: "3-4 months",
              description: "Master AutoCAD, SolidWorks, and design principles",
              jobs: ["CAD Designer", "Design Drafter", "3D Modeler"]
            },
            {
              title: "Manufacturing Technology",
              duration: "6 months",
              description: "Learn modern manufacturing processes and quality control",
              jobs: ["Production Supervisor", "Quality Controller", "Manufacturing Technician"]
            }
          ]
        }
      ]
    },
    {
      id: "medical",
      name: "Medical & Healthcare",
      icon: Stethoscope,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Heal, care, and save lives through medical science",
      careers: [
        {
          id: "mbbs",
          title: "Bachelor of Medicine & Surgery (MBBS)",
          duration: "5.5 years + 1 year internship",
          difficulty: "Hard",
          salary: "₹8-50+ LPA",
          growth: 90,
          description: "Become a qualified doctor to diagnose, treat, and prevent diseases",
          skills: ["Medical Knowledge", "Patient Care", "Diagnosis", "Surgery", "Communication"],
          jobRoles: ["General Physician", "Specialist Doctor", "Surgeon", "Medical Officer", "Consultant"],
          companies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Government Hospitals"],
          shortTermOptions: [
            {
              title: "Medical Assistant Certification",
              duration: "6-12 months",
              description: "Support doctors and healthcare professionals",
              jobs: ["Medical Assistant", "Healthcare Coordinator", "Clinical Support"]
            },
            {
              title: "Healthcare Technology",
              duration: "8-10 months",
              description: "Learn healthcare IT and medical device operation",
              jobs: ["Medical Equipment Technician", "Healthcare IT Specialist", "Telemedicine Coordinator"]
            }
          ]
        },
        {
          id: "pharmacy",
          title: "Bachelor of Pharmacy (B.Pharm)",
          duration: "4 years",
          difficulty: "Medium",
          salary: "₹3-15 LPA",
          growth: 70,
          description: "Study drugs, medicines, and pharmaceutical sciences",
          skills: ["Pharmaceutical Science", "Drug Development", "Quality Control", "Patient Counseling", "Regulatory Affairs"],
          jobRoles: ["Pharmacist", "Drug Inspector", "Medical Representative", "Research Associate", "Quality Analyst"],
          companies: ["Sun Pharma", "Dr. Reddy's", "Cipla", "Lupin", "Apollo Pharmacy"],
          shortTermOptions: [
            {
              title: "Pharmacy Technician Course",
              duration: "6 months",
              description: "Quick entry into pharmacy support roles",
              jobs: ["Pharmacy Technician", "Medical Store Assistant", "Drug Store Manager"]
            }
          ]
        }
      ]
    },
    {
      id: "commerce",
      name: "Commerce & Business",
      icon: Calculator,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Master business, finance, and entrepreneurship",
      careers: [
        {
          id: "chartered-accountancy",
          title: "Chartered Accountancy (CA)",
          duration: "3-5 years",
          difficulty: "Hard",
          salary: "₹8-50+ LPA",
          growth: 80,
          description: "Become a financial expert in accounting, taxation, and audit",
          skills: ["Accounting", "Taxation", "Audit", "Financial Analysis", "Business Strategy"],
          jobRoles: ["Chartered Accountant", "Tax Consultant", "Financial Advisor", "Audit Manager", "CFO"],
          companies: ["Big 4 Firms", "Banks", "MNCs", "Government", "Private Practice"],
          shortTermOptions: [
            {
              title: "Accounting Software Certification",
              duration: "2-3 months",
              description: "Master Tally, SAP, and accounting software",
              jobs: ["Accounting Assistant", "Bookkeeper", "Accounts Executive"]
            },
            {
              title: "Digital Marketing for Business",
              duration: "4-6 months",
              description: "Learn modern marketing strategies and tools",
              jobs: ["Digital Marketing Executive", "Social Media Manager", "Content Marketing Specialist"]
            }
          ]
        },
        {
          id: "mba",
          title: "Master of Business Administration (MBA)",
          duration: "2 years (after graduation)",
          difficulty: "Medium",
          salary: "₹10-40+ LPA",
          growth: 75,
          description: "Develop leadership and management skills for business success",
          skills: ["Leadership", "Strategic Planning", "Team Management", "Business Analysis", "Communication"],
          jobRoles: ["Business Manager", "Consultant", "Product Manager", "Operations Manager", "Entrepreneur"],
          companies: ["McKinsey", "BCG", "Deloitte", "TCS", "Reliance", "Startups"],
          shortTermOptions: [
            {
              title: "Business Analytics Certificate",
              duration: "6-8 months",
              description: "Learn to analyze business data and make decisions",
              jobs: ["Business Analyst", "Data Analyst", "Operations Analyst"]
            },
            {
              title: "Project Management Certification",
              duration: "3-4 months",
              description: "Get PMP certified and manage projects effectively",
              jobs: ["Project Coordinator", "Project Manager", "Program Manager"]
            }
          ]
        }
      ]
    },
    {
      id: "arts",
      name: "Arts & Humanities",
      icon: Palette,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Express creativity and understand human society",
      careers: [
        {
          id: "psychology",
          title: "Bachelor of Psychology",
          duration: "3 years",
          difficulty: "Medium",
          salary: "₹4-18 LPA",
          growth: 60,
          description: "Study human behavior and mental processes",
          skills: ["Counseling", "Research", "Analysis", "Communication", "Empathy"],
          jobRoles: ["Psychologist", "Counselor", "HR Specialist", "Researcher", "Therapist"],
          companies: ["Hospitals", "Schools", "NGOs", "Corporate HR", "Private Practice"],
          shortTermOptions: [
            {
              title: "Counseling Skills Certification",
              duration: "6 months",
              description: "Learn basic counseling techniques and communication",
              jobs: ["Counseling Assistant", "HR Coordinator", "Student Counselor"]
            },
            {
              title: "Content Writing & Communication",
              duration: "3-4 months",
              description: "Develop writing and communication skills",
              jobs: ["Content Writer", "Copywriter", "Communication Executive"]
            }
          ]
        },
        {
          id: "journalism",
          title: "Bachelor of Journalism & Mass Communication",
          duration: "3 years",
          difficulty: "Medium",
          salary: "₹3-15 LPA",
          growth: 55,
          description: "Report news, create content, and communicate with masses",
          skills: ["Writing", "Research", "Communication", "Media Production", "Digital Marketing"],
          jobRoles: ["Journalist", "Content Creator", "Media Producer", "PR Specialist", "Editor"],
          companies: ["News Channels", "Newspapers", "Digital Media", "PR Agencies", "Content Companies"],
          shortTermOptions: [
            {
              title: "Digital Content Creation",
              duration: "4-5 months",
              description: "Master social media and digital content creation",
              jobs: ["Social Media Manager", "Content Creator", "Digital Marketing Executive"]
            }
          ]
        }
      ]
    }
  ];

  // Get current data based on selected education level
  const getCurrentStreams = () => {
    switch (selectedEducationLevel) {
      case "class11-12":
        return class1112Options;
      case "diploma":
        return diplomaOptions;
      case "degree":
        return courseStreams;
      default:
        return class1112Options; // Default to class 11-12 streams as most common choice after class 10
    }
  };

  const selectedStreamData = getCurrentStreams().find(stream => stream.id === selectedStream);
  const selectedCareerData = selectedStreamData?.careers.find(career => career.id === selectedCareer);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-6">
            <Target className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Interactive Career Mapping</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Course-to-Career Mapping
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore your educational journey from Class 10 onwards - choose subject streams, diploma courses, or degree programs with detailed career mapping
          </p>
        </div>

        {/* Education Level Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Choose Your Educational Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {educationLevels.map((level) => {
              const IconComponent = level.icon;
              return (
                <Card
                  key={level.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    selectedEducationLevel === level.id 
                      ? "border-blue-500 shadow-lg scale-105" 
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                  }`}
                  onClick={() => {
                    setSelectedEducationLevel(level.id);
                    setSelectedStream("");
                    setSelectedCareer("");
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{level.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{level.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stream Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {getCurrentStreams().map((stream) => {
            const IconComponent = stream.icon;
            return (
              <Card
                key={stream.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                  selectedStream === stream.id 
                    ? "border-blue-500 shadow-lg scale-105" 
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                }`}
                onClick={() => {
                  setSelectedStream(stream.id);
                  setSelectedCareer("");
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${stream.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${stream.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{stream.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stream.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Career Paths */}
        {selectedStreamData && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedEducationLevel === "class11-12" ? "Class 11-12 Subject Streams" : 
                 selectedEducationLevel === "diploma" ? "Diploma Courses" : "Degree Programs"} - {selectedStreamData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedEducationLevel === "class11-12" 
                  ? "Choose your subject combination for Class 11-12 to see future career paths" 
                  : "Choose a specific course to see detailed career mapping and job prospects"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {selectedStreamData.careers.map((career) => (
                <Card
                  key={career.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    selectedCareer === career.id 
                      ? "border-green-500 shadow-lg" 
                      : "border-gray-200 dark:border-gray-700 hover:border-green-300"
                  }`}
                  onClick={() => setSelectedCareer(career.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{career.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(career.difficulty)}>
                              {career.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {career.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{career.salary}</div>
                        <div className="text-xs text-gray-500">Growth Rate: {career.growth}%</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{career.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {career.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{career.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Career Mapping */}
            {selectedCareerData && (
              <Card className="border-2 border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
                  <CardTitle className="text-2xl text-center">
                    {selectedCareerData.title} - Complete Career Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <Tabs defaultValue="pathway" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="pathway">Career Pathway</TabsTrigger>
                      <TabsTrigger value="jobs">Job Prospects</TabsTrigger>
                      <TabsTrigger value="short-term">Short-term Options</TabsTrigger>
                      <TabsTrigger value="comparison">Compare</TabsTrigger>
                    </TabsList>

                    <TabsContent value="pathway" className="mt-8">
                      <div className="space-y-8">
                        {/* Visual Career Timeline */}
                        <div className="relative">
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>
                          
                          <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                                1
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Foundation Phase</h4>
                                <p className="text-gray-600 dark:text-gray-300">Duration: {selectedCareerData.duration}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Build core knowledge and skills through structured learning
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                                2
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Entry Level (0-2 years)</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                  Salary Range: {selectedCareerData.salary.split('-')[0]} - {selectedCareerData.salary.split('-')[1]?.split(' ')[0]} LPA
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {selectedCareerData.jobRoles.slice(0, 2).map((role, index) => (
                                    <Badge key={index} className="bg-purple-100 text-purple-800">
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                                3
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Mid Level (3-7 years)</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                  Leadership roles and specialization
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge className="bg-orange-100 text-orange-800">Senior Roles</Badge>
                                  <Badge className="bg-orange-100 text-orange-800">Team Leadership</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                                4
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">Senior Level (8+ years)</h4>
                                <p className="text-gray-600 dark:text-gray-300">
                                  Executive positions and entrepreneurship opportunities
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">C-Level Positions</Badge>
                                  <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300">Entrepreneurship</Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Skills Development */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                            Key Skills to Develop
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedCareerData.skills.map((skill, index) => (
                              <Badge key={index} className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="jobs" className="mt-8">
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center">
                                <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                                Job Roles
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {selectedCareerData.jobRoles.map((role, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="font-medium">{role}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center">
                                <Building className="h-5 w-5 mr-2 text-green-600" />
                                Top Companies
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {selectedCareerData.companies.map((company, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="font-medium">{company}</span>
                                    <Badge variant="outline">Hiring</Badge>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                              <div>
                                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCareerData.salary}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Salary Range</div>
                              </div>
                              <div>
                                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCareerData.growth}%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Growth Rate</div>
                              </div>
                              <div>
                                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">High</div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">Job Demand</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="short-term" className="mt-8">
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Should I Opt for Short-term Courses Instead?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Quick alternatives to get started in your field faster
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {selectedCareerData.shortTermOptions.map((option, index) => (
                            <Card key={index} className="border-2 border-orange-200 dark:border-orange-800">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">{option.title}</CardTitle>
                                  <Badge className="bg-orange-100 text-orange-800">
                                    <Zap className="h-3 w-3 mr-1" />
                                    {option.duration}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
                                <div className="space-y-2">
                                  <h5 className="font-medium text-gray-900 dark:text-white">Job Opportunities:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {option.jobs.map((job, jobIndex) => (
                                      <Badge key={jobIndex} variant="secondary" className="text-xs">
                                        {job}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900 dark:to-yellow-900">
                          <CardContent className="p-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                              <Award className="h-5 w-5 mr-2 text-orange-500" />
                              Long-term vs Short-term Comparison
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h5 className="font-medium text-green-800 dark:text-green-300 mb-2">Long-term Course Benefits:</h5>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                  <li>• Comprehensive theoretical knowledge</li>
                                  <li>• Higher salary potential</li>
                                  <li>• Leadership opportunities</li>
                                  <li>• Industry recognition</li>
                                </ul>
                              </div>
                              <div>
                                <h5 className="font-medium text-orange-800 dark:text-orange-300 mb-2">Short-term Course Benefits:</h5>
                                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                  <li>• Quick job entry (6-18 months)</li>
                                  <li>• Lower investment cost</li>
                                  <li>• Industry-relevant practical skills</li>
                                  <li>• Can be combined with degree</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="comparison" className="mt-8">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Career Path Comparison</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left p-3">Aspect</th>
                                    <th className="text-left p-3">Long-term Course</th>
                                    <th className="text-left p-3">Short-term Alternative</th>
                                  </tr>
                                </thead>
                                <tbody className="space-y-2">
                                  <tr className="border-b">
                                    <td className="p-3 font-medium">Duration</td>
                                    <td className="p-3">{selectedCareerData.duration}</td>
                                    <td className="p-3">6-12 months</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-3 font-medium">Starting Salary</td>
                                    <td className="p-3">{selectedCareerData.salary.split('-')[0]} LPA</td>
                                    <td className="p-3">₹2-6 LPA</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-3 font-medium">Career Growth</td>
                                    <td className="p-3">High potential for leadership</td>
                                    <td className="p-3">Skill-based growth</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-3 font-medium">Investment</td>
                                    <td className="p-3">₹5-15 Lakhs</td>
                                    <td className="p-3">₹20K-2 Lakhs</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="text-center">
                          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                            Get Personalized Career Guidance
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}