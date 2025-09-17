import { ArrowLeft, ExternalLink, Users, MessageCircle, Heart, Share } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type SocialPlatform = "facebook" | "twitter" | "instagram" | "linkedin";

interface SocialMediaPagesProps {
  platform: SocialPlatform;
  onNavigate: (page: string) => void;
}

export function SocialMediaPages({ platform, onNavigate }: SocialMediaPagesProps) {
  const getPlatformConfig = (platform: SocialPlatform) => {
    const configs = {
      facebook: {
        name: "Facebook",
        color: "bg-blue-600",
        textColor: "text-blue-600",
        description: "Connect with students, share career guidance, and join educational communities.",
        followers: "125K",
        posts: "2,340",
        content: [
          {
            type: "post",
            title: "Career Fair 2025 - Government Colleges",
            description: "Join us for the largest career fair featuring 200+ government colleges and universities. Register now!",
            engagement: "1.2K likes • 340 comments",
            time: "2 hours ago"
          },
          {
            type: "video",
            title: "How to Choose Your Stream After 12th",
            description: "Our career counselors explain the key factors to consider when choosing between Science, Commerce, and Arts.",
            engagement: "5.8K views • 890 likes",
            time: "1 day ago"
          },
          {
            type: "event",
            title: "Live Q&A: Engineering vs Medical Career Paths",
            description: "Join our live session with industry experts discussing career prospects in engineering and medical fields.",
            engagement: "450 interested • 120 going",
            time: "Tomorrow at 6 PM"
          }
        ]
      },
      twitter: {
        name: "Twitter",
        color: "bg-black",
        textColor: "text-black",
        description: "Stay updated with latest education trends, government schemes, and career opportunities.",
        followers: "89K",
        posts: "15.2K",
        content: [
          {
            type: "tweet",
            title: "🚀 Breaking: New scholarship scheme announced for J&K students",
            description: "Government launches ₹500 crore scholarship program for technical education. Applications open from March 1st. #JKEducation #Scholarships",
            engagement: "245 retweets • 680 likes",
            time: "3 hours ago"
          },
          {
            type: "thread",
            title: "🧵 Thread: Top 10 emerging careers in 2025",
            description: "1. AI/ML Engineer 2. Data Scientist 3. Cybersecurity Specialist 4. Green Energy Technician... (1/10)",
            engagement: "1.1K retweets • 2.3K likes",
            time: "6 hours ago"
          },
          {
            type: "quote",
            title: "\"Education is the most powerful weapon...\"",
            description: "Retweeting @EducationMinistry's inspirational quote about the power of education in transforming lives.",
            engagement: "89 retweets • 234 likes",
            time: "1 day ago"
          }
        ]
      },
      instagram: {
        name: "Instagram",
        color: "bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-600",
        textColor: "text-pink-600",
        description: "Visual career guidance, student success stories, and behind-the-scenes content.",
        followers: "156K",
        posts: "1,890",
        content: [
          {
            type: "reel",
            title: "Day in the Life: Engineering Student",
            description: "Follow Priya, a CSE student at NIT Srinagar, through her typical day of classes, projects, and campus life.",
            engagement: "12.3K views • 890 likes",
            time: "4 hours ago"
          },
          {
            type: "carousel",
            title: "Career Salary Guide 2025 📊",
            description: "Swipe to see average starting salaries across different fields: Engineering, Medical, Commerce, Arts, and more!",
            engagement: "2.1K likes • 156 comments",
            time: "1 day ago"
          },
          {
            type: "story-highlight",
            title: "Success Stories 🌟",
            description: "Real stories from students who transformed their careers using our platform. Inspiring journeys await!",
            engagement: "5.6K views",
            time: "2 days ago"
          }
        ]
      },
      linkedin: {
        name: "LinkedIn",
        color: "bg-blue-700",
        textColor: "text-blue-700",
        description: "Professional network for career development, industry insights, and networking opportunities.",
        followers: "67K",
        posts: "890",
        content: [
          {
            type: "article",
            title: "Future of Work: Skills That Will Define Careers in 2030",
            description: "A comprehensive analysis of emerging skills and how students can prepare for the jobs of tomorrow...",
            engagement: "1.8K reactions • 340 comments",
            time: "2 days ago"
          },
          {
            type: "job-post",
            title: "Hiring: Graduate Trainee Program - Multiple Positions",
            description: "Leading PSU companies are hiring fresh graduates across engineering, management, and finance domains.",
            engagement: "450 applications • 2.1K views",
            time: "3 days ago"
          },
          {
            type: "industry-update",
            title: "Government Initiative: Digital India 2.0 Impact on Career Opportunities",
            description: "How the new digital transformation initiatives are creating unprecedented opportunities for young professionals.",
            engagement: "890 reactions • 125 shares",
            time: "1 week ago"
          }
        ]
      }
    };
    return configs[platform];
  };

  const config = getPlatformConfig(platform);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onNavigate("home")}
                className="h-10 w-10"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Career Advisor on {config.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {config.description}
                </p>
              </div>
            </div>
            <Button className={`${config.color} text-white hover:opacity-90`}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className={`w-20 h-20 ${config.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white text-2xl font-bold">CA</span>
                </div>
                <CardTitle>@CareerAdvisorIN</CardTitle>
                <CardDescription>Official Government Career Guidance Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${config.textColor}`}>
                      {config.followers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Followers
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${config.textColor}`}>
                      {config.posts}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Posts
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">#CareerGuidance</Badge>
                  <Badge variant="secondary">#JKEducation</Badge>
                  <Badge variant="secondary">#Scholarships</Badge>
                  <Badge variant="secondary">#EngineeringCareers</Badge>
                  <Badge variant="secondary">#GovernmentJobs</Badge>
                  <Badge variant="secondary">#StudentSuccess</Badge>
                  <Badge variant="secondary">#DigitalIndia</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {config.content.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className={config.textColor}>
                            {item.type.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {item.time}
                          </span>
                        </div>
                        <CardTitle className="text-lg mb-2">
                          {item.title}
                        </CardTitle>
                        <CardDescription>
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{item.engagement}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Start Your Career Journey?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Follow us on {config.name} for daily career tips, educational updates, and success stories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className={`${config.color} text-white hover:opacity-90`}>
                      <Users className="h-4 w-4 mr-2" />
                      Follow on {config.name}
                    </Button>
                    <Button variant="outline" onClick={() => onNavigate("home")}>
                      Return to Platform
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}