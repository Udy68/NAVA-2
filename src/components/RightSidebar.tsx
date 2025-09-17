import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { toast } from "sonner@2.0.3";
import { 
  Home, 
  ClipboardList, 
  Building, 
  BookOpen, 
  Calendar, 
  GraduationCap,
  Briefcase,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users,
  LogOut
} from "lucide-react";

type Page = "home" | "assessment" | "colleges" | "courses" | "timeline" | "auth" | "scholarships" | "internships" | "dashboard" | "expert-guidance" | "stream-details";

interface RightSidebarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function RightSidebar({ currentPage, onNavigate, onCollapseChange, isAuthenticated = false, onLogout }: RightSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  const handleMobileNavigation = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { id: "home" as Page, label: "Home", icon: Home, description: "Dashboard overview" },
    { id: "dashboard" as Page, label: "My Dashboard", icon: BarChart3, description: "Personal insights" },
    { id: "assessment" as Page, label: "Career Assessment", icon: ClipboardList, description: "Discover your strengths" },
    { id: "colleges" as Page, label: "College Directory", icon: Building, description: "Find colleges nearby" },
    { id: "courses" as Page, label: "Course Mapping", icon: BookOpen, description: "Career pathways" },
    { id: "expert-guidance" as Page, label: "Expert Guidance", icon: Users, description: "Connect with mentors" },
    { id: "scholarships" as Page, label: "Scholarships", icon: GraduationCap, description: "Financial aid options" },
    { id: "internships" as Page, label: "Internships", icon: Briefcase, description: "Practical experience" },
    { id: "timeline" as Page, label: "Timeline Tracker", icon: Calendar, description: "Important dates" },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    toast.success("Successfully logged out. See you next time!");
  };

  // Handle scroll events to prevent main page scrolling
  const handleScrollStart = () => {
    setIsScrolling(true);
    document.body.style.overflow = 'hidden';
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed top-20 right-4 z-50 lg:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-200 rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-80 p-0 sidebar-scroll-container">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-left">Navigation</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            
            <div 
              className="flex-1 overflow-hidden"
              onMouseEnter={handleScrollStart}
              onMouseLeave={handleScrollEnd}
              onTouchStart={handleScrollStart}
              onTouchEnd={handleScrollEnd}
            >
              <ScrollArea className="h-full p-6 sidebar-scroll-area">
                <nav className="space-y-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start h-14 p-4"
                      onClick={() => handleMobileNavigation(item.id)}
                    >
                      <div className="flex items-center w-full">
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </nav>
              
              {/* Mobile Logout Button */}
              <Separator className="my-4" />
              <Button
                variant="ghost"
                className="w-full justify-start h-14 p-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <div className="flex items-center w-full">
                  <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Sign out of your account
                    </div>
                  </div>
                </div>
              </Button>
              </ScrollArea>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Career & Education Advisor
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Powered by AI
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar - Right Side */}
      <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-30 hidden lg:flex flex-col shadow-xl sidebar-scroll-container ${
        isCollapsed ? "w-16" : "w-80"
      }`}>
        <div className="flex flex-col h-full">
          {/* Header with collapse button */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Navigation
                  </h3>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCollapseToggle}
                className="h-8 w-8 p-0 ml-auto"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Scrollable Navigation Items */}
          <div 
            className="flex-1 overflow-hidden"
            onMouseEnter={handleScrollStart}
            onMouseLeave={handleScrollEnd}
            onTouchStart={handleScrollStart}
            onTouchEnd={handleScrollEnd}
          >
            <ScrollArea className="h-full p-4 sidebar-scroll-area">
              <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${
                      isCollapsed ? "h-12 px-2" : "h-16 p-4"
                    }`}
                    onClick={() => onNavigate(item.id)}
                    title={isCollapsed ? `${item.label} - ${item.description}` : undefined}
                  >
                    {isCollapsed ? (
                      <Icon className="h-5 w-5 mx-auto" />
                    ) : (
                      <div className="flex items-center w-full">
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <div className="text-left flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    )}
                  </Button>
                );
              })}
            </nav>
            
            {/* Logout Button */}
            <Separator className="my-4" />
            <Button
              variant="ghost"
              className={`w-full justify-start transition-all duration-200 hover:scale-[1.02] hover:shadow-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950 ${
                isCollapsed ? "h-12 px-2" : "h-16 p-4"
              }`}
              onClick={handleLogout}
              title={isCollapsed ? "Logout" : undefined}
            >
              {isCollapsed ? (
                <LogOut className="h-5 w-5 mx-auto" />
              ) : (
                <div className="flex items-center w-full">
                  <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div className="text-left flex-1">
                    <div className="font-medium">Logout</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Sign out of your account
                    </div>
                  </div>
                </div>
              )}
            </Button>

            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Career & Education Advisor
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Powered by AI
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}