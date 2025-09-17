// Production-ready TypeScript interfaces

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  state?: string;
  class?: string;
  stream?: string;
  interests: string[];
  goals: string[];
  careerGoals?: string;
  bio?: string;
  avatar?: string;
  completedAssessments: number;
  profileCompletion: number;
  signupTime: string;
  loginTime: string;
  lastUpdated: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    deadlineAlerts: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'limited';
    shareProgress: boolean;
    allowAnalytics: boolean;
  };
  ui: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    compactView: boolean;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  token?: string;
  error?: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  state?: string;
  class?: string;
  stream?: string;
  agreeToTerms: boolean;
  subscribeNewsletter?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  state?: string;
  class?: string;
  stream?: string;
  interests?: string[];
  goals?: string[];
  careerGoals?: string;
  bio?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

export interface AssessmentResult {
  id: string;
  type: 'career' | 'stream' | 'personality' | 'aptitude';
  title: string;
  description: string;
  score: number;
  percentile: number;
  recommendations: string[];
  completedAt: string;
  validUntil: string;
  detailedResults: {
    sections: Array<{
      name: string;
      score: number;
      interpretation: string;
    }>;
    strengths: string[];
    areas_for_improvement: string[];
    career_matches: string[];
  };
}

export interface College {
  id: string;
  name: string;
  type: 'government' | 'private' | 'aided';
  location: {
    city: string;
    state: string;
    district: string;
    pincode: string;
  };
  courses: Course[];
  facilities: string[];
  accreditation: string[];
  rankings: Array<{
    authority: string;
    rank: number;
    year: number;
    category: string;
  }>;
  admission: {
    process: string;
    eligibility: string;
    deadlines: Array<{
      course: string;
      deadline: string;
      description: string;
    }>;
  };
  fees: {
    tuition: number;
    hostel?: number;
    other?: number;
    total: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

export interface Course {
  id: string;
  name: string;
  code: string;
  type: 'ug' | 'pg' | 'diploma' | 'certificate';
  duration: string;
  eligibility: string;
  description: string;
  syllabus: string[];
  career_prospects: string[];
  average_salary: {
    min: number;
    max: number;
    currency: string;
  };
  skills_required: string[];
  colleges_offering: string[];
  entrance_exams: string[];
  created_at: string;
  updated_at: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  type: 'merit' | 'need' | 'minority' | 'state' | 'central';
  amount: {
    value: number;
    type: 'one_time' | 'annual' | 'monthly';
    currency: string;
  };
  eligibility: {
    education_level: string[];
    income_criteria?: number;
    academic_criteria?: string;
    other_requirements: string[];
  };
  application: {
    deadline: string;
    process: string;
    documents_required: string[];
    application_url: string;
  };
  benefits: string[];
  renewable: boolean;
  beneficiaries_count: number;
}

export interface NavigationParams {
  filter?: string;
  stream?: 'science' | 'commerce' | 'arts' | string;
  category?: string;
  id?: string;
  tab?: string;
}

export type PageType = 
  | 'home' 
  | 'assessment' 
  | 'stream-assessment' 
  | 'colleges' 
  | 'courses' 
  | 'timeline' 
  | 'auth' 
  | 'scholarships' 
  | 'internships' 
  | 'dashboard' 
  | 'expert-guidance' 
  | 'ai-recommendations'
  | 'facebook' 
  | 'twitter' 
  | 'instagram' 
  | 'linkedin' 
  | 'privacy' 
  | 'terms' 
  | 'help' 
  | 'stream-details';

export interface AppState {
  currentPage: PageType;
  navigationParams: NavigationParams;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}