import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Calendar } from "./ui/calendar";
import { toast } from "sonner@2.0.3";
import { 
  Users, 
  Star, 
  Clock, 
  Video, 
  Phone, 
  MessageSquare,
  Filter,
  Search,
  BookOpen,
  Award,
  TrendingUp,
  Calendar as CalendarIcon,
  CheckCircle,
  MapPin,
  GraduationCap,
  Briefcase,
  ChevronRight,
  User,
  Sparkles,
  Heart,
  ThumbsUp,
  MessageCircle,
  PlayCircle
} from "lucide-react";

interface Expert {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  specialization: string;
  experience: number;
  rating: number;
  totalSessions: number;
  education: string;
  location: string;
  languages: string[];
  availability: string;
  hourlyRate: number;
  responseTime: string;
  avatar: string;
  bio: string;
  achievements: string[];
  consultationTypes: ('video' | 'phone' | 'chat')[];
  nextAvailable: Date;
  isOnline: boolean;
  verified: boolean;
}

interface Consultation {
  id: string;
  expertId: string;
  expertName: string;
  date: Date;
  duration: number;
  type: 'video' | 'phone' | 'chat';
  status: 'completed' | 'upcoming' | 'cancelled';
  topic: string;
  rating?: number;
  feedback?: string;
  notes?: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  topic: string;
  helpful: number;
}

export function ExpertGuidance() {
  const [activeTab, setActiveTab] = useState("find-experts");
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'chat'>('video');
  const [consultationTopic, setConsultationTopic] = useState("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  // Mock data for experts
  const [experts] = useState<Expert[]>([
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      title: "Senior Career Counselor",
      expertise: ["Engineering", "Technology", "Career Planning", "IIT/NIT Guidance"],
      specialization: "Engineering & Technology",
      experience: 12,
      rating: 4.9,
      totalSessions: 1250,
      education: "PhD Computer Science, IIT Delhi",
      location: "New Delhi",
      languages: ["English", "Hindi", "Urdu"],
      availability: "Mon-Fri 9AM-6PM",
      hourlyRate: 1500,
      responseTime: "Within 2 hours",
      avatar: "/api/placeholder/64/64",
      bio: "Expert in guiding students towards engineering careers with over 12 years of experience. Specialized in IIT/NIT admissions and technology career paths.",
      achievements: ["Helped 500+ students get into IITs", "Published 25+ research papers", "Former IIT Professor"],
      consultationTypes: ['video', 'phone', 'chat'],
      nextAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isOnline: true,
      verified: true
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      title: "Medical Career Advisor",
      expertise: ["Medical", "NEET", "Healthcare", "Research"],
      specialization: "Medical & Healthcare",
      experience: 8,
      rating: 4.8,
      totalSessions: 890,
      education: "MBBS, MD, AIIMS Delhi",
      location: "Mumbai",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Mon-Sat 10AM-7PM",
      hourlyRate: 2000,
      responseTime: "Within 1 hour",
      avatar: "/api/placeholder/64/64",
      bio: "Renowned medical professional and career counselor helping aspiring doctors navigate medical education and career opportunities.",
      achievements: ["NEET mentor for 300+ students", "Former AIIMS faculty", "Healthcare policy advisor"],
      consultationTypes: ['video', 'phone'],
      nextAvailable: new Date(Date.now() + 12 * 60 * 60 * 1000),
      isOnline: false,
      verified: true
    },
    {
      id: "3",
      name: "CA Amit Verma",
      title: "Finance & Business Mentor",
      expertise: ["Commerce", "Finance", "CA/CS", "Business", "Entrepreneurship"],
      specialization: "Commerce & Business",
      experience: 15,
      rating: 4.7,
      totalSessions: 2100,
      education: "CA, MBA Finance, Delhi University",
      location: "Bangalore",
      languages: ["English", "Hindi", "Kannada"],
      availability: "Tue-Sun 11AM-8PM",
      hourlyRate: 1800,
      responseTime: "Within 3 hours",
      avatar: "/api/placeholder/64/64",
      bio: "Chartered Accountant and business mentor with extensive experience in finance, taxation, and entrepreneurship guidance.",
      achievements: ["Mentored 100+ successful CAs", "Started 3 successful ventures", "Finance columnist"],
      consultationTypes: ['video', 'phone', 'chat'],
      nextAvailable: new Date(Date.now() + 36 * 60 * 60 * 1000),
      isOnline: true,
      verified: true
    },
    {
      id: "4",
      name: "Prof. Anita Singh",
      title: "Arts & Humanities Guide",
      expertise: ["Arts", "Literature", "Psychology", "Social Sciences", "Civil Services"],
      specialization: "Arts & Humanities",
      experience: 10,
      rating: 4.6,
      totalSessions: 670,
      education: "PhD Psychology, JNU Delhi",
      location: "Chandigarh",
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Mon-Fri 2PM-9PM",
      hourlyRate: 1200,
      responseTime: "Within 4 hours",
      avatar: "/api/placeholder/64/64",
      bio: "Psychology professor turned career counselor, specializing in humanities, social sciences, and civil services preparation.",
      achievements: ["UPSC mentor for 200+ aspirants", "Psychology research expert", "Published author"],
      consultationTypes: ['video', 'chat'],
      nextAvailable: new Date(Date.now() + 48 * 60 * 60 * 1000),
      isOnline: true,
      verified: true
    },
    {
      id: "5",
      name: "Ravi Patel",
      title: "Tech Industry Insider",
      expertise: ["Software Development", "Data Science", "AI/ML", "Startups", "Product Management"],
      specialization: "Technology & Startups",
      experience: 6,
      rating: 4.8,
      totalSessions: 450,
      education: "B.Tech CSE, MS Stanford",
      location: "Pune",
      languages: ["English", "Hindi", "Gujarati"],
      availability: "Evenings & Weekends",
      hourlyRate: 2500,
      responseTime: "Within 6 hours",
      avatar: "/api/placeholder/64/64",
      bio: "Former Google engineer and startup founder, helping students break into top tech companies and navigate the startup ecosystem.",
      achievements: ["Ex-Google, Ex-Facebook", "Founded 2 startups", "Angel investor"],
      consultationTypes: ['video', 'phone', 'chat'],
      nextAvailable: new Date(Date.now() + 60 * 60 * 60 * 1000),
      isOnline: false,
      verified: true
    }
  ]);

  // Mock consultation history
  const [consultationHistory] = useState<Consultation[]>([
    {
      id: "1",
      expertId: "1",
      expertName: "Dr. Rajesh Kumar",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: 60,
      type: 'video',
      status: 'completed',
      topic: "IIT JEE Preparation Strategy",
      rating: 5,
      feedback: "Excellent guidance on study plan and exam strategy",
      notes: "Focus on Physics and Mathematics. Practice mock tests regularly."
    },
    {
      id: "2",
      expertId: "3",
      expertName: "CA Amit Verma",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      duration: 45,
      type: 'video',
      status: 'upcoming',
      topic: "Commerce Stream Career Options",
      notes: "Discuss CA vs CS vs MBA options"
    }
  ]);

  // Mock reviews
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Arjun K.",
      rating: 5,
      comment: "Dr. Kumar's guidance was invaluable. He helped me create a perfect study plan for JEE and I got into IIT Delhi!",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      topic: "JEE Preparation",
      helpful: 24
    },
    {
      id: "2",
      userName: "Sneha M.",
      rating: 5,
      comment: "Amazing session! Very clear explanations and practical advice for engineering career paths.",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      topic: "Career Planning",
      helpful: 18
    },
    {
      id: "3",
      userName: "Rohit S.",
      rating: 4,
      comment: "Good insights on technology trends and industry requirements. Helped me choose the right specialization.",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      topic: "Technology Career",
      helpful: 12
    }
  ]);

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialization = filterSpecialization === "all" || expert.specialization === filterSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const getSpecializations = () => {
    const specializations = ["all", ...Array.from(new Set(experts.map(e => e.specialization)))];
    return specializations;
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const handleBookConsultation = () => {
    if (!selectedExpert || !selectedDate || !selectedTimeSlot || !consultationTopic.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    const newConsultation: Consultation = {
      id: Date.now().toString(),
      expertId: selectedExpert.id,
      expertName: selectedExpert.name,
      date: new Date(selectedDate.setHours(parseInt(selectedTimeSlot.split(':')[0]))),
      duration: 60,
      type: consultationType,
      status: 'upcoming',
      topic: consultationTopic,
      notes: ""
    };

    toast.success("Consultation booked successfully!");
    setIsBookingDialogOpen(false);
    setConsultationTopic("");
    setSelectedTimeSlot("");
    setActiveTab("my-sessions");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Expert Guidance & Mentorship
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Connect with industry experts and experienced counselors for personalized career guidance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="find-experts" className="flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Find Experts
            </TabsTrigger>
            <TabsTrigger value="my-sessions" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              My Sessions
            </TabsTrigger>
            <TabsTrigger value="expert-reviews" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="how-it-works" className="flex items-center">
              <PlayCircle className="h-4 w-4 mr-2" />
              How it Works
            </TabsTrigger>
          </TabsList>

          {/* Find Experts Tab */}
          <TabsContent value="find-experts" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="search">Search Experts</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name or expertise..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Specialization</Label>
                    <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getSpecializations().map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec === "all" ? "All Specializations" : spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={expert.avatar} />
                          <AvatarFallback>
                            {expert.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {expert.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                        {expert.verified && (
                          <div className="absolute -top-1 -right-1">
                            <CheckCircle className="h-5 w-5 text-blue-500 fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {expert.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(Math.floor(expert.rating))}
                            <span className="text-sm text-gray-600 ml-1">
                              {expert.rating} ({expert.totalSessions})
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {expert.title}
                        </p>
                        
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {expert.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {expert.expertise.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {expert.expertise.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{expert.expertise.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {expert.experience} years exp.
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {expert.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {expert.responseTime}
                          </div>
                          <div className="flex items-center">
                            <span className="text-green-600 font-medium">
                              ₹{expert.hourlyRate}/hour
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {expert.consultationTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type === 'video' && <Video className="h-3 w-3 mr-1" />}
                                {type === 'phone' && <Phone className="h-3 w-3 mr-1" />}
                                {type === 'chat' && <MessageSquare className="h-3 w-3 mr-1" />}
                                {type}
                              </Badge>
                            ))}
                          </div>
                          
                          <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  setSelectedExpert(expert);
                                  setIsBookingDialogOpen(true);
                                }}
                              >
                                Book Session
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Book Consultation</DialogTitle>
                                <DialogDescription>
                                  Schedule a session with {selectedExpert?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Consultation Topic *</Label>
                                  <Textarea
                                    placeholder="What would you like to discuss?"
                                    value={consultationTopic}
                                    onChange={(e) => setConsultationTopic(e.target.value)}
                                    rows={3}
                                  />
                                </div>
                                
                                <div>
                                  <Label>Select Date *</Label>
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date()}
                                    className="rounded-md border"
                                  />
                                </div>
                                
                                <div>
                                  <Label>Time Slot *</Label>
                                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeSlots.map((slot) => (
                                        <SelectItem key={slot} value={slot}>
                                          {slot}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div>
                                  <Label>Consultation Type</Label>
                                  <Select value={consultationType} onValueChange={(value: 'video' | 'phone' | 'chat') => setConsultationType(value)}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedExpert?.consultationTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          <div className="flex items-center">
                                            {type === 'video' && <Video className="h-4 w-4 mr-2" />}
                                            {type === 'phone' && <Phone className="h-4 w-4 mr-2" />}
                                            {type === 'chat' && <MessageSquare className="h-4 w-4 mr-2" />}
                                            {type.charAt(0).toUpperCase() + type.slice(1)} Call
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span>Session Fee:</span>
                                    <span className="font-semibold">₹{selectedExpert?.hourlyRate}</span>
                                  </div>
                                </div>
                                
                                <Button onClick={handleBookConsultation} className="w-full">
                                  Confirm Booking
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Sessions Tab */}
          <TabsContent value="my-sessions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    My Consultations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {consultationHistory.map((session) => (
                      <div
                        key={session.id}
                        className={`p-4 border rounded-lg ${
                          session.status === 'upcoming' 
                            ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20' 
                            : session.status === 'completed'
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {session.expertName}
                              </h3>
                              <Badge className={
                                session.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {session.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              Topic: {session.topic}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {session.date.toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {session.duration} mins
                              </span>
                              <span className="flex items-center">
                                {session.type === 'video' && <Video className="h-3 w-3 mr-1" />}
                                {session.type === 'phone' && <Phone className="h-3 w-3 mr-1" />}
                                {session.type === 'chat' && <MessageSquare className="h-3 w-3 mr-1" />}
                                {session.type}
                              </span>
                            </div>
                            {session.notes && (
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                <strong>Notes:</strong> {session.notes}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col space-y-2">
                            {session.status === 'upcoming' && (
                              <>
                                <Button size="sm">Join Session</Button>
                                <Button size="sm" variant="outline">Reschedule</Button>
                              </>
                            )}
                            {session.status === 'completed' && session.rating && (
                              <div className="flex items-center space-x-1">
                                {renderStars(session.rating)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {consultationHistory.filter(s => s.status === 'completed').length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {consultationHistory.filter(s => s.status === 'upcoming').length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming Sessions</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {consultationHistory.filter(s => s.rating).reduce((avg, s) => avg + (s.rating || 0), 0) / consultationHistory.filter(s => s.rating).length || 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating Given</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="expert-reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Expert Reviews & Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {review.userName}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  {renderStars(review.rating)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {review.topic}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date.toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {review.comment}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-gray-700">
                              <ThumbsUp className="h-4 w-4" />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-700">
                              <MessageCircle className="h-4 w-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* How it Works Tab */}
          <TabsContent value="how-it-works" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">1. Find Your Expert</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Browse through our network of verified career counselors and industry experts based on your interests and goals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">2. Book a Session</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Choose your preferred date, time, and consultation type (video, phone, or chat) that works for both you and the expert.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">3. Get Guidance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Connect with your expert for personalized advice, career planning, and answers to all your education and career questions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">How are experts verified?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      All experts go through a rigorous verification process including background checks, credential verification, and mock sessions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Can I reschedule my session?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes, you can reschedule your session up to 24 hours before the scheduled time without any additional charges.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">What if I'm not satisfied with the session?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We offer a satisfaction guarantee. If you're not happy with your session, we'll provide a full refund or arrange another session with a different expert.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}