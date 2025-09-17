import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Star, Users, GraduationCap, Search, Filter, ExternalLink } from "lucide-react";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Government" | "Private";
  rating: number;
  students: number;
  courses: string[];
  fees: string;
  cutoff: string;
  facilities: string[];
  distance: string;
}

export function CollegeDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const colleges: College[] = [
    {
      id: "1",
      name: "Government College of Arts & Science",
      location: "Jammu, Jammu and Kashmir",
      state: "Jammu and Kashmir",
      type: "Government",
      rating: 4.2,
      students: 2500,
      courses: ["B.A English", "B.Sc Physics", "B.Com", "B.A Psychology"],
      fees: "₹15,000 - ₹25,000",
      cutoff: "75%",
      facilities: ["Library", "Hostel", "Sports Complex", "Computer Lab"],
      distance: "2.5 km"
    },
    {
      id: "2",
      name: "University of Jammu",
      location: "Jammu, Jammu and Kashmir",
      state: "Jammu and Kashmir",
      type: "Government",
      rating: 4.5,
      students: 15000,
      courses: ["B.Tech", "B.Sc Computer Science", "BBA", "B.A History"],
      fees: "₹20,000 - ₹40,000",
      cutoff: "80%",
      facilities: ["Library", "Hostel", "Research Labs", "Auditorium", "Sports Complex"],
      distance: "5.2 km"
    },
    {
      id: "3",
      name: "Govt. Degree College Kathua",
      location: "Kathua, Jammu and Kashmir",
      state: "Jammu and Kashmir",
      type: "Government",
      rating: 3.8,
      students: 1800,
      courses: ["B.A", "B.Sc", "B.Com"],
      fees: "₹12,000 - ₹20,000",
      cutoff: "70%",
      facilities: ["Library", "Computer Lab", "Sports Ground"],
      distance: "25.0 km"
    },
    {
      id: "4",
      name: "Government Medical College Jammu",
      location: "Jammu, Jammu and Kashmir",
      state: "Jammu and Kashmir",
      type: "Government",
      rating: 4.7,
      students: 800,
      courses: ["MBBS", "B.Sc Nursing", "B.Pharmacy"],
      fees: "₹50,000 - ₹80,000",
      cutoff: "95%",
      facilities: ["Hospital", "Research Labs", "Library", "Hostel"],
      distance: "3.8 km"
    },
    {
      id: "5",
      name: "Islamic University of Science & Technology",
      location: "Awantipora, Jammu and Kashmir",
      state: "Jammu and Kashmir",
      type: "Private",
      rating: 4.0,
      students: 5000,
      courses: ["B.Tech", "BBA", "B.Sc", "B.A"],
      fees: "₹60,000 - ₹120,000",
      cutoff: "78%",
      facilities: ["Library", "Hostel", "Labs", "Sports Complex", "Mosque"],
      distance: "45.0 km"
    }
  ];

  const states = ["Jammu and Kashmir", "Delhi", "Punjab", "Haryana", "Himachal Pradesh"];
  const courseTypes = ["B.A", "B.Sc", "B.Com", "B.Tech", "BBA", "MBBS", "B.Pharmacy"];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || selectedState === "all-states" || college.state === selectedState;
    const matchesType = !selectedType || selectedType === "all-types" || college.type === selectedType;
    const matchesCourse = !selectedCourse || selectedCourse === "all-courses" || college.courses.some(course => 
      course.toLowerCase().includes(selectedCourse.toLowerCase())
    );

    return matchesSearch && matchesState && matchesType && matchesCourse;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">College Directory</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover government and private colleges in your area with detailed information about courses, fees, and facilities.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all-states" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <SelectValue placeholder="College Type" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all-types" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">All Types</SelectItem>
                <SelectItem value="Government" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Government</SelectItem>
                <SelectItem value="Private" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Private</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <SelectValue placeholder="Course Type" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all-courses" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">All Courses</SelectItem>
                {courseTypes.map(course => (
                  <SelectItem key={course} value={course} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-300">
          Found {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}
        </p>
        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* College Cards */}
      <div className="grid gap-6">
        {filteredColleges.map(college => (
          <Card key={college.id} className="hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2 text-gray-900 dark:text-white">{college.name}</CardTitle>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location} • {college.distance} away
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{college.rating}/5</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{college.students.toLocaleString()} students</span>
                        </div>
                        <Badge variant={college.type === "Government" ? "default" : "secondary"} className={college.type === "Government" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}>
                          {college.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Available Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.courses.slice(0, 4).map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 4 && (
                          <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            +{college.courses.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Facilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.facilities.slice(0, 3).map((facility, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                            {facility}
                          </span>
                        ))}
                        {college.facilities.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                            +{college.facilities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Annual Fees</div>
                      <div className="font-medium text-gray-900 dark:text-white">{college.fees}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Last Year Cutoff</div>
                      <div className="font-medium text-gray-900 dark:text-white">{college.cutoff}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      College Website
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredColleges.length === 0 && (
        <Card className="text-center py-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardContent>
            <GraduationCap className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No colleges found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}