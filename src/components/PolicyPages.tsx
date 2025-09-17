import { ArrowLeft, Shield, FileText, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type PolicyPage = "privacy" | "terms" | "help";

interface PolicyPagesProps {
  page: PolicyPage;
  onNavigate: (page: string) => void;
}

export function PolicyPages({ page, onNavigate }: PolicyPagesProps) {
  const getPageConfig = (page: PolicyPage) => {
    const configs = {
      privacy: {
        title: "Privacy Policy",
        icon: Shield,
        description: "How we protect and handle your personal information",
        content: [
          {
            heading: "Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, take assessments, or contact us for support. This may include your name, email address, educational background, and career preferences."
          },
          {
            heading: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, including personalized career recommendations, college suggestions, and educational content tailored to your interests and goals."
          },
          {
            heading: "Information Sharing",
            content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law. We may share aggregated, non-personally identifiable information for research and improvement purposes."
          },
          {
            heading: "Data Security",
            content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure."
          },
          {
            heading: "Your Rights",
            content: "You have the right to access, update, or delete your personal information. You can also opt out of certain communications from us. Contact us at privacy@careeradvisor.gov.in for any privacy-related requests."
          }
        ]
      },
      terms: {
        title: "Terms of Service",
        icon: FileText,
        description: "Terms and conditions for using our platform",
        content: [
          {
            heading: "Acceptance of Terms",
            content: "By accessing and using the Career Advisor platform, you accept and agree to be bound by the terms and provision of this agreement. This is a Government of India initiative under the Digital India program."
          },
          {
            heading: "Use License",
            content: "Permission is granted to temporarily use this platform for personal, non-commercial educational purposes. This license does not include the right to download or modify the platform or any portion of it."
          },
          {
            heading: "User Account",
            content: "When creating an account, you must provide accurate and complete information. You are responsible for safeguarding your password and all activities under your account."
          },
          {
            heading: "Prohibited Uses",
            content: "You may not use our platform for any unlawful purpose or to solicit others to perform unlawful acts, violate any intellectual property rights, or transmit any harmful or malicious content."
          },
          {
            heading: "Disclaimer",
            content: "The information provided on this platform is for educational purposes only. While we strive for accuracy, career and educational guidance should be supplemented with professional counseling and personal research."
          },
          {
            heading: "Limitation of Liability",
            content: "The Government of India, its departments, and platform operators shall not be liable for any damages arising from the use of this platform, including but not limited to direct, indirect, incidental, or consequential damages."
          }
        ]
      },
      help: {
        title: "Help & Support",
        icon: HelpCircle,
        description: "Frequently asked questions and support resources",
        content: [
          {
            heading: "Getting Started",
            content: "To begin your career journey, create an account and take our comprehensive aptitude assessment. This will help us provide personalized recommendations based on your interests, skills, and academic background."
          },
          {
            heading: "Using the Assessment Tool",
            content: "Our assessment includes questions about your interests, aptitudes, and career preferences. Answer honestly for the most accurate results. The assessment takes about 15-20 minutes to complete."
          },
          {
            heading: "Understanding Recommendations",
            content: "Our AI-powered system analyzes your assessment results, academic background, and career goals to suggest suitable courses, colleges, and career paths. These are recommendations to guide your decision-making process."
          },
          {
            heading: "College Directory",
            content: "Search and filter colleges by location, courses offered, fees, and other criteria. Each college profile includes detailed information about admissions, facilities, and placement records."
          },
          {
            heading: "Scholarship Information",
            content: "Browse available scholarships with eligibility criteria, application deadlines, and required documents. Set up alerts to never miss an opportunity."
          },
          {
            heading: "Technical Issues",
            content: "If you experience technical difficulties, try refreshing your browser, clearing cache, or using a different browser. For persistent issues, contact our technical support team."
          },
          {
            heading: "Contact Support",
            content: "For additional help, email us at support@careeradvisor.gov.in or call our helpline at +91 11 2958-1240. Our support team is available Monday to Friday, 9 AM to 6 PM IST."
          }
        ]
      }
    };
    return configs[page];
  };

  const config = getPageConfig(page);
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate("home")}
              className="h-10 w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {config.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {config.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {config.content.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.heading}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Need More Help?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Our support team is here to assist you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-800">
                  Email Support
                </Button>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-800">
                  Call Helpline
                </Button>
                <Button onClick={() => onNavigate("home")} className="bg-blue-600 text-white hover:bg-blue-700">
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Last updated: January 2025 | Government of India Initiative
        </div>
      </div>
    </div>
  );
}