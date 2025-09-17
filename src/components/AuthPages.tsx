import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Eye, EyeOff, GraduationCap, BookOpen, Users, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { BackButton } from "./BackButton";
import { userService } from "../services/userService";
import { SignupData, LoginData, PageType } from "../types";

interface AuthPagesProps {
  onNavigate: (page: PageType, params?: any) => void;
  onAuthSuccess?: (profile: any) => void;
}

export function AuthPages({ onNavigate, onAuthSuccess }: AuthPagesProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  
  // Complete signup form data
  const [signupData, setSignupData] = useState<Partial<SignupData>>({
    firstName: "",
    lastName: "", 
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    class: "",
    stream: "",
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [loginData, setLoginData] = useState<Partial<LoginData>>({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userService.login({
        email: loginData.email || "",
        password: loginData.password || "",
        rememberMe: loginData.rememberMe
      });

      if (response.success && response.user) {
        toast.success(response.message || "Login successful!");
        
        if (onAuthSuccess) {
          onAuthSuccess(response.user);
        } else {
          // Fallback navigation
          onNavigate("dashboard");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userService.signup({
        firstName: signupData.firstName || "",
        lastName: signupData.lastName || "",
        email: signupData.email || "",
        password: signupData.password || "",
        confirmPassword: signupData.confirmPassword || "",
        phone: signupData.phone,
        age: signupData.age,
        gender: signupData.gender,
        city: signupData.city,
        state: signupData.state,
        class: signupData.class,
        stream: signupData.stream,
        agreeToTerms: signupData.agreeToTerms || false,
        subscribeNewsletter: signupData.subscribeNewsletter
      });

      if (response.success && response.user) {
        toast.success(response.message || "Account created successfully!");
        
        if (onAuthSuccess) {
          onAuthSuccess(response.user);
        } else {
          // Fallback navigation
          onNavigate("dashboard");
        }
      } else {
        toast.error(response.message || "Account creation failed");
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("An unexpected error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupInputChange = (field: keyof SignupData, value: string | boolean) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginInputChange = (field: keyof LoginData, value: string | boolean) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  // Education levels and streams for better UX
  const educationLevels = [
    { value: "class-10", label: "Class 10" },
    { value: "class-11", label: "Class 11" },
    { value: "class-12", label: "Class 12" },
    { value: "class-12-completed", label: "Class 12 Completed" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate" }
  ];

  const streams = [
    { value: "science-pcm", label: "Science (PCM)" },
    { value: "science-pcb", label: "Science (PCB)" },
    { value: "science-pcmb", label: "Science (PCMB)" },
    { value: "commerce-math", label: "Commerce with Math" },
    { value: "commerce-no-math", label: "Commerce without Math" },
    { value: "arts-humanities", label: "Arts/Humanities" }
  ];

  const states = [
    { value: "jammu-kashmir", label: "Jammu & Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "punjab", label: "Punjab" },
    { value: "haryana", label: "Haryana" },
    { value: "delhi", label: "Delhi" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-auto">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton onBack={() => onNavigate("home")} />
      </div>

      <div className="min-h-screen py-12 px-4 flex items-center justify-center relative">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Career Advisor</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of students making informed decisions about their educational and career journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-8">
              {/* Stream Selection Help */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  🎯 Need Help Choosing Your Stream?
                </h3>
                <div className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                  <p><strong>Science (PCM):</strong> Engineering, Technology, Computer Science, Mathematics, Research</p>
                  <p><strong>Science (PCB):</strong> Medicine, Dentistry, Nursing, Biotechnology, Agriculture, Veterinary</p>
                  <p><strong>Commerce:</strong> Business, Finance, Economics, Accounting, Management, Entrepreneurship</p>
                  <p><strong>Arts & Humanities:</strong> Law, Literature, Psychology, Journalism, Social Work, Civil Services</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Choose Our Platform?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Personalized Recommendations
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Get course and career suggestions tailored to your interests and aptitude
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Government College Directory
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Access comprehensive information about government colleges and admission requirements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Career Path Mapping
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Visualize your educational journey and future job prospects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Trusted by Students Across Jammu & Kashmir
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Our platform is designed specifically for students in J&K, with updated information 
                  about local colleges, admission timelines, and career opportunities.
                </p>
              </div>
            </div>

            {/* Right side - Auth Forms */}
            <div className="max-w-md mx-auto w-full">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Get Started</CardTitle>
                  <CardDescription className="text-center">
                    Create an account or sign in to access personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4 mt-6">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email *</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email || ""}
                            onChange={(e) => handleLoginInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="login-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              value={loginData.password || ""}
                              onChange={(e) => handleLoginInputChange("password", e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="remember" 
                              checked={loginData.rememberMe || false}
                              onCheckedChange={(checked) => handleLoginInputChange("rememberMe", Boolean(checked))}
                            />
                            <Label htmlFor="remember" className="text-sm">
                              Remember me
                            </Label>
                          </div>
                          <Button variant="link" className="px-0 text-sm">
                            Forgot password?
                          </Button>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Signing In...
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4 mt-6 max-h-96 overflow-y-auto">
                      <form onSubmit={handleSignup} className="space-y-4">
                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name *</Label>
                            <Input
                              id="first-name"
                              placeholder="First name"
                              value={signupData.firstName || ""}
                              onChange={(e) => handleSignupInputChange("firstName", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name *</Label>
                            <Input
                              id="last-name"
                              placeholder="Last name"
                              value={signupData.lastName || ""}
                              onChange={(e) => handleSignupInputChange("lastName", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email *</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={signupData.email || ""}
                            onChange={(e) => handleSignupInputChange("email", e.target.value)}
                            required
                          />
                        </div>

                        {/* Personal Information */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              min="13"
                              max="100"
                              placeholder="Age"
                              value={signupData.age || ""}
                              onChange={(e) => handleSignupInputChange("age", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select value={signupData.gender || ""} onValueChange={(value) => handleSignupInputChange("gender", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="Phone number"
                              value={signupData.phone || ""}
                              onChange={(e) => handleSignupInputChange("phone", e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Location */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={signupData.city || ""}
                              onChange={(e) => handleSignupInputChange("city", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Select value={signupData.state || ""} onValueChange={(value) => handleSignupInputChange("state", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map(state => (
                                  <SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="class">Education Level</Label>
                            <Select value={signupData.class || ""} onValueChange={(value) => handleSignupInputChange("class", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                {educationLevels.map(level => (
                                  <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stream">Stream (if applicable)</Label>
                            <Select value={signupData.stream || ""} onValueChange={(value) => handleSignupInputChange("stream", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stream" />
                              </SelectTrigger>
                              <SelectContent>
                                {streams.map(stream => (
                                  <SelectItem key={stream.value} value={stream.value}>{stream.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        {/* Password */}
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password *</Label>
                          <div className="relative">
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password (min 8 characters)"
                              value={signupData.password || ""}
                              onChange={(e) => handleSignupInputChange("password", e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password *</Label>
                          <div className="relative">
                            <Input
                              id="confirm-password"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              value={signupData.confirmPassword || ""}
                              onChange={(e) => handleSignupInputChange("confirmPassword", e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                          </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="space-y-3">
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="terms" 
                              checked={signupData.agreeToTerms || false}
                              onCheckedChange={(checked) => handleSignupInputChange("agreeToTerms", Boolean(checked))}
                              required 
                            />
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the <Button variant="link" className="p-0 h-auto text-sm" onClick={() => onNavigate("terms")}>Terms of Service</Button> and <Button variant="link" className="p-0 h-auto text-sm" onClick={() => onNavigate("privacy")}>Privacy Policy</Button> *
                            </Label>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <Checkbox 
                              id="newsletter" 
                              checked={signupData.subscribeNewsletter || false}
                              onCheckedChange={(checked) => handleSignupInputChange("subscribeNewsletter", Boolean(checked))}
                            />
                            <Label htmlFor="newsletter" className="text-sm">
                              Subscribe to newsletter for updates and career guidance tips
                            </Label>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isLoading || !signupData.agreeToTerms}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Creating Account...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}