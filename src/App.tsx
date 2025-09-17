import { useState, useEffect } from "react";
import { PageType, NavigationParams, UserProfile } from "./types";
import { userService } from "./services/userService";
import { Header } from "./components/Header";
import { RightSidebar } from "./components/RightSidebar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StatsSection } from "./components/StatsSection";
import { AssessmentPreview } from "./components/AssessmentPreview";
import { CostApproximation } from "./components/CostApproximation";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { AssessmentQuiz } from "./components/AssessmentQuiz";
import { CollegeDirectory } from "./components/CollegeDirectory";
import { AuthPages } from "./components/AuthPages";
import { ScholarshipCards } from "./components/ScholarshipCards";
import { InternshipCards } from "./components/InternshipCards";
import { MovableChatbot } from "./components/MovableChatbot";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/ToastProvider";
import { CourseCareerMapping } from "./components/CourseCareerMapping";
import { TimelineTracker } from "./components/TimelineTracker";
import { PersonalizedDashboard } from "./components/PersonalizedDashboard";
import { ExpertGuidance } from "./components/ExpertGuidance";
import { SocialMediaPages } from "./components/SocialMediaPages";
import { PolicyPages } from "./components/PolicyPages";
import { StreamDetails } from "./components/StreamDetails";
import { StreamAssessment } from "./components/StreamAssessment";
import { StreamAssessmentPromo } from "./components/StreamAssessmentPromo";
import { AIRecommendations } from "./components/AIRecommendations";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [navigationParams, setNavigationParams] = useState<NavigationParams>({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      
      try {
        const isAuth = userService.isAuthenticated();
        const currentUser = userService.getCurrentUser();

        if (isAuth && currentUser) {
          setIsAuthenticated(true);
          setUserProfile(currentUser);
        } else {
          setIsAuthenticated(false);
          setUserProfile(null);
          // Clear any stale data
          userService.logout();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle successful authentication
  const handleAuthSuccess = (profile: UserProfile) => {
    setIsAuthenticated(true);
    setUserProfile(profile);
    setCurrentPage("dashboard");
    setNavigationParams({});
  };

  // Handle navigation with parameters
  const handleNavigateWithParams = (page: PageType, params?: NavigationParams) => {
    setCurrentPage(page);
    setNavigationParams(params || {});
  };

  // Handle logout
  const handleLogout = () => {
    userService.logout();
    setIsAuthenticated(false);
    setUserProfile(null);
    setCurrentPage("home");
    setNavigationParams({});
  };

  const renderPage = () => {
    switch (currentPage) {
      case "assessment":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Career Aptitude Assessment
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover your interests and strengths to find
                  the perfect career path
                </p>
              </div>
              <AssessmentQuiz onNavigate={handleNavigateWithParams} />
            </div>
          </div>
        );
      case "stream-assessment":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <StreamAssessment onNavigate={handleNavigateWithParams} />
            </div>
          </div>
        );
      case "colleges":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <CollegeDirectory />
          </div>
        );
      case "scholarships":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <ScholarshipCards />
          </div>
        );
      case "internships":
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <InternshipCards />
          </div>
        );
      case "courses":
        return <CourseCareerMapping filter={navigationParams.filter} stream={navigationParams.stream} onNavigate={handleNavigateWithParams} />;
      case "timeline":
        return <TimelineTracker />;
      case "dashboard":
        return (
          <PersonalizedDashboard onNavigate={handleNavigateWithParams} />
        );
      case "expert-guidance":
        return <ExpertGuidance />;
      case "ai-recommendations":
        return <AIRecommendations onNavigate={handleNavigateWithParams} />;
      case "facebook":
        return (
          <SocialMediaPages
            platform="facebook"
            onNavigate={setCurrentPage}
          />
        );
      case "twitter":
        return (
          <SocialMediaPages
            platform="twitter"
            onNavigate={setCurrentPage}
          />
        );
      case "instagram":
        return (
          <SocialMediaPages
            platform="instagram"
            onNavigate={setCurrentPage}
          />
        );
      case "linkedin":
        return (
          <SocialMediaPages
            platform="linkedin"
            onNavigate={setCurrentPage}
          />
        );
      case "privacy":
        return (
          <PolicyPages
            page="privacy"
            onNavigate={setCurrentPage}
          />
        );
      case "terms":
        return (
          <PolicyPages
            page="terms"
            onNavigate={setCurrentPage}
          />
        );
      case "help":
        return (
          <PolicyPages
            page="help"
            onNavigate={setCurrentPage}
          />
        );
      case "stream-details":
        // Ensure we have a valid stream parameter
        const validStream = navigationParams.stream && 
          ["science", "commerce", "arts"].includes(navigationParams.stream) 
          ? navigationParams.stream as "science" | "commerce" | "arts"
          : "science";
        
        return (
          <StreamDetails
            stream={validStream}
            onNavigate={setCurrentPage}
          />
        );
      case "auth":
        return (
          <AuthPages
            onNavigate={setCurrentPage}
            onAuthSuccess={handleAuthSuccess}
          />
        );
      default:
        return (
          <>
            <HeroSection onNavigate={handleNavigateWithParams} />
            <StreamAssessmentPromo onNavigate={handleNavigateWithParams} />
            <FeaturesSection onNavigate={handleNavigateWithParams} />
            <StatsSection />
            <AssessmentPreview onNavigate={handleNavigateWithParams} />
            <CostApproximation />
            <CTASection onNavigate={handleNavigateWithParams} />
          </>
        );
    }
  };

  const isSpecialPage = [
    "auth",
    "ai-recommendations",
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "privacy",
    "terms",
    "help",
    "stream-details",
  ].includes(currentPage);

  // Loading screen
  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="nava-theme">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <h2 className="text-xl font-semibold text-foreground">Loading Nava...</h2>
            <p className="text-muted-foreground">Preparing your personalized career guidance</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      defaultTheme="system"
      storageKey="nava-theme"
    >
      <ToastProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200 ease-out">
          {/* Header - shown on all pages except special ones */}
          {!isSpecialPage && (
            <Header
              currentPage={currentPage}
              onNavigate={handleNavigateWithParams}
              isAuthenticated={isAuthenticated}
              userProfile={userProfile}
            />
          )}

          <div className="flex">
            {/* Main Content */}
            <div
              className={`flex-1 ${!isSpecialPage ? `${isSidebarCollapsed ? "lg:mr-16" : "lg:mr-80"} pt-16` : ""} transition-all duration-300 ease-in-out`}
            >
              {renderPage()}
              {!isSpecialPage && (
                <Footer onNavigate={setCurrentPage} />
              )}
            </div>

            {/* Right Sidebar - shown on all pages except special ones */}
            {!isSpecialPage && (
              <RightSidebar
                currentPage={currentPage}
                onNavigate={handleNavigateWithParams}
                onCollapseChange={setIsSidebarCollapsed}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Movable AI Chatbot - shown on all pages except special ones */}
          {!isSpecialPage && <MovableChatbot />}
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}