import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Calendar, 
  Bell, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Trophy,
  Target,
  Settings,
  Filter,
  ChevronRight,
  Star
} from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: "admission" | "scholarship" | "internship" | "exam" | "deadline";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  eligibility: string[];
  link?: string;
  status: "upcoming" | "ongoing" | "passed" | "registered";
  daysUntil: number;
}

interface UserPreferences {
  interestedStreams: string[];
  careerGoals: string[];
  notifications: {
    admissions: boolean;
    scholarships: boolean;
    internships: boolean;
    exams: boolean;
  };
  alertTiming: number; // days before event
}

export function TimelineTracker() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interestedStreams: ["engineering", "medical"],
    careerGoals: ["software-engineer", "data-scientist"],
    notifications: {
      admissions: true,
      scholarships: true,
      internships: true,
      exams: true,
    },
    alertTiming: 7
  });
  const [activeAlerts, setActiveAlerts] = useState<TimelineEvent[]>([]);

  // Mock timeline events - in real app, this would come from API
  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      title: "JEE Main 2025 Application",
      description: "Joint Entrance Examination for Engineering Admissions",
      date: new Date("2024-12-15"),
      endDate: new Date("2025-01-15"),
      type: "admission",
      priority: "high",
      category: "Engineering",
      eligibility: ["12th-science", "pcm"],
      link: "https://jeemain.nta.nic.in",
      status: "upcoming",
      daysUntil: 45
    },
    {
      id: "2",
      title: "NEET UG 2025 Registration",
      description: "National Eligibility cum Entrance Test for Medical",
      date: new Date("2024-12-01"),
      endDate: new Date("2024-12-31"),
      type: "admission",
      priority: "urgent",
      category: "Medical",
      eligibility: ["12th-science", "pcb"],
      link: "https://neet.nta.nic.in",
      status: "ongoing",
      daysUntil: 15
    },
    {
      id: "3",
      title: "PM Special Scholarship Scheme",
      description: "Scholarship for J&K students studying outside the state",
      date: new Date("2024-11-20"),
      endDate: new Date("2025-01-20"),
      type: "scholarship",
      priority: "high",
      category: "General",
      eligibility: ["jk-domicile", "outside-state"],
      link: "https://scholarships.gov.in",
      status: "ongoing",
      daysUntil: 10
    },
    {
      id: "4",
      title: "Google Summer Internship 2025",
      description: "Software Engineering Internship Program",
      date: new Date("2024-12-01"),
      endDate: new Date("2025-02-15"),
      type: "internship",
      priority: "medium",
      category: "Technology",
      eligibility: ["engineering-student", "computer-science"],
      link: "https://careers.google.com",
      status: "upcoming",
      daysUntil: 30
    },
    {
      id: "5",
      title: "GATE 2025 Registration",
      description: "Graduate Aptitude Test in Engineering",
      date: new Date("2024-08-15"),
      endDate: new Date("2024-10-15"),
      type: "exam",
      priority: "medium",
      category: "Engineering",
      eligibility: ["engineering-graduate"],
      status: "passed",
      daysUntil: -30
    },
    {
      id: "6",
      title: "Microsoft Internship Program",
      description: "Software Development and Data Science Roles",
      date: new Date("2024-11-25"),
      endDate: new Date("2025-01-31"),
      type: "internship",
      priority: "high",
      category: "Technology",
      eligibility: ["engineering-student", "computer-science", "data-science"],
      link: "https://careers.microsoft.com",
      status: "ongoing",
      daysUntil: 5
    },
    {
      id: "7",
      title: "National Talent Search Examination",
      description: "Scholarship examination for class X students",
      date: new Date("2024-11-15"),
      type: "scholarship",
      priority: "medium",
      category: "Academic",
      eligibility: ["class-10", "merit-based"],
      status: "passed",
      daysUntil: -5
    },
    {
      id: "8",
      title: "AIIMS MBBS Admission 2025",
      description: "All Institute of Medical Sciences Entrance",
      date: new Date("2025-01-15"),
      endDate: new Date("2025-02-28"),
      type: "admission",
      priority: "high",
      category: "Medical",
      eligibility: ["12th-science", "pcb", "neet-qualified"],
      link: "https://aiims.edu",
      status: "upcoming",
      daysUntil: 60
    }
  ];

  // Filter events based on user preferences and active filters
  const getFilteredEvents = () => {
    let filtered = timelineEvents;

    // Filter by user preferences
    if (userPreferences.interestedStreams.length > 0) {
      filtered = filtered.filter(event => {
        const categoryMatch = userPreferences.interestedStreams.some(stream => 
          event.category.toLowerCase().includes(stream) || 
          event.eligibility.some(req => req.includes(stream))
        );
        return categoryMatch;
      });
    }

    // Filter by selected filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(event => event.type === selectedFilter);
    }

    return filtered.sort((a, b) => a.daysUntil - b.daysUntil);
  };

  // Generate personalized alerts
  useEffect(() => {
    const alerts = timelineEvents.filter(event => {
      const isRelevant = userPreferences.interestedStreams.some(stream =>
        event.category.toLowerCase().includes(stream) ||
        event.eligibility.some(req => req.includes(stream))
      );
      const isWithinAlertWindow = event.daysUntil <= userPreferences.alertTiming && event.daysUntil >= 0;
      const notificationEnabled = userPreferences.notifications[event.type as keyof typeof userPreferences.notifications];
      
      return isRelevant && isWithinAlertWindow && notificationEnabled;
    });
    
    setActiveAlerts(alerts);
  }, [userPreferences]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming": return <Clock className="h-4 w-4" />;
      case "ongoing": return <Target className="h-4 w-4 text-green-600" />;
      case "passed": return <CheckCircle className="h-4 w-4 text-gray-500" />;
      case "registered": return <Star className="h-4 w-4 text-blue-600" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "admission": return <GraduationCap className="h-5 w-5" />;
      case "scholarship": return <Trophy className="h-5 w-5" />;
      case "internship": return <Briefcase className="h-5 w-5" />;
      case "exam": return <BookOpen className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Timeline Tracker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Never miss important deadlines with personalized alerts and reminders
          </p>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-500" />
              Active Alerts ({activeAlerts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeAlerts.map((alert) => (
                <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{alert.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {alert.daysUntil === 0 ? "Today" : `${alert.daysUntil} days left`}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters and Preferences */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stream Interests */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Interested Streams</Label>
                  <div className="space-y-2">
                    {["engineering", "medical", "commerce", "arts"].map((stream) => (
                      <div key={stream} className="flex items-center space-x-2">
                        <Switch
                          checked={userPreferences.interestedStreams.includes(stream)}
                          onCheckedChange={(checked) => {
                            setUserPreferences(prev => ({
                              ...prev,
                              interestedStreams: checked 
                                ? [...prev.interestedStreams, stream]
                                : prev.interestedStreams.filter(s => s !== stream)
                            }));
                          }}
                        />
                        <Label className="capitalize">{stream}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Notifications</Label>
                  <div className="space-y-2">
                    {Object.entries(userPreferences.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) => {
                            setUserPreferences(prev => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [key]: checked
                              }
                            }));
                          }}
                        />
                        <Label className="capitalize">{key}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Timing */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Alert me</Label>
                  <Select 
                    value={userPreferences.alertTiming.toString()} 
                    onValueChange={(value) => setUserPreferences(prev => ({
                      ...prev,
                      alertTiming: parseInt(value)
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                      <SelectItem value="14">2 weeks before</SelectItem>
                      <SelectItem value="30">1 month before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline Events */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Timeline Events</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="admission">Admissions</SelectItem>
                        <SelectItem value="scholarship">Scholarships</SelectItem>
                        <SelectItem value="internship">Internships</SelectItem>
                        <SelectItem value="exam">Exams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                        event.status === "ongoing" 
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                          : event.status === "passed"
                          ? "border-gray-300 bg-gray-50 dark:bg-gray-800 opacity-60"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.type === "admission" ? "bg-blue-100 text-blue-600" :
                            event.type === "scholarship" ? "bg-yellow-100 text-yellow-600" :
                            event.type === "internship" ? "bg-purple-100 text-purple-600" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            {getTypeIcon(event.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {event.title}
                              </h3>
                              {getStatusIcon(event.status)}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {event.category}
                              </Badge>
                              {event.eligibility.slice(0, 2).map((req, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {req.replace("-", " ")}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.endDate 
                                  ? `${event.date.toLocaleDateString()} - ${event.endDate.toLocaleDateString()}`
                                  : event.date.toLocaleDateString()
                                }
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={`text-xs ${getPriorityColor(event.priority)}`}>
                                  {event.priority}
                                </Badge>
                                {event.daysUntil >= 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {event.daysUntil === 0 ? "Today" : `${event.daysUntil}d`}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {event.link && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={event.link} target="_blank" rel="noopener noreferrer">
                                Apply
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No events found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Try adjusting your filters or preferences to see more events.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}