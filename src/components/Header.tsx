import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

import { useTheme } from "./ThemeProvider";
import { useToast } from "./ToastProvider";
import { BookOpen, LogIn, Moon, Sun, Laptop, Search, Bell, X, User, Settings, LogOut, GraduationCap, MapPin, Clock, Award, Briefcase, Brain, Users, TrendingUp } from "lucide-react";

type Page = "home" | "assessment" | "colleges" | "courses" | "timeline" | "auth" | "scholarships" | "internships" | "dashboard" | "expert-guidance" | "facebook" | "twitter" | "instagram" | "linkedin" | "privacy" | "terms" | "help" | "stream-details";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  isAuthenticated?: boolean;
  userProfile?: any;
}

export function Header({ currentPage, onNavigate, isAuthenticated = false, userProfile }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3); // Mock notification count
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Comprehensive search data
  const searchData = [
    // Colleges
    { type: "college", title: "Government Medical College, Srinagar", description: "MBBS, MD programs", category: "Medical College", page: "colleges", icon: GraduationCap },
    { type: "college", title: "National Institute of Technology, Srinagar", description: "Engineering programs", category: "Engineering College", page: "colleges", icon: GraduationCap },
    { type: "college", title: "University of Kashmir", description: "Various undergraduate and postgraduate programs", category: "State University", page: "colleges", icon: GraduationCap },
    { type: "college", title: "Government College for Women, Srinagar", description: "Arts, Commerce, Science programs", category: "Arts & Science College", page: "colleges", icon: GraduationCap },
    { type: "college", title: "Islamia College of Science & Commerce", description: "Commerce and Science programs", category: "Commerce College", page: "colleges", icon: GraduationCap },
    
    // Courses & Careers
    { type: "course", title: "Computer Science Engineering", description: "Software development, AI, machine learning", category: "Engineering", page: "courses", icon: Brain },
    { type: "course", title: "Medicine (MBBS)", description: "Medical practice, healthcare", category: "Medical", page: "courses", icon: Brain },
    { type: "course", title: "Business Administration", description: "Management, entrepreneurship", category: "Business", page: "courses", icon: Brain },
    { type: "course", title: "Chartered Accountancy", description: "Finance, accounting, taxation", category: "Finance", page: "courses", icon: Brain },
    { type: "course", title: "Civil Engineering", description: "Infrastructure, construction", category: "Engineering", page: "courses", icon: Brain },
    
    // Scholarships
    { type: "scholarship", title: "Merit-cum-Means Scholarship", description: "For economically weaker students", category: "Financial Aid", page: "scholarships", icon: Award },
    { type: "scholarship", title: "Post Matric Scholarship", description: "For students pursuing higher education", category: "Government Scholarship", page: "scholarships", icon: Award },
    { type: "scholarship", title: "National Scholarship Portal", description: "Central government scholarships", category: "Government Scholarship", page: "scholarships", icon: Award },
    { type: "scholarship", title: "J&K State Scholarship", description: "State government financial assistance", category: "State Scholarship", page: "scholarships", icon: Award },
    
    // Internships
    { type: "internship", title: "Software Development Intern", description: "Tech companies, startups", category: "Technology", page: "internships", icon: Briefcase },
    { type: "internship", title: "Medical Research Intern", description: "Hospitals, research institutes", category: "Healthcare", page: "internships", icon: Briefcase },
    { type: "internship", title: "Banking Intern", description: "Banks, financial institutions", category: "Finance", page: "internships", icon: Briefcase },
    { type: "internship", title: "Teaching Assistant", description: "Schools, colleges", category: "Education", page: "internships", icon: Briefcase },
    
    // Assessment & Tools
    { type: "tool", title: "Career Assessment Quiz", description: "Discover your interests and aptitude", category: "Assessment", page: "assessment", icon: Brain },
    { type: "tool", title: "College Directory", description: "Search and compare colleges", category: "Directory", page: "colleges", icon: MapPin },
    { type: "tool", title: "Course Career Mapping", description: "Visualize career paths", category: "Planning", page: "courses", icon: TrendingUp },
    { type: "tool", title: "Timeline Tracker", description: "Track admission deadlines", category: "Planning", page: "timeline", icon: Clock },
    { type: "tool", title: "Expert Guidance", description: "Connect with career counselors", category: "Guidance", page: "expert-guidance", icon: Users },
    
    // Admission Dates & Timelines
    { type: "timeline", title: "NEET Application", description: "Medical entrance exam", category: "Medical Entrance", page: "timeline", icon: Clock },
    { type: "timeline", title: "JEE Main Registration", description: "Engineering entrance exam", category: "Engineering Entrance", page: "timeline", icon: Clock },
    { type: "timeline", title: "University Admissions", description: "State university applications", category: "University Admission", page: "timeline", icon: Clock },
    { type: "timeline", title: "Scholarship Deadlines", description: "Various scholarship applications", category: "Scholarship", page: "timeline", icon: Clock },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  // Search functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = searchData.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // If there's a direct match, navigate to the first result
      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        onNavigate(firstResult.page as any);
        addToast({
          type: 'success',
          title: 'Search Result',
          description: `Found: ${firstResult.title}`,
          duration: 3000
        });
      } else {
        // Fallback to basic keyword search
        const query = searchQuery.toLowerCase();
        if (query.includes('college') || query.includes('university')) {
          onNavigate('colleges');
        } else if (query.includes('course') || query.includes('career')) {
          onNavigate('courses');
        } else if (query.includes('assessment') || query.includes('quiz')) {
          onNavigate('assessment');
        } else if (query.includes('scholarship')) {
          onNavigate('scholarships');
        } else if (query.includes('internship')) {
          onNavigate('internships');
        } else if (query.includes('expert') || query.includes('guidance') || query.includes('mentor')) {
          onNavigate('expert-guidance');
        } else {
          addToast({
            type: 'info',
            title: 'No Results',
            description: `No results found for "${searchQuery}". Try different keywords.`,
            duration: 3000
          });
        }
      }
      setSearchQuery("");
      setShowMobileSearch(false);
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (result: any) => {
    onNavigate(result.page as any);
    addToast({
      type: 'success',
      title: 'Navigating',
      description: `Opening ${result.title}`,
      duration: 2000
    });
    setSearchQuery("");
    setShowSearchResults(false);
    setShowMobileSearch(false);
  };

  const handleNotificationClick = () => {
    addToast({
      type: 'info',
      title: 'Notifications',
      description: 'You have 3 new notifications: Assessment complete, New scholarships available, College application deadline reminder.',
      duration: 5000
    });
  };

  const handleLogout = () => {
    // Clear localStorage and redirect to auth
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    addToast({
      type: 'success',
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      duration: 3000
    });
    onNavigate('auth');
  };

  const getUserInitials = () => {
    if (userProfile && userProfile.firstName && userProfile.lastName) {
      return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
    }
    return "U";
  };



  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 z-40 shadow-sm dark:shadow-gray-900/20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Nava Logo */}
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-200" 
            onClick={() => onNavigate("home")}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nava
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Career & Education Advisor
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8" ref={searchRef}>
            <div className="relative w-full">
              <form onSubmit={handleSearch} className="relative w-full group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search courses, colleges, careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-3 w-full border border-gray-200/60 dark:border-gray-700/60 rounded-2xl bg-gray-50/80 dark:bg-gray-800/80 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-300 dark:focus:border-blue-600 transition-all duration-300 shadow-sm focus:shadow-md"
                  onFocus={() => searchQuery.trim().length > 1 && setShowSearchResults(true)}
                />
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                  <CardContent className="p-2">
                    <ScrollArea className="max-h-96">
                      <div className="space-y-1">
                        {searchResults.map((result, index) => {
                          const IconComponent = result.icon;
                          return (
                            <div
                              key={index}
                              onClick={() => handleSearchResultClick(result)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                            >
                              <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                                <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                  {result.title}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {result.description}
                                </p>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {result.category}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 md:hidden"
              title="Search"
            >
              {showMobileSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotificationClick}
                className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-lg">
                    {notifications}
                  </div>
                )}
              </Button>
            </div>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              title={`Current theme: ${theme}`}
            >
              <div className="transition-transform duration-300 hover:scale-110">
                {getThemeIcon()}
              </div>
            </Button>

            {/* Authentication Section */}
            {isAuthenticated && userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.firstName} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userProfile.firstName} {userProfile.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userProfile.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => onNavigate("auth")}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-2 font-medium"
              >
                <LogIn className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl">
            <div className="px-4 py-4">
              <div className="relative">
                <form onSubmit={handleSearch} className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <Input
                    type="text"
                    placeholder="Search courses, colleges, careers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 pr-4 py-3 w-full border border-gray-200/60 dark:border-gray-700/60 rounded-2xl bg-gray-50/80 dark:bg-gray-800/80 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-300 dark:focus:border-blue-600 transition-all duration-300 shadow-sm focus:shadow-md"
                    autoFocus
                    onFocus={() => searchQuery.trim().length > 1 && setShowSearchResults(true)}
                  />
                </form>
                
                {/* Mobile Search Results */}
                {showSearchResults && searchResults.length > 0 && (
                  <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                    <CardContent className="p-2">
                      <ScrollArea className="max-h-80">
                        <div className="space-y-1">
                          {searchResults.map((result, index) => {
                            const IconComponent = result.icon;
                            return (
                              <div
                                key={index}
                                onClick={() => handleSearchResultClick(result)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200 group"
                              >
                                <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                                  <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                                    {result.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {result.description}
                                  </p>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {result.category}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}