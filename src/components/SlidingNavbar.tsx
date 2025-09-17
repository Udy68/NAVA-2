import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { useTheme } from "./ThemeProvider";
import { 
  Menu, 
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
  BarChart3
} from "lucide-react";

type Page = "home" | "assessment" | "colleges" | "courses" | "timeline" | "auth" | "scholarships" | "internships" | "dashboard";

interface SlidingNavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function SlidingNavbar({ currentPage, onNavigate }: SlidingNavbarProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="text-left">Navigation</SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 px-6 pb-6">
            {/* Navigation Items */}
            <div className="space-y-2 mb-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start h-12"
                    onClick={() => handleNavigation(item.id)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
            
            <Separator className="my-6" />
            
            {/* Theme Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Appearance
              </h3>
              
              <div className="space-y-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = theme === option.value;
                  
                  return (
                    <div 
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <Button
                        variant={isSelected ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setTheme(option.value)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {option.label}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Auth Section */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">
                Account
              </h3>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation("auth")}
              >
                <LogIn className="h-4 w-4 mr-3" />
                Login / Sign Up
              </Button>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 pt-0 border-t">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Nava - Career & Education Advisor
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              Government of Jammu and Kashmir
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}