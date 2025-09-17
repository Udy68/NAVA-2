import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTheme } from "./ThemeProvider";
import { 
  Home, 
  ClipboardList, 
  Building, 
  BookOpen, 
  Calendar, 
  LogIn,
  Moon,
  Sun,
  Laptop,
  GraduationCap,
  Briefcase,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Settings,
  Menu
} from "lucide-react";

type Page = "home" | "assessment" | "colleges" | "courses" | "timeline" | "auth" | "scholarships" | "internships" | "dashboard";

interface LeftSidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function LeftSidebar({ currentPage, onNavigate }: LeftSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleMobileNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: "home" as Page, label: "Home", icon: Home },
    { id: "dashboard" as Page, label: "Dashboard", icon: BarChart3 },
    { id: "assessment" as Page, label: "Career Assessment", icon: ClipboardList },
    { id: "colleges" as Page, label: "College Directory", icon: Building },
    { id: "courses" as Page, label: "Course Mapping", icon: BookOpen },
    { id: "scholarships" as Page, label: "Scholarships", icon: GraduationCap },
    { id: "internships" as Page, label: "Internships", icon: Briefcase },
    { id: "timeline" as Page, label: "Timeline Tracker", icon: Calendar },
  ];

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Laptop },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed top-4 left-4 z-50 lg:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <SheetTitle className="text-left">Nava</SheetTitle>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Career & Education Advisor
                  </p>
                </div>
              </div>
            </SheetHeader>
            
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-2 mb-6">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start h-12"
                      onClick={() => handleMobileNavigation(item.id)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    Appearance
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = theme === option.value;
                    
                    return (
                      <Button
                        key={option.value}
                        variant={isSelected ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-start h-8"
                        onClick={() => setTheme(option.value)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full justify-start mb-3"
                onClick={() => handleMobileNavigation("auth")}
              >
                <LogIn className="h-4 w-4 mr-3" />
                Login / Sign Up
              </Button>
              
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Government of Jammu and Kashmir
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 hidden lg:flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                {!isCollapsed && (
                  <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                    Nava
                  </span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="h-8 w-8 p-0"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {!isCollapsed && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Career & Education Advisor
              </p>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start h-10 ${isCollapsed ? "px-2" : ""}`}
                    onClick={() => onNavigate(item.id)}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                    {!isCollapsed && item.label}
                  </Button>
                );
              })}
            </nav>
            
            {!isCollapsed && (
              <>
                <Separator className="my-6" />
                
                {/* Theme Selection */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-gray-500" />
                    <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                      Appearance
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = theme === option.value;
                      
                      return (
                        <Button
                          key={option.value}
                          variant={isSelected ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start h-8"
                          onClick={() => setTheme(option.value)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with Auth */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <>
                <Button
                  variant="outline"
                  className="w-full justify-start mb-3"
                  onClick={() => onNavigate("auth")}
                >
                  <LogIn className="h-4 w-4 mr-3" />
                  Login / Sign Up
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Government of Jammu and Kashmir
                  </p>
                </div>
              </>
            )}
            
            {isCollapsed && (
              <Button
                variant="outline"
                size="sm"
                className="w-full p-2"
                onClick={() => onNavigate("auth")}
                title="Login / Sign Up"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}