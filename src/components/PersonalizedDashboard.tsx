import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { 
  User, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Calendar, 
  Award,
  Brain,
  Sparkles,
  ChevronRight,
  MapPin,
  Clock,
  Star,
  Zap,
  Lightbulb,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  DollarSign,
  BarChart3,
  Edit3,
  Camera,
  Save,
  X,
  Settings,
  Upload
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  phone: string;
  city: string;
  state: string;
  class: string;
  stream: string;
  interests: string[];
  goals: string[];
  careerGoals: string;
  avatar: string;
  bio: string;
  completedAssessments: number;
  profileCompletion: number;
  signupTime?: string;
  loginTime?: string;
}

interface Recommendation {
  id: string;
  type: "course" | "college" | "scholarship" | "internship" | "career";
  title: string;
  description: string;
  reason: string;
  confidence: number;
  priority: "high" | "medium" | "low";
  deadline?: Date;
  estimatedOutcome: string;
  actionUrl?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "assessment" | "application" | "milestone";
  points: number;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: "trend" | "opportunity" | "warning" | "tip";
  relevance: number;
}

interface PersonalizedDashboardProps {
  onNavigate?: (page: string, params?: any) => void;
}

export function PersonalizedDashboard({ onNavigate }: PersonalizedDashboardProps = {}) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@example.com",
    age: "17",
    gender: "female",
    phone: "+91 9876543210",
    city: "Srinagar",
    state: "jammu-kashmir",
    class: "12th Grade",
    stream: "Science (PCM)",
    interests: ["Technology", "Innovation", "Problem Solving", "Mathematics"],
    goals: ["Software Engineer", "Data Scientist", "Tech Entrepreneur"],
    careerGoals: "To become a successful software engineer and eventually start my own tech company",
    avatar: "/api/placeholder/64/64",
    bio: "Passionate about technology and innovation. Currently in 12th grade pursuing PCM stream.",
    completedAssessments: 3,
    profileCompletion: 85
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState<UserProfile>(userProfile);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // AI-generated recommendations based on user profile
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      type: "course",
      title: "Computer Science Engineering at IIT Delhi",
      description: "Top-ranked program with excellent placement record",
      reason: "Matches your interests in Technology and Mathematics, aligns with Software Engineer goal",
      confidence: 95,
      priority: "high",
      deadline: new Date("2025-01-15"),
      estimatedOutcome: "95% placement rate with avg. package ₹18 LPA",
      actionUrl: "/courses?filter=computer-science"
    },
    {
      id: "2",
      type: "scholarship",
      title: "PM Special Scholarship Scheme",
      description: "Full funding for J&K students studying outside state",
      reason: "You're eligible as a J&K resident pursuing engineering",
      confidence: 90,
      priority: "high",
      deadline: new Date("2025-01-20"),
      estimatedOutcome: "Up to ₹2 lakh annual support",
      actionUrl: "/scholarships?filter=pm-special"
    },
    {
      id: "3",
      type: "internship",
      title: "Google Summer of Code 2025",
      description: "Open source software development program",
      reason: "Perfect for building coding skills and tech industry exposure",
      confidence: 80,
      priority: "medium",
      deadline: new Date("2025-03-15"),
      estimatedOutcome: "Strong portfolio + $3000 stipend",
      actionUrl: "/internships?filter=google"
    },
    {
      id: "4",
      type: "career",
      title: "Data Science Career Path",
      description: "Emerging field with high growth potential",
      reason: "Combines your Mathematics interest with Technology goals",
      confidence: 85,
      priority: "medium",
      estimatedOutcome: "₹12-25 LPA starting salary, 40% YoY growth",
      actionUrl: "/courses?career=data-science"
    },
    {
      id: "5",
      type: "college",
      title: "Delhi Technological University",
      description: "State university with strong industry connections",
      reason: "Good backup option with lower cutoff but quality education",
      confidence: 75,
      priority: "medium",
      estimatedOutcome: "85% placement with avg. ₹8 LPA",
      actionUrl: "/colleges?id=dtu"
    }
  ]);

  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Career Assessment Completed",
      description: "Discovered strengths in Logical Reasoning and Quantitative Aptitude",
      date: new Date("2024-11-15"),
      type: "assessment",
      points: 50
    },
    {
      id: "2",
      title: "Profile 85% Complete",
      description: "Added interests and career goals",
      date: new Date("2024-11-10"),
      type: "milestone",
      points: 30
    },
    {
      id: "3",
      title: "JEE Main Application Submitted",
      description: "Successfully registered for JEE Main 2025",
      date: new Date("2024-11-05"),
      type: "application",
      points: 100
    }
  ]);

  const [aiInsights, setAiInsights] = useState<Insight[]>([
    {
      id: "1",
      title: "Engineering Admission Trends",
      description: "Computer Science cutoffs are expected to rise by 5-8% this year due to increased demand",
      type: "trend",
      relevance: 95
    },
    {
      id: "2",
      title: "Scholarship Opportunity",
      description: "Only 15% of eligible students apply for PM Special Scholarship - don't miss out!",
      type: "opportunity",
      relevance: 90
    },
    {
      id: "3",
      title: "Career Growth Alert",
      description: "AI/ML roles are growing 45% faster than traditional software roles in your target companies",
      type: "tip",
      relevance: 85
    },
    {
      id: "4",
      title: "Application Deadline Warning",
      description: "Multiple scholarship deadlines approaching in next 2 weeks",
      type: "warning",
      relevance: 88
    }
  ]);

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "course": return <BookOpen className="h-5 w-5" />;
      case "college": return <Building className="h-5 w-5" />;
      case "scholarship": return <Award className="h-5 w-5" />;
      case "internship": return <Briefcase className="h-5 w-5" />;
      case "career": return <TrendingUp className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend": return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "opportunity": return <Zap className="h-4 w-4 text-green-500" />;
      case "warning": return <Clock className="h-4 w-4 text-red-500" />;
      case "tip": return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      default: return <Brain className="h-4 w-4 text-purple-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium": return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "low": return "border-green-500 bg-green-50 dark:bg-green-900/20";
      default: return "border-gray-300 bg-white";
    }
  };

  const totalPoints = recentAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  // Load user profile from userService on component mount
  useEffect(() => {
    // Import userService
    import('../services/userService').then(({ userService }) => {
      const currentUser = userService.getCurrentUser();
      if (currentUser) {
        // Convert the new UserProfile format to the old one for compatibility
        const compatibleProfile = {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          age: currentUser.age || "",
          gender: currentUser.gender || "",
          phone: currentUser.phone || "",
          city: currentUser.city || "",
          state: currentUser.state || "",
          class: currentUser.class || "",
          stream: currentUser.stream || "",
          interests: currentUser.interests || [],
          goals: currentUser.goals || [],
          careerGoals: currentUser.careerGoals || "",
          avatar: currentUser.avatar || "",
          bio: currentUser.bio || "",
          completedAssessments: currentUser.completedAssessments || 0,
          profileCompletion: currentUser.profileCompletion || 0,
          signupTime: currentUser.signupTime,
          loginTime: currentUser.loginTime
        };
        
        setUserProfile(compatibleProfile);
        setEditFormData(compatibleProfile);
      }
    }).catch(error => {
      console.error('Error loading user service:', error);
      // Fall back to localStorage if userService fails
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          const profileCompletion = calculateProfileCompletion(parsedProfile);
          
          const mergedProfile = {
            firstName: parsedProfile.firstName || userProfile.firstName,
            lastName: parsedProfile.lastName || userProfile.lastName,
            email: parsedProfile.email || userProfile.email,
            age: parsedProfile.age || userProfile.age,
            gender: parsedProfile.gender || userProfile.gender,
            phone: parsedProfile.phone || userProfile.phone || "",
            city: parsedProfile.city || userProfile.city,
            state: parsedProfile.state || userProfile.state,
            class: parsedProfile.class || userProfile.class,
            stream: parsedProfile.stream || userProfile.stream,
            interests: parsedProfile.interests || userProfile.interests,
            goals: parsedProfile.goals || (parsedProfile.careerGoals ? [parsedProfile.careerGoals] : userProfile.goals),
            careerGoals: parsedProfile.careerGoals || userProfile.careerGoals,
            avatar: parsedProfile.avatar || userProfile.avatar,
            bio: parsedProfile.bio || userProfile.bio,
            completedAssessments: parsedProfile.completedAssessments || userProfile.completedAssessments,
            profileCompletion: profileCompletion
          };
          
          setUserProfile(mergedProfile);
          setEditFormData(mergedProfile);
        } catch (error) {
          console.error('Error parsing saved profile:', error);
        }
      }
    });
  }, []);

  const handleEditProfile = () => {
    setEditFormData({ ...userProfile });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setUserProfile(editFormData);
    localStorage.setItem('userProfile', JSON.stringify(editFormData));
    setIsEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditFormData({ ...userProfile });
    setIsEditingProfile(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string | string[]) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setEditFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (imagePreview) {
      const updatedProfile = { ...editFormData, avatar: imagePreview };
      setEditFormData(updatedProfile);
      setUserProfile(updatedProfile);
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      toast.success("Profile picture updated!");
    }
    setIsImageDialogOpen(false);
    setSelectedImage(null);
    setImagePreview("");
  };

  const calculateProfileCompletion = (profile: UserProfile) => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.age,
      profile.gender,
      profile.city,
      profile.state,
      profile.class,
      profile.stream,
      profile.careerGoals,
      profile.bio
    ];
    
    const completedFields = fields.filter(field => field && field.trim() !== '').length;
    const interestsComplete = profile.interests.length > 0 ? 1 : 0;
    const goalsComplete = profile.goals.length > 0 ? 1 : 0;
    
    return Math.round(((completedFields + interestsComplete + goalsComplete) / (fields.length + 2)) * 100);
  };

  // Update profile completion whenever editFormData changes
  useEffect(() => {
    const completion = calculateProfileCompletion(editFormData);
    setEditFormData(prev => ({ ...prev, profileCompletion: completion }));
  }, [editFormData.firstName, editFormData.lastName, editFormData.email, editFormData.age, 
      editFormData.gender, editFormData.city, editFormData.state, editFormData.class, 
      editFormData.stream, editFormData.careerGoals, editFormData.bio, editFormData.interests, editFormData.goals]);

  const getFullName = () => `${userProfile.firstName} ${userProfile.lastName}`;

  const availableInterests = [
    "Technology", "Healthcare", "Business", "Arts & Design", 
    "Science & Research", "Education", "Sports", "Social Work",
    "Innovation", "Problem Solving", "Mathematics", "Literature",
    "Music", "Photography", "Environment", "Psychology"
  ];

  const availableGoals = [
    "Software Engineer", "Data Scientist", "Doctor", "Teacher",
    "Business Analyst", "Researcher", "Designer", "Entrepreneur",
    "Tech Entrepreneur", "Civil Servant", "Artist", "Consultant"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          {/* Check if this is a new user and show welcome message */}
          {userProfile.signupTime && new Date(userProfile.signupTime).getTime() > Date.now() - (24 * 60 * 60 * 1000) && (
            <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                    <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Welcome to Nava, {userProfile.firstName}! 🎉
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                      Thank you for joining us! We've created your personalized profile with the information you provided:
                    </p>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-600 dark:text-blue-400 mb-3">
                      <div>✓ <strong>Name:</strong> {userProfile.firstName} {userProfile.lastName}</div>
                      <div>✓ <strong>Age:</strong> {userProfile.age} years old</div>
                      <div>✓ <strong>Gender:</strong> {userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1)}</div>
                      <div>✓ <strong>Location:</strong> {userProfile.city}, {userProfile.state.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      <div>✓ <strong>Education:</strong> {userProfile.class}</div>
                      {userProfile.stream && <div>✓ <strong>Stream:</strong> {userProfile.stream.toUpperCase().replace('-', ' ')}</div>}
                      <div>✓ <strong>Interests:</strong> {userProfile.interests.length > 0 ? userProfile.interests.join(', ') : 'None selected yet'}</div>
                      {userProfile.careerGoals && <div>✓ <strong>Career Goal:</strong> {userProfile.careerGoals}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Your profile is <strong>{userProfile.profileCompletion}% complete</strong>. Complete it to get better recommendations!
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          // Switch to profile tab
                          const profileTab = document.querySelector('[data-value="profile"]') as HTMLElement;
                          profileTab?.click();
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Complete Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {getFullName()}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Here's your personalized career guidance dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* AI Recommendations Button */}
              <Button
                onClick={() => onNavigate?.("ai-recommendations")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Recommendations
              </Button>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Points Earned</div>
              </div>
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="bg-blue-500 text-white text-lg">
                    {userProfile.firstName[0]}{userProfile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Update Profile Picture</DialogTitle>
                      <DialogDescription>
                        Choose a new profile picture (max 5MB)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={imagePreview || userProfile.avatar} />
                          <AvatarFallback>
                            {userProfile.firstName[0]}{userProfile.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleSaveImage} 
                          disabled={!imagePreview}
                          className="flex-1"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Picture
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsImageDialogOpen(false);
                            setImagePreview("");
                            setSelectedImage(null);
                          }}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Profile Settings
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">{/* Original dashboard content */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Profile & Quick Stats */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Profile Overview
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditProfile}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</span>
                        <span className="text-sm font-medium">{userProfile.profileCompletion}%</span>
                      </div>
                      <Progress value={userProfile.profileCompletion} className="h-2" />
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600 dark:text-gray-400">Email:</span> {userProfile.email}</div>
                      <div><span className="text-gray-600 dark:text-gray-400">Age:</span> {userProfile.age} years old</div>
                      <div><span className="text-gray-600 dark:text-gray-400">Gender:</span> {userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1)}</div>
                      {userProfile.phone && (
                        <div><span className="text-gray-600 dark:text-gray-400">Phone:</span> {userProfile.phone}</div>
                      )}
                      <div><span className="text-gray-600 dark:text-gray-400">Location:</span> {userProfile.city}, {userProfile.state.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      <div><span className="text-gray-600 dark:text-gray-400">Education:</span> {userProfile.class}</div>
                      {userProfile.stream && (
                        <div><span className="text-gray-600 dark:text-gray-400">Stream:</span> {userProfile.stream.toUpperCase().replace('-', ' ')}</div>
                      )}
                      <div><span className="text-gray-600 dark:text-gray-400">Assessments:</span> {userProfile.completedAssessments}/5 completed</div>
                    </div>

                    {userProfile.bio && (
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">About</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {userProfile.bio}
                        </p>
                      </div>
                    )}

                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Interests</div>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Career Goals</div>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.goals.map((goal, index) => (
                          <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Career Assessment</span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium">Completed</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">College Applications</span>
                          <span className="text-orange-600 dark:text-orange-400 font-medium">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full w-3/5"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Profile Completion</span>
                          <span className="text-green-600 dark:text-green-400 font-medium">{userProfile.profileCompletion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${userProfile.profileCompletion}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 text-xs"
                            onClick={() => onNavigate?.("timeline")}
                          >
                            <Calendar className="h-3 w-3 mr-1" />
                            Deadlines
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 text-xs"
                            onClick={() => onNavigate?.("scholarships")}
                          >
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Scholarships
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAchievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            achievement.type === "assessment" ? "bg-blue-100 text-blue-600" :
                            achievement.type === "application" ? "bg-green-100 text-green-600" :
                            "bg-purple-100 text-purple-600"
                          }`}>
                            <Award className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {achievement.title}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                {achievement.date.toLocaleDateString()}
                              </span>
                              <Badge className="text-xs bg-yellow-100 text-yellow-800">
                                +{achievement.points} pts
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-500" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiInsights.slice(0, 3).map((insight) => (
                        <div key={insight.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-start space-x-2">
                            {getInsightIcon(insight.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                {insight.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {insight.description}
                              </p>
                              <div className="mt-2">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                  <div 
                                    className="bg-purple-500 h-1 rounded-full" 
                                    style={{ width: `${insight.relevance}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">
                                  {insight.relevance}% relevance
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => onNavigate?.("assessment")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Take Assessment
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => onNavigate?.("colleges")}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Explore Colleges
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => onNavigate?.("scholarships")}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        Find Scholarships
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={() => onNavigate?.("expert-guidance")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Expert Guidance
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Progress Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Career Assessment</span>
                          <span>3/5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>College Applications</span>
                          <span>0/3</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Profile Completion</span>
                          <span>{userProfile.profileCompletion}%</span>
                        </div>
                        <Progress value={userProfile.profileCompletion} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Deadlines */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div>
                          <p className="font-medium text-red-800 dark:text-red-200">JEE Main Registration</p>
                          <p className="text-sm text-red-600 dark:text-red-300">Last date to apply</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">5 days left</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div>
                          <p className="font-medium text-yellow-800 dark:text-yellow-200">Scholarship Application</p>
                          <p className="text-sm text-yellow-600 dark:text-yellow-300">PM Special Scholarship</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">15 days left</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Settings
                  </div>
                  {isEditingProfile ? (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditProfile}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={editFormData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={editFormData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editFormData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={editFormData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={editFormData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Gender</Label>
                          <RadioGroup 
                            value={editFormData.gender} 
                            onValueChange={(value) => handleInputChange("gender", value)}
                            className="flex flex-row space-x-4 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="edit-male" />
                              <Label htmlFor="edit-male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="edit-female" />
                              <Label htmlFor="edit-female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="edit-other" />
                              <Label htmlFor="edit-other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={editFormData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Select 
                            value={editFormData.state} 
                            onValueChange={(value) => handleInputChange("state", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="jammu-kashmir">Jammu and Kashmir</SelectItem>
                              <SelectItem value="ladakh">Ladakh</SelectItem>
                              <SelectItem value="himachal-pradesh">Himachal Pradesh</SelectItem>
                              <SelectItem value="punjab">Punjab</SelectItem>
                              <SelectItem value="haryana">Haryana</SelectItem>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Education Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Education Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="class">Current Education Level</Label>
                          <Select 
                            value={editFormData.class} 
                            onValueChange={(value) => handleInputChange("class", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10th Grade">Class 10 (Currently studying)</SelectItem>
                              <SelectItem value="10th Grade Completed">Class 10 (Completed)</SelectItem>
                              <SelectItem value="12th Grade">Class 12 (Currently studying)</SelectItem>
                              <SelectItem value="12th Grade Completed">Class 12 (Completed)</SelectItem>
                              <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                              <SelectItem value="Graduate">Graduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="stream">Stream/Field</Label>
                          <Select 
                            value={editFormData.stream} 
                            onValueChange={(value) => handleInputChange("stream", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Science (PCM)">Science (PCM)</SelectItem>
                              <SelectItem value="Science (PCB)">Science (PCB)</SelectItem>
                              <SelectItem value="Science (PCMB)">Science (PCMB)</SelectItem>
                              <SelectItem value="Commerce">Commerce</SelectItem>
                              <SelectItem value="Arts/Humanities">Arts/Humanities</SelectItem>
                              <SelectItem value="Engineering">Engineering</SelectItem>
                              <SelectItem value="Medical">Medical</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* About Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">About</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={editFormData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="careerGoals">Career Goals</Label>
                          <Textarea
                            id="careerGoals"
                            placeholder="What are your career aspirations?"
                            value={editFormData.careerGoals}
                            onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Interests</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableInterests.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`interest-${interest}`}
                              checked={editFormData.interests.includes(interest)}
                              onCheckedChange={() => toggleInterest(interest)}
                            />
                            <Label htmlFor={`interest-${interest}`} className="text-sm">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Goals Selection */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Career Aspirations</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableGoals.map((goal) => (
                          <div key={goal} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`goal-${goal}`}
                              checked={editFormData.goals.includes(goal)}
                              onCheckedChange={() => {
                                setEditFormData(prev => ({
                                  ...prev,
                                  goals: prev.goals.includes(goal)
                                    ? prev.goals.filter(g => g !== goal)
                                    : [...prev.goals, goal]
                                }));
                              }}
                            />
                            <Label htmlFor={`goal-${goal}`} className="text-sm">
                              {goal}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Display Profile Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                        <div className="space-y-3 text-sm">
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Name:</span> {getFullName()}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Email:</span> {userProfile.email}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Phone:</span> {userProfile.phone}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Age:</span> {userProfile.age}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Gender:</span> {userProfile.gender}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Location:</span> {userProfile.city}, {userProfile.state}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Education Information</h3>
                        <div className="space-y-3 text-sm">
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Class:</span> {userProfile.class}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Stream:</span> {userProfile.stream}</div>
                          <div><span className="text-gray-600 dark:text-gray-400 font-medium">Assessments Completed:</span> {userProfile.completedAssessments}/5</div>
                        </div>
                      </div>
                    </div>

                    {userProfile.bio && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">About</h3>
                        <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
                      </div>
                    )}

                    {userProfile.careerGoals && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Career Goals</h3>
                        <p className="text-gray-700 dark:text-gray-300">{userProfile.careerGoals}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Career Aspirations</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.goals.map((goal, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                    AI-Powered Recommendations
                  </CardTitle>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {recommendations.filter(r => r.priority === "high").length} High Priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Personalized suggestions based on your profile, interests, and goals
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${getPriorityColor(rec.priority)}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            rec.type === "course" ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" :
                            rec.type === "college" ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400" :
                            rec.type === "scholarship" ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400" :
                            rec.type === "internship" ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400" :
                            "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                          }`}>
                            {getRecommendationIcon(rec.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {rec.title}
                              </h3>
                              <Badge className="text-xs capitalize">
                                {rec.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {rec.description}
                            </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg mb-2">
                              <p className="text-xs text-blue-800 dark:text-blue-200">
                                <strong>Why recommended:</strong> {rec.reason}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            <Brain className="h-3 w-3 text-purple-500" />
                            <span className="text-xs text-purple-600 font-medium">
                              {rec.confidence}% match
                            </span>
                          </div>
                          <Badge className={
                            rec.priority === "high" ? "bg-red-100 text-red-800" :
                            rec.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }>
                            {rec.priority} priority
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Expected Outcome</p>
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">
                            {rec.estimatedOutcome}
                          </p>
                        </div>
                        {rec.deadline && (
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Deadline</p>
                            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                              {rec.deadline.toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            Match: {rec.confidence}%
                          </span>
                          {rec.deadline && (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {Math.ceil((rec.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                          {rec.actionUrl && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Take Action
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        AI Recommendation Engine
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Continuously learning from your choices
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Our AI analyzes 50+ factors including your interests, academic performance, career goals, and market trends to provide personalized recommendations.
                  </p>
                  <div className="flex space-x-4 text-xs">
                    <div className="flex items-center">
                      <BarChart3 className="h-3 w-3 mr-1 text-blue-500" />
                      <span>Market Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="h-3 w-3 mr-1 text-green-500" />
                      <span>Goal Alignment</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-purple-500" />
                      <span>Real-time Updates</span>
                    </div>
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