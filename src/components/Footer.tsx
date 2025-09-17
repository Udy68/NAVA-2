import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-semibold">Nava</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering students to make informed career and education decisions through personalized guidance and comprehensive resources.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                onClick={() => onNavigate?.("facebook")}
              />
              <Twitter 
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                onClick={() => onNavigate?.("twitter")}
              />
              <Instagram 
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                onClick={() => onNavigate?.("instagram")}
              />
              <Linkedin 
                className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" 
                onClick={() => onNavigate?.("linkedin")}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate?.("assessment")} className="text-gray-400 hover:text-white transition-colors text-left">Aptitude Assessment</button></li>
              <li><button onClick={() => onNavigate?.("courses")} className="text-gray-400 hover:text-white transition-colors text-left">Course Recommendations</button></li>
              <li><button onClick={() => onNavigate?.("colleges")} className="text-gray-400 hover:text-white transition-colors text-left">College Directory</button></li>
              <li><button onClick={() => onNavigate?.("courses")} className="text-gray-400 hover:text-white transition-colors text-left">Career Paths</button></li>
              <li><button onClick={() => onNavigate?.("timeline")} className="text-gray-400 hover:text-white transition-colors text-left">Timeline Tracker</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate?.("courses")} className="text-gray-400 hover:text-white transition-colors text-left">Study Materials</button></li>
              <li><button onClick={() => onNavigate?.("scholarships")} className="text-gray-400 hover:text-white transition-colors text-left">Scholarships</button></li>
              <li><button onClick={() => onNavigate?.("assessment")} className="text-gray-400 hover:text-white transition-colors text-left">Entrance Exams</button></li>
              <li><button onClick={() => onNavigate?.("dashboard")} className="text-gray-400 hover:text-white transition-colors text-left">Career Guidance</button></li>
              <li><button onClick={() => onNavigate?.("dashboard")} className="text-gray-400 hover:text-white transition-colors text-left">Success Stories</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-400 text-sm">support@careeradvisor.gov.in</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-gray-400 text-sm">+91 11 2958-1240</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Department of Higher Education<br />
                  Government of India<br />
                  New Delhi - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Nava - Career Guidance Platform. All rights reserved. | Powered by AI
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button onClick={() => onNavigate?.("privacy")} className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</button>
              <button onClick={() => onNavigate?.("terms")} className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</button>
              <button onClick={() => onNavigate?.("help")} className="text-gray-400 hover:text-white text-sm transition-colors">Help</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}