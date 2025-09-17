import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeft, ChevronRight, CheckCircle, Brain, Target, Lightbulb, GraduationCap, BookOpen, Calculator, ExternalLink, User, TrendingUp, Heart, Briefcase, FileText, Award } from "lucide-react";
import { BackButton } from "./BackButton";

interface Question {
  id: string;
  category: string;
  question: string;
  type: 'radio' | 'select' | 'marks' | 'text';
  options?: string[];
  subjects?: string[];
  icon: React.ComponentType<any>;
  condition?: (profile: any) => boolean;
}

interface AssessmentResults {
  science: number;
  commerce: number;
  arts: number;
  engineering: number;
  medical: number;
  creative: number;
  business: number;
  social: number;
}

interface AssessmentQuizProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function AssessmentQuiz({ onNavigate }: AssessmentQuizProps = {}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserProfile(profile);
    }
    setIsLoading(false);
  }, []);

  // Dynamic question generation based on user profile
  const generateQuestions = (profile: any): Question[] => {
    const baseQuestions: Question[] = [
      // Class 10 marks question - shown for Class 10 students looking at streams
      {
        id: "class10_marks",
        category: "Academic Performance",
        question: "Please enter your Class 10th marks (%) for each subject:",
        type: "marks",
        subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi/Regional Language"],
        icon: Calculator,
        condition: (p) => !p || p?.educationLevel === "class-10-completed" || p?.educationLevel === "class-11"
      },
      
      // Class 11 marks question - shown for Class 11/12 students
      {
        id: "class11_marks",
        category: "Academic Performance", 
        question: "Please enter your Class 11th marks (%) for each subject:",
        type: "marks",
        subjects: profile?.stream?.includes("Science (PCM)") 
          ? ["Physics", "Chemistry", "Mathematics", "English", "Physical Education"]
          : profile?.stream?.includes("Science (PCB)")
          ? ["Physics", "Chemistry", "Biology", "English", "Physical Education"]
          : profile?.stream?.includes("Science (PCMB)")
          ? ["Physics", "Chemistry", "Mathematics", "Biology", "English"]
          : profile?.stream?.includes("Commerce")
          ? ["Accountancy", "Business Studies", "Economics", "English", "Mathematics/Computer"]
          : ["English", "History", "Political Science", "Geography", "Economics"],
        icon: Calculator,
        condition: (p) => p?.educationLevel === "class-12" || p?.educationLevel === "class-12-completed"
      },

      // Stream selection question for Class 10 students
      {
        id: "stream_preference",
        category: "Stream Selection",
        question: "Which stream are you considering for Class 11-12?",
        type: "radio",
        options: [
          "Science (PCM) - Physics, Chemistry, Mathematics",
          "Science (PCB) - Physics, Chemistry, Biology", 
          "Science (PCMB) - Physics, Chemistry, Mathematics, Biology",
          "Commerce - Business Studies, Accountancy, Economics",
          "Arts/Humanities - History, Political Science, Literature"
        ],
        icon: GraduationCap,
        condition: (p) => !p || p?.educationLevel === "class-10-completed"
      },

      // Future education plans for Class 10 students
      {
        id: "future_plans",
        category: "Future Planning",
        question: "What are your plans after Class 12?",
        type: "radio",
        options: [
          "Pursue Engineering (B.Tech/B.E)",
          "Study Medicine (MBBS/BDS)",
          "Business/Commerce courses (BBA/B.Com/CA)",
          "Arts/Humanities courses (BA/LLB/Design)",
          "Diploma/Vocational courses",
          "I'm not sure yet"
        ],
        icon: Target,
        condition: (p) => !p || p?.educationLevel === "class-10-completed" || p?.educationLevel === "class-11"
      },

      // Current academic performance
      {
        id: "current_performance",
        category: "Academic Performance",
        question: "How would you rate your current academic performance?",
        type: "radio",
        options: [
          "Excellent (Above 85%) - Consistently top performer",
          "Very Good (75-85%) - Strong academic record",
          "Good (60-75%) - Satisfactory performance", 
          "Average (50-60%) - Need improvement in some areas",
          "Below Average (Below 50%) - Struggling with academics"
        ],
        icon: TrendingUp
      },

      // Subject preferences
      {
        id: "subject_interest",
        category: "Subject Preferences",
        question: "Which subjects do you find most interesting?",
        type: "radio",
        options: [
          "Mathematics and Physics - problem solving",
          "Biology and Chemistry - life sciences",
          "Business Studies and Economics - commerce",
          "History and Political Science - social studies",
          "Languages and Literature - communication"
        ],
        icon: BookOpen
      },

      // Science stream specific questions
      {
        id: "science_interest",
        category: "Science Interest",
        question: "Which aspect of science interests you the most?",
        type: "radio", 
        options: [
          "Problem-solving with mathematical formulas and equations",
          "Understanding living organisms and biological processes",
          "Chemical reactions and laboratory experiments",
          "Physics concepts and natural phenomena",
          "Technology and computer applications"
        ],
        icon: Brain,
        condition: (p) => p?.stream?.includes("Science") || p?.interests?.some((i: string) => i.includes("Science") || i.includes("Technology") || i.includes("Medical")) || answers["stream_preference"]?.includes("Science")
      },

      // Commerce stream specific questions
      {
        id: "commerce_interest", 
        category: "Commerce Interest",
        question: "What aspect of business and commerce excites you most?",
        type: "radio",
        options: [
          "Managing finances and accounting",
          "Marketing and advertising strategies", 
          "Starting and running my own business",
          "Understanding economic trends and markets",
          "Working with people and building relationships"
        ],
        icon: Briefcase,
        condition: (p) => p?.stream?.includes("Commerce") || p?.interests?.some((i: string) => i.includes("Business") || i.includes("Finance") || i.includes("Entrepreneur")) || answers["stream_preference"]?.includes("Commerce")
      },

      // Arts stream specific questions
      {
        id: "arts_interest",
        category: "Arts & Humanities Interest", 
        question: "Which area of arts and humanities appeals to you most?",
        type: "radio",
        options: [
          "Writing, literature, and communication",
          "History, culture, and social studies",
          "Psychology and understanding human behavior", 
          "Politics, governance, and public policy",
          "Creative arts like design, music, or theater"
        ],
        icon: BookOpen,
        condition: (p) => p?.stream?.includes("Arts") || p?.interests?.some((i: string) => i.includes("Arts") || i.includes("Literature") || i.includes("Psychology") || i.includes("Social")) || answers["stream_preference"]?.includes("Arts")
      },

      // Career motivation
      {
        id: "career_motivation",
        category: "Career Values",
        question: "What motivates you most in choosing a career?",
        type: "radio",
        options: [
          "Making a positive impact on society and helping others",
          "Achieving financial stability and high earning potential", 
          "Having creative freedom and expressing my ideas",
          "Solving complex problems and technical challenges",
          "Leading teams and building successful organizations"
        ],
        icon: Heart
      },

      // Work environment preference
      {
        id: "work_environment",
        category: "Work Preferences",
        question: "In which work environment would you thrive best?",
        type: "radio",
        options: [
          "Research laboratory or technical facility",
          "Hospital or healthcare setting",
          "Corporate office or business environment", 
          "Creative studio or media house",
          "Government office or public service",
          "Educational institution as teacher/professor"
        ],
        icon: Target
      },

      // Natural skills assessment
      {
        id: "natural_skills",
        category: "Skills & Abilities",
        question: "Which skills come most naturally to you?",
        type: "radio", 
        options: [
          "Logical thinking and mathematical calculations",
          "Communication and interpersonal skills",
          "Creative thinking and artistic abilities",
          "Leadership and team management",
          "Attention to detail and analytical thinking"
        ],
        icon: Brain
      },

      // Learning style preference
      {
        id: "learning_preference",
        category: "Learning Style",
        question: "How do you prefer to learn new things?",
        type: "radio",
        options: [
          "Hands-on experimentation and practical work",
          "Reading books and theoretical study", 
          "Group discussions and collaborative learning",
          "Visual aids like diagrams and videos",
          "Real-world applications and case studies"
        ],
        icon: Lightbulb
      },

      // Challenge preference
      {
        id: "challenge_preference",
        category: "Problem Solving",
        question: "What type of challenges do you enjoy solving?",
        type: "radio",
        options: [
          "Complex mathematical or scientific problems",
          "People-related issues and conflicts",
          "Creative and design challenges",
          "Business strategy and financial problems",
          "Social issues and community problems"
        ],
        icon: Target
      },

      // Future aspirations
      {
        id: "career_timeline",
        category: "Future Goals",
        question: "Where do you see yourself in 10 years?",
        type: "radio",
        options: [
          "Leading a team of engineers or scientists",
          "Running my own successful business",
          "Making significant contributions to healthcare/medical field",
          "Creating impactful art, media, or content",
          "Serving in government or public policy",
          "Teaching and mentoring the next generation"
        ],
        icon: GraduationCap
      },

      // Academic challenges
      {
        id: "academic_challenges",
        category: "Academic Support",
        question: profile?.challenges ? `You mentioned facing challenges with "${profile.challenges}". How can we help you overcome this?` : "What academic challenges are you currently facing?",
        type: "radio",
        options: [
          "Subject selection and stream choice confusion",
          "College selection and admission process",
          "Career path clarity and guidance",
          "Academic performance improvement",
          "Entrance exam preparation strategy"
        ],
        icon: User
      }
    ];

    // Filter questions based on user profile and answers
    return baseQuestions.filter(q => !q.condition || q.condition(profile));
  };

  // Update filtered questions when profile loads or answers change
  useEffect(() => {
    const questions = generateQuestions(userProfile);
    setFilteredQuestions(questions);
  }, [userProfile, answers]);

  const handleAnswerChange = (value: string) => {
    const currentQ = filteredQuestions[currentQuestion];
    if (currentQ?.type === "marks") {
      // For marks questions, store all subject marks
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: value
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQ.id]: value
      }));
    }
  };

  const handleSubjectMarkChange = (subject: string, mark: string) => {
    const currentQ = filteredQuestions[currentQuestion];
    const currentMarks = answers[currentQ.id] ? JSON.parse(answers[currentQ.id]) : {};
    const newMarks = { ...currentMarks, [subject]: mark };
    
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: JSON.stringify(newMarks)
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = () => {
    const currentQ = filteredQuestions[currentQuestion];
    if (!currentQ) return false;
    
    if (currentQ.type === "marks") {
      const marks = answers[currentQ.id];
      if (!marks) return false;
      
      try {
        const parsedMarks = JSON.parse(marks);
        return currentQ.subjects?.every(subject => 
          parsedMarks[subject] && 
          !isNaN(Number(parsedMarks[subject])) &&
          Number(parsedMarks[subject]) >= 0 && 
          Number(parsedMarks[subject]) <= 100
        );
      } catch {
        return false;
      }
    }
    
    return !!answers[currentQ.id];
  };

  const calculateResults = (): AssessmentResults => {
    const scores = {
      science: 0,
      commerce: 0, 
      arts: 0,
      engineering: 0,
      medical: 0,
      creative: 0,
      business: 0,
      social: 0
    };

    // Score based on user profile
    if (userProfile) {
      const { stream, interests, marksPercentage } = userProfile;

      // Stream-based scoring
      if (stream?.includes("Science (PCM)")) {
        scores.engineering += 5;
        scores.science += 4;
      } else if (stream?.includes("Science (PCB)")) {
        scores.medical += 5;
        scores.science += 4;
      } else if (stream?.includes("Science (PCMB)")) {
        scores.medical += 4;
        scores.engineering += 4;
        scores.science += 3;
      } else if (stream?.includes("Commerce")) {
        scores.commerce += 5;
        scores.business += 4;
      } else if (stream?.includes("Arts")) {
        scores.arts += 5;
        scores.social += 3;
        scores.creative += 3;
      }

      // Interest-based scoring
      if (interests && Array.isArray(interests)) {
        interests.forEach((interest: string) => {
          if (interest.includes("Computer") || interest.includes("Technology") || interest.includes("Engineering")) {
            scores.engineering += 2;
          }
          if (interest.includes("Medical") || interest.includes("Healthcare") || interest.includes("Biology")) {
            scores.medical += 2;
          }
          if (interest.includes("Business") || interest.includes("Finance") || interest.includes("Entrepreneur")) {
            scores.business += 2;
            scores.commerce += 1;
          }
          if (interest.includes("Design") || interest.includes("Arts") || interest.includes("Creative")) {
            scores.creative += 2;
          }
          if (interest.includes("Social") || interest.includes("Psychology") || interest.includes("Law")) {
            scores.social += 2;
            scores.arts += 1;
          }
        });
      }
    }

    // Score based on assessment answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      if (questionId === "stream_preference") {
        const streamAnswer = answer;
        if (streamAnswer.includes("Science (PCM)")) {
          scores.engineering += 4;
          scores.science += 3;
        } else if (streamAnswer.includes("Science (PCB)")) {
          scores.medical += 4;
          scores.science += 3;
        } else if (streamAnswer.includes("Science (PCMB)")) {
          scores.engineering += 3;
          scores.medical += 3;
          scores.science += 4;
        } else if (streamAnswer.includes("Commerce")) {
          scores.commerce += 4;
          scores.business += 3;
        } else if (streamAnswer.includes("Arts")) {
          scores.arts += 4;
          scores.social += 2;
          scores.creative += 2;
        }
        return;
      }

      if (questionId === "future_plans") {
        const planAnswer = answer;
        if (planAnswer.includes("Engineering")) {
          scores.engineering += 4;
        } else if (planAnswer.includes("Medicine")) {
          scores.medical += 4;
        } else if (planAnswer.includes("Business/Commerce")) {
          scores.business += 3;
          scores.commerce += 3;
        } else if (planAnswer.includes("Arts/Humanities")) {
          scores.arts += 3;
          scores.creative += 2;
        }
        return;
      }

      // Handle marks-based scoring
      if (questionId.includes("marks")) {
        try {
          const marks = JSON.parse(answer);
          Object.entries(marks).forEach(([subject, mark]: [string, any]) => {
            const markValue = parseInt(mark) || 0;
            const markWeight = markValue > 85 ? 3 : markValue > 75 ? 2 : markValue > 60 ? 1 : 0;
            
            if (subject.toLowerCase().includes('mathematics') || subject.toLowerCase().includes('physics')) {
              scores.engineering += markWeight;
              scores.science += markWeight;
            } else if (subject.toLowerCase().includes('chemistry')) {
              scores.science += markWeight;
              scores.medical += markWeight;
            } else if (subject.toLowerCase().includes('biology')) {
              scores.medical += markWeight * 1.5;
            } else if (subject.toLowerCase().includes('english')) {
              scores.arts += markWeight;
              scores.creative += markWeight;
            } else if (subject.toLowerCase().includes('business') || subject.toLowerCase().includes('economics') || subject.toLowerCase().includes('accountancy')) {
              scores.commerce += markWeight * 1.5;
              scores.business += markWeight;
            } else if (subject.toLowerCase().includes('history') || subject.toLowerCase().includes('political') || subject.toLowerCase().includes('social')) {
              scores.arts += markWeight * 1.5;
              scores.social += markWeight;
            }
          });
        } catch (e) {
          // Handle non-JSON answers
          const markValue = parseInt(answer) || 0;
          const markWeight = markValue > 85 ? 2 : markValue > 75 ? 1.5 : markValue > 60 ? 1 : 0;
          scores.science += markWeight;
          scores.commerce += markWeight;
          scores.arts += markWeight;
        }
        return;
      }

      // Handle other radio answers
      const optionIndex = parseInt(answer);
      
      if (questionId === "science_interest") {
        if (optionIndex === 0) scores.engineering += 3;
        if (optionIndex === 1) scores.medical += 3;
        if (optionIndex === 2) scores.science += 3;
        if (optionIndex === 3) scores.science += 2;
        if (optionIndex === 4) scores.engineering += 2;
      } else if (questionId === "commerce_interest") {
        if (optionIndex === 0) scores.commerce += 3;
        if (optionIndex === 1) scores.business += 3;
        if (optionIndex === 2) scores.business += 4;
        if (optionIndex === 3) scores.commerce += 2;
        if (optionIndex === 4) scores.social += 2;
      } else if (questionId === "arts_interest") {
        if (optionIndex === 0) scores.creative += 3;
        if (optionIndex === 1) scores.arts += 3;
        if (optionIndex === 2) scores.social += 3;
        if (optionIndex === 3) scores.social += 2;
        if (optionIndex === 4) scores.creative += 4;
      } else if (questionId === "career_motivation") {
        if (optionIndex === 0) scores.social += 3;
        if (optionIndex === 1) scores.business += 3;
        if (optionIndex === 2) scores.creative += 3;
        if (optionIndex === 3) scores.engineering += 3;
        if (optionIndex === 4) scores.business += 2;
      } else if (questionId === "work_environment") {
        if (optionIndex === 0) scores.science += 3;
        if (optionIndex === 1) scores.medical += 3; 
        if (optionIndex === 2) scores.business += 3;
        if (optionIndex === 3) scores.creative += 3;
        if (optionIndex === 4) scores.social += 3;
        if (optionIndex === 5) scores.arts += 2;
      } else if (questionId === "natural_skills") {
        if (optionIndex === 0) scores.engineering += 3;
        if (optionIndex === 1) scores.social += 3;
        if (optionIndex === 2) scores.creative += 3;
        if (optionIndex === 3) scores.business += 3;
        if (optionIndex === 4) scores.science += 2;
      }
    });

    return scores;
  };

  const getPersonalizedRecommendations = (results: AssessmentResults) => {
    const sorted = Object.entries(results)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    const fieldMap: Record<string, any> = {
      engineering: {
        courses: [
          { name: "B.Tech Computer Science", category: "computer-science", duration: "4 years", eligibility: "PCM with 75%+" },
          { name: "B.Tech Mechanical", category: "mechanical", duration: "4 years", eligibility: "PCM with 75%+" },
          { name: "B.Tech Electrical", category: "electrical", duration: "4 years", eligibility: "PCM with 75%+" },
          { name: "B.Tech Civil", category: "civil", duration: "4 years", eligibility: "PCM with 75%+" }
        ],
        careers: [
          { name: "Software Engineer", category: "computer-science", salary: "₹8-15 LPA", growth: "High" },
          { name: "Mechanical Engineer", category: "mechanical", salary: "₹6-12 LPA", growth: "Moderate" },
          { name: "Systems Analyst", category: "computer-science", salary: "₹7-14 LPA", growth: "High" },
          { name: "Design Engineer", category: "mechanical", salary: "₹5-10 LPA", growth: "Moderate" }
        ],
        description: "Strong problem-solving skills with mathematical aptitude and technical interests",
        entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
        topColleges: ["IIT Delhi", "IIT Bombay", "NIT Srinagar", "IIIT Jammu"]
      },
      medical: {
        courses: [
          { name: "MBBS", category: "mbbs", duration: "5.5 years", eligibility: "PCB with 60%+" },
          { name: "B.Pharmacy", category: "pharmacy", duration: "4 years", eligibility: "PCB with 50%+" },
          { name: "B.Sc Nursing", category: "nursing", duration: "4 years", eligibility: "PCB with 45%+" },
          { name: "BPT (Physiotherapy)", category: "physiotherapy", duration: "4.5 years", eligibility: "PCB with 50%+" }
        ],
        careers: [
          { name: "Doctor", category: "mbbs", salary: "₹10-25 LPA", growth: "High" },
          { name: "Pharmacist", category: "pharmacy", salary: "₹4-8 LPA", growth: "Moderate" },
          { name: "Nurse", category: "nursing", salary: "₹3-7 LPA", growth: "High" },
          { name: "Physiotherapist", category: "physiotherapy", salary: "₹4-9 LPA", growth: "High" }
        ],
        description: "Strong biology foundation with desire to help people and interest in healthcare",
        entranceExams: ["NEET UG", "JIPMER", "AIIMS"],
        topColleges: ["GMC Jammu", "GMC Srinagar", "SKIMS", "AIIMS Delhi"]
      },
      business: {
        courses: [
          { name: "BBA", category: "business-management", duration: "3 years", eligibility: "Any stream with 50%+" },
          { name: "B.Com", category: "commerce", duration: "3 years", eligibility: "Commerce with 50%+" },
          { name: "CA Foundation", category: "chartered-accountancy", duration: "3.5 years", eligibility: "Commerce with 55%+" },
          { name: "Economics Honors", category: "economics", duration: "3 years", eligibility: "Any stream with 60%+" }
        ],
        careers: [
          { name: "Business Manager", category: "business-management", salary: "₹8-16 LPA", growth: "High" },
          { name: "Chartered Accountant", category: "chartered-accountancy", salary: "₹12-25 LPA", growth: "High" },
          { name: "Financial Advisor", category: "finance", salary: "₹6-14 LPA", growth: "High" },
          { name: "Entrepreneur", category: "startup", salary: "₹5-50 LPA", growth: "Variable" }
        ],
        description: "Interest in business, entrepreneurship, and financial management",
        entranceExams: ["CAT", "XAT", "CMAT", "IPU CET"],
        topColleges: ["IIM Jammu", "University of Jammu", "BGSBU Rajouri", "SMVD University"]
      },
      creative: {
        courses: [
          { name: "B.Des (Design)", category: "design", duration: "4 years", eligibility: "Any stream with 50%+" },
          { name: "B.A Fine Arts", category: "fine-arts", duration: "3 years", eligibility: "Any stream with 45%+" },
          { name: "Mass Communication", category: "journalism", duration: "3 years", eligibility: "Any stream with 50%+" },
          { name: "Fashion Design", category: "fashion", duration: "3-4 years", eligibility: "Any stream with 45%+" }
        ],
        careers: [
          { name: "Graphic Designer", category: "design", salary: "₹4-10 LPA", growth: "High" },
          { name: "UI/UX Designer", category: "design", salary: "₹6-15 LPA", growth: "Very High" },
          { name: "Content Creator", category: "journalism", salary: "₹3-12 LPA", growth: "High" },
          { name: "Art Director", category: "fine-arts", salary: "₹8-18 LPA", growth: "Moderate" }
        ],
        description: "Creative thinking, artistic abilities, and interest in visual or performing arts",
        entranceExams: ["NID DAT", "UCEED", "CEED", "JMI Mass Comm"],
        topColleges: ["NID Jammu", "University of Kashmir", "Central University of Kashmir"]
      },
      social: {
        courses: [
          { name: "B.A Psychology", category: "psychology", duration: "3 years", eligibility: "Any stream with 50%+" },
          { name: "LLB", category: "law", duration: "3 years", eligibility: "Graduate with 50%+" },
          { name: "BA LLB", category: "law", duration: "5 years", eligibility: "12th with 50%+" },
          { name: "Social Work", category: "social-work", duration: "3 years", eligibility: "Any stream with 45%+" }
        ],
        careers: [
          { name: "Psychologist", category: "psychology", salary: "₹5-12 LPA", growth: "High" },
          { name: "Lawyer", category: "law", salary: "₹8-20 LPA", growth: "High" },
          { name: "Civil Services Officer", category: "upsc", salary: "₹12-30 LPA", growth: "Moderate" },
          { name: "Social Worker", category: "social-work", salary: "₹3-8 LPA", growth: "Moderate" }
        ],
        description: "Interest in human behavior, society, law, and public service",
        entranceExams: ["CLAT", "AILET", "LSAT", "UPSC"],
        topColleges: ["University of Kashmir", "University of Jammu", "Central University of Kashmir"]
      },
      science: {
        courses: [
          { name: "B.Sc Physics", category: "physics", duration: "3 years", eligibility: "PCM with 50%+" },
          { name: "B.Sc Chemistry", category: "chemistry", duration: "3 years", eligibility: "PCB/PCM with 50%+" },
          { name: "B.Sc Mathematics", category: "mathematics", duration: "3 years", eligibility: "PCM with 50%+" },
          { name: "B.Sc Environmental Science", category: "environmental", duration: "3 years", eligibility: "Any stream with 50%+" }
        ],
        careers: [
          { name: "Research Scientist", category: "research", salary: "₹6-15 LPA", growth: "Moderate" },
          { name: "Data Scientist", category: "data-science", salary: "₹8-18 LPA", growth: "Very High" },
          { name: "Lab Technician", category: "lab-tech", salary: "₹3-7 LPA", growth: "Moderate" },
          { name: "Scientific Writer", category: "science-writing", salary: "₹4-10 LPA", growth: "High" }
        ],
        description: "Strong analytical skills and interest in understanding natural phenomena",
        entranceExams: ["JAM", "CUET", "BHU UET", "DU Entrance"],
        topColleges: ["University of Kashmir", "University of Jammu", "Central University of Kashmir"]
      },
      commerce: {
        courses: [
          { name: "B.Com", category: "commerce", duration: "3 years", eligibility: "Commerce with 50%+" },
          { name: "B.Com (Honors)", category: "commerce-honors", duration: "3 years", eligibility: "Commerce with 60%+" },
          { name: "BBA", category: "business-administration", duration: "3 years", eligibility: "Any stream with 50%+" },
          { name: "CA Foundation", category: "ca", duration: "3.5 years", eligibility: "Commerce with 55%+" }
        ],
        careers: [
          { name: "Accountant", category: "accounting", salary: "₹4-10 LPA", growth: "Moderate" },
          { name: "Financial Analyst", category: "finance", salary: "₹6-14 LPA", growth: "High" },
          { name: "Tax Consultant", category: "taxation", salary: "₹5-12 LPA", growth: "Moderate" },
          { name: "Banking Professional", category: "banking", salary: "₹7-15 LPA", growth: "Moderate" }
        ],
        description: "Interest in finance, accounting, and business operations",
        entranceExams: ["DU JAT", "IPU CET", "Christ Entrance", "Symbiosis SET"],
        topColleges: ["University of Jammu", "BGSBU Rajouri", "University of Kashmir"]
      },
      arts: {
        courses: [
          { name: "B.A English", category: "english", duration: "3 years", eligibility: "Any stream with 45%+" },
          { name: "B.A History", category: "history", duration: "3 years", eligibility: "Any stream with 45%+" },
          { name: "B.A Political Science", category: "political-science", duration: "3 years", eligibility: "Any stream with 45%+" },
          { name: "B.A Geography", category: "geography", duration: "3 years", eligibility: "Any stream with 45%+" }
        ],
        careers: [
          { name: "Teacher", category: "teaching", salary: "₹4-10 LPA", growth: "Moderate" },
          { name: "Content Writer", category: "writing", salary: "₹3-8 LPA", growth: "High" },
          { name: "Translator", category: "language", salary: "₹4-9 LPA", growth: "Moderate" },
          { name: "Museum Curator", category: "culture", salary: "₹5-12 LPA", growth: "Low" }
        ],
        description: "Strong language skills and interest in humanities, culture, and society",
        entranceExams: ["DU Entrance", "BHU UET", "CUET", "University Entrance"],
        topColleges: ["University of Kashmir", "University of Jammu", "Central University of Kashmir"]
      }
    };

    return sorted.map(([field, score]) => ({
      field: field.charAt(0).toUpperCase() + field.slice(1),
      score: Math.round((score / Math.max(...Object.values(results))) * 100),
      ...fieldMap[field]
    }));
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Assessment Ready</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We'll create a personalized assessment based on your responses.
        </p>
        <Button onClick={() => setFilteredQuestions(generateQuestions(null))}>
          Start Assessment
        </Button>
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    const recommendations = getPersonalizedRecommendations(results);

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here are your personalized career recommendations based on your responses.
          </p>
        </div>

        <div className="grid gap-6">
          {recommendations.map((rec, index) => (
            <Card key={index} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{rec.field}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                    <span className="font-semibold text-lg">{rec.score}% Match</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{rec.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Recommended Courses:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.courses?.slice(0, 4).map((course: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {course.duration} • {course.eligibility}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {rec.careers?.slice(0, 4).map((career: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="font-medium">{career.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {career.salary} • Growth: {career.growth}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Key Exams: </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {rec.entranceExams?.slice(0, 3).join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Top Colleges: </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {rec.topColleges?.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={restartAssessment} variant="outline">
            Retake Assessment
          </Button>
          <Button onClick={() => onNavigate?.("courses")}>
            Explore Courses
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = filteredQuestions[currentQuestion];
  const IconComponent = currentQ?.icon || FileText;
  const progress = ((currentQuestion + 1) / filteredQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Question {currentQuestion + 1} of {filteredQuestions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-blue-600 dark:text-blue-300 mb-1">
                {currentQ?.category}
              </div>
              <CardTitle className="text-xl leading-tight">
                {currentQ?.question}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {currentQ?.type === "radio" && (
            <RadioGroup
              value={answers[currentQ.id] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQ.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-base leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQ?.type === "marks" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enter your marks (0-100) for each subject:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.subjects?.map((subject, index) => {
                  const currentMarks = answers[currentQ.id] ? 
                    (function() {
                      try {
                        return JSON.parse(answers[currentQ.id]);
                      } catch {
                        return {};
                      }
                    })() : {};
                  
                  return (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`subject-${index}`} className="text-sm font-medium">
                        {subject}
                      </Label>
                      <Input
                        id={`subject-${index}`}
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Enter marks"
                        value={currentMarks[subject] || ""}
                        onChange={(e) => handleSubjectMarkChange(subject, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={!canProceed()}
          className="flex items-center space-x-2"
        >
          <span>{currentQuestion === filteredQuestions.length - 1 ? "Complete" : "Next"}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}