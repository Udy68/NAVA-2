// Global State
let currentUser = null;
let currentPage = 'home';
let isDarkTheme = false;
let isChatOpen = false;
let isChatMaximized = false;
let currentQuestionIndex = 0;
let assessmentAnswers = [];

// Sample Data
const searchData = [
    { type: "college", title: "Government Medical College, Srinagar", description: "MBBS, MD programs", category: "Medical College", page: "colleges" },
    { type: "college", title: "National Institute of Technology, Srinagar", description: "Engineering programs", category: "Engineering College", page: "colleges" },
    { type: "college", title: "University of Kashmir", description: "Various undergraduate and postgraduate programs", category: "State University", page: "colleges" },
    { type: "course", title: "Computer Science Engineering", description: "Software development, AI, machine learning", category: "Engineering", page: "courses" },
    { type: "course", title: "Medicine (MBBS)", description: "Medical practice, healthcare", category: "Medical", page: "courses" },
    { type: "course", title: "Business Administration", description: "Management, entrepreneurship", category: "Business", page: "courses" },
    { type: "scholarship", title: "Merit-cum-Means Scholarship", description: "For economically weaker students", category: "Financial Aid", page: "scholarships" },
    { type: "scholarship", title: "Post Matric Scholarship", description: "For students pursuing higher education", category: "Government Scholarship", page: "scholarships" }
];

const assessmentQuestions = [
    {
        question: "What type of activities do you enjoy most?",
        options: [
            "Solving complex problems and puzzles",
            "Helping and caring for others",
            "Creating and designing things",
            "Leading and organizing teams"
        ]
    },
    {
        question: "In which environment do you work best?",
        options: [
            "Structured and organized settings",
            "Creative and flexible environments",
            "Collaborative team settings",
            "Independent work spaces"
        ]
    },
    {
        question: "What motivates you the most?",
        options: [
            "Making a positive impact on society",
            "Achieving financial success",
            "Personal growth and learning",
            "Recognition and achievement"
        ]
    },
    {
        question: "Which subjects did you enjoy most in school?",
        options: [
            "Mathematics and Sciences",
            "Arts and Literature",
            "Social Sciences and History",
            "Business and Economics"
        ]
    },
    {
        question: "How do you prefer to solve problems?",
        options: [
            "Through research and analysis",
            "Through creativity and innovation",
            "Through discussion and collaboration",
            "Through systematic planning"
        ]
    }
];

const colleges = [
    {
        name: "Government Medical College, Srinagar",
        description: "Premier medical institution offering MBBS and MD programs",
        location: "Srinagar, J&K",
        courses: ["MBBS", "MD", "MS", "Nursing"],
        category: "Medical"
    },
    {
        name: "National Institute of Technology, Srinagar",
        description: "Leading engineering college with excellent placement records",
        location: "Srinagar, J&K",
        courses: ["B.Tech", "M.Tech", "PhD"],
        category: "Engineering"
    },
    {
        name: "University of Kashmir",
        description: "State university offering diverse undergraduate and postgraduate programs",
        location: "Srinagar, J&K",
        courses: ["BA", "BSc", "MA", "MSc", "PhD"],
        category: "University"
    },
    {
        name: "Government College for Women, Srinagar",
        description: "Women's college specializing in arts, commerce, and science",
        location: "Srinagar, J&K",
        courses: ["BA", "BSc", "BCom", "MA", "MSc"],
        category: "Arts & Science"
    }
];

const courses = [
    {
        name: "Computer Science Engineering",
        description: "Learn programming, software development, AI, and machine learning",
        duration: "4 years",
        careers: ["Software Engineer", "Data Scientist", "AI Specialist", "Web Developer"],
        category: "Engineering"
    },
    {
        name: "Medicine (MBBS)",
        description: "Comprehensive medical education for healthcare professionals",
        duration: "5.5 years",
        careers: ["Doctor", "Surgeon", "Specialist", "Medical Researcher"],
        category: "Medical"
    },
    {
        name: "Business Administration",
        description: "Management, leadership, and entrepreneurship skills",
        duration: "3 years",
        careers: ["Manager", "Entrepreneur", "Consultant", "Business Analyst"],
        category: "Business"
    },
    {
        name: "Civil Engineering",
        description: "Design and construction of infrastructure projects",
        duration: "4 years",
        careers: ["Civil Engineer", "Project Manager", "Urban Planner", "Construction Manager"],
        category: "Engineering"
    }
];

const scholarships = [
    {
        name: "Merit-cum-Means Scholarship",
        description: "Financial assistance for economically weaker students with good academic performance",
        amount: "₹50,000/year",
        eligibility: "Family income < ₹8 LPA, 60% marks",
        deadline: "March 31, 2024",
        category: "Government"
    },
    {
        name: "Post Matric Scholarship",
        description: "Support for students pursuing higher education after Class 12",
        amount: "₹35,000/year",
        eligibility: "Scheduled Castes/Tribes, Class 12 passed",
        deadline: "April 15, 2024",
        category: "Government"
    },
    {
        name: "J&K State Scholarship",
        description: "State-sponsored scholarship for domicile students",
        amount: "₹25,000/year",
        eligibility: "J&K domicile, 70% marks in qualifying exam",
        deadline: "May 30, 2024",
        category: "State"
    },
    {
        name: "Prime Minister's Scholarship",
        description: "Central scholarship for meritorious students",
        amount: "₹30,000/year",
        eligibility: "Central Board examination with 85% marks",
        deadline: "June 15, 2024",
        category: "Central"
    }
];

const internships = [
    {
        name: "Software Development Internship",
        company: "Tech Solutions J&K",
        description: "6-month internship program in web and mobile app development",
        duration: "6 months",
        stipend: "₹15,000/month",
        skills: ["JavaScript", "React", "Node.js"],
        category: "Technology"
    },
    {
        name: "Medical Research Internship",
        company: "SKIMS Medical College",
        description: "Research internship in medical sciences and healthcare",
        duration: "3 months",
        stipend: "₹8,000/month",
        skills: ["Research", "Medical Knowledge", "Data Analysis"],
        category: "Healthcare"
    },
    {
        name: "Digital Marketing Internship",
        company: "Kashmir Tourism Board",
        description: "Digital marketing and social media management internship",
        duration: "4 months",
        stipend: "₹12,000/month",
        skills: ["Social Media", "Content Creation", "SEO"],
        category: "Marketing"
    },
    {
        name: "Engineering Trainee",
        company: "J&K Power Development Corporation",
        description: "Engineering trainee program in power sector",
        duration: "12 months",
        stipend: "₹20,000/month",
        skills: ["Electrical Engineering", "Power Systems", "Project Management"],
        category: "Engineering"
    }
];

const timelineEvents = [
    {
        date: "Mar",
        day: "15",
        title: "JEE Main Registration Opens",
        description: "Joint Entrance Examination Main registration begins",
        status: "upcoming",
        type: "registration"
    },
    {
        date: "Apr",
        day: "01",
        title: "NEET Application Deadline",
        description: "Last date to apply for National Eligibility Entrance Test",
        status: "active",
        type: "deadline"
    },
    {
        date: "Apr",
        day: "20",
        title: "Board Exam Results",
        description: "JKBOSE Class 12 results expected",
        status: "upcoming",
        type: "result"
    },
    {
        date: "May",
        day: "05",
        title: "College Admission Process",
        description: "University of Kashmir admission process begins",
        status: "upcoming",
        type: "admission"
    },
    {
        date: "Jun",
        day: "15",
        title: "Scholarship Applications",
        description: "Various scholarship applications deadline",
        status: "upcoming",
        type: "scholarship"
    }
];

const experts = [
    {
        name: "Dr. Priya Sharma",
        specialty: "Career Counselor & Psychologist",
        experience: "15 years",
        rating: 4.9,
        expertise: ["Career Guidance", "Psychology", "Student Counseling"],
        bio: "Expert in career counseling with extensive experience in guiding students"
    },
    {
        name: "Prof. Rajesh Kumar",
        specialty: "Engineering & Technology Mentor",
        experience: "20 years",
        rating: 4.8,
        expertise: ["Engineering", "Technology", "Industry Connections"],
        bio: "Former professor and industry expert in engineering fields"
    },
    {
        name: "Dr. Sarah Ali",
        specialty: "Medical Education Advisor",
        experience: "12 years",
        rating: 4.9,
        expertise: ["Medical Education", "NEET Preparation", "Healthcare Careers"],
        bio: "Medical education specialist and NEET preparation expert"
    },
    {
        name: "Mr. Aamir Hassan",
        specialty: "Business & Management Consultant",
        experience: "18 years",
        rating: 4.7,
        expertise: ["Business Strategy", "Entrepreneurship", "Management"],
        bio: "Business consultant helping students explore management careers"
    }
];

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    checkAuthStatus();
    setupEventListeners();
    loadInitialData();
});

function initializeApp() {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDarkTheme = true;
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').className = 'fas fa-moon';
    }
    
    // Initialize search functionality
    setupSearch();
}

function checkAuthStatus() {
    const userData = localStorage.getItem('userProfile');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateAuthUI();
    }
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('focus', showSearchResults);
        searchInput.addEventListener('blur', hideSearchResults);
    }
    
    // Click outside to close search results
    document.addEventListener('click', function(e) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
            hideSearchResults();
        }
    });
    
    // Click outside to close user menu
    document.addEventListener('click', function(e) {
        const userProfile = document.getElementById('userProfile');
        const userMenu = document.getElementById('userMenu');
        if (userProfile && !userProfile.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });
}

function loadInitialData() {
    loadColleges();
    loadCourses();
    if (currentUser) {
        loadDashboard();
    }
}

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId.replace('Page', '');
    }
}

function showHome() {
    showPage('homePage');
}

function showAssessment() {
    showPage('assessmentPage');
    initializeAssessment();
}

function showColleges() {
    showPage('collegesPage');
    loadColleges();
}

function showCourses() {
    showPage('coursesPage');
    loadCourses();
}

function showLogin() {
    showPage('loginPage');
}

function showDashboard() {
    if (currentUser) {
        showPage('dashboardPage');
        loadDashboard();
    } else {
        showLogin();
    }
}

function showScholarships() {
    showPage('scholarshipsPage');
    loadScholarships();
}

function showInternships() {
    showPage('internshipsPage');
    loadInternships();
}

function showTimeline() {
    showPage('timelinePage');
    loadTimeline();
}

function showExpertGuidance() {
    showPage('expertGuidancePage');
    loadExpertGuidance();
}

// Theme Functions
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const themeIcon = document.getElementById('theme-icon');
    
    if (isDarkTheme) {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Search Functions
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query.length > 1) {
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);
        
        displaySearchResults(results);
    } else {
        hideSearchResults();
    }
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result-item" onclick="handleSearchResultClick('${result.page}', '${result.title}')">
            <div class="result-icon">
                <i class="fas fa-${getIconForType(result.type)}"></i>
            </div>
            <div class="result-content">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
            </div>
            <div class="result-badge">${result.category}</div>
        </div>
    `).join('');
    
    searchResults.classList.remove('hidden');
}

function getIconForType(type) {
    const icons = {
        college: 'university',
        course: 'graduation-cap',
        scholarship: 'award',
        internship: 'briefcase',
        tool: 'cog'
    };
    return icons[type] || 'search';
}

function handleSearchResultClick(page, title) {
    hideSearchResults();
    document.getElementById('searchInput').value = '';
    
    // Navigate to the appropriate page
    switch(page) {
        case 'colleges':
            showColleges();
            break;
        case 'courses':
            showCourses();
            break;
        case 'assessment':
            showAssessment();
            break;
        default:
            showHome();
    }
    
    showToast('success', 'Search Result', `Found: ${title}`);
}

function handleSearch(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value.trim();
    
    if (query) {
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (results.length > 0) {
            handleSearchResultClick(results[0].page, results[0].title);
        } else {
            showToast('info', 'No Results', `No results found for "${query}". Try different keywords.`);
        }
        
        document.getElementById('searchInput').value = '';
    }
}

function showSearchResults() {
    const query = document.getElementById('searchInput').value.trim();
    if (query.length > 1) {
        handleSearchInput({ target: { value: query } });
    }
}

function hideSearchResults() {
    setTimeout(() => {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.add('hidden');
        }
    }, 150);
}

// Authentication Functions
function showAuthTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(tab + 'Form').classList.add('active');
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.querySelector('i') || event.target;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('error', 'Error', 'Please fill in all required fields');
        return;
    }
    
    // Simulate login process
    const submitBtn = document.getElementById('loginSubmit');
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Mock user data
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: email,
            age: '20',
            gender: 'male',
            city: 'Srinagar',
            educationLevel: 'class-12-completed',
            loginTime: new Date().toISOString()
        };
        
        currentUser = userData;
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        
        updateAuthUI();
        showToast('success', 'Login Successful', 'Welcome back!');
        showDashboard();
        
        submitBtn.textContent = 'Sign In';
        submitBtn.disabled = false;
    }, 1000);
}

function handleSignup(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('signupEmail').value,
        age: document.getElementById('age').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        city: document.getElementById('city').value,
        educationLevel: document.getElementById('educationLevel').value
    };
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.age || 
        !formData.gender || !formData.city || !formData.educationLevel) {
        showToast('error', 'Error', 'Please fill in all required fields');
        return;
    }
    
    if (!password || !confirmPassword) {
        showToast('error', 'Error', 'Please enter and confirm your password');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('error', 'Error', 'Passwords do not match');
        return;
    }
    
    // Simulate signup process
    const submitBtn = document.getElementById('signupSubmit');
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const userData = {
            ...formData,
            signupTime: new Date().toISOString()
        };
        
        currentUser = userData;
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        
        updateAuthUI();
        showToast('success', 'Account Created', 'Welcome to Nava!');
        showDashboard();
        
        submitBtn.textContent = 'Create My Account';
        submitBtn.disabled = false;
    }, 1500);
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userInitials = document.getElementById('userInitials');
    const dashboardUserName = document.getElementById('dashboardUserName');
    
    if (currentUser) {
        // Hide login button, show user profile
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        
        // Update user info
        if (userName) userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        if (userEmail) userEmail.textContent = currentUser.email;
        if (userInitials) {
            userInitials.textContent = `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
        }
        if (dashboardUserName) dashboardUserName.textContent = currentUser.firstName;
    } else {
        // Show login button, hide user profile
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    
    updateAuthUI();
    showToast('success', 'Logged Out', 'You have been successfully logged out');
    showHome();
    
    // Hide user menu
    document.getElementById('userMenu').classList.add('hidden');
}

// Assessment Functions
function initializeAssessment() {
    currentQuestionIndex = 0;
    assessmentAnswers = [];
    displayQuestion();
}

function displayQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const progress = document.getElementById('assessmentProgress');
    
    if (currentQuestionIndex >= assessmentQuestions.length) {
        showAssessmentResults();
        return;
    }
    
    const question = assessmentQuestions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / assessmentQuestions.length) * 100;
    
    progress.style.width = progressPercent + '%';
    
    questionContainer.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestionIndex + 1} of ${assessmentQuestions.length}</h3>
            <h3>${question.question}</h3>
            <div class="answer-options">
                ${question.options.map((option, index) => `
                    <div class="answer-option" onclick="selectAnswer(${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked option
    document.querySelectorAll('.answer-option')[answerIndex].classList.add('selected');
    
    // Store answer
    assessmentAnswers[currentQuestionIndex] = answerIndex;
    
    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 500);
}

function showAssessmentResults() {
    const questionContainer = document.getElementById('questionContainer');
    const progress = document.getElementById('assessmentProgress');
    
    progress.style.width = '100%';
    
    // Simple career recommendation based on answers
    const careerRecommendations = getCareerRecommendations();
    
    questionContainer.innerHTML = `
        <div class="assessment-results">
            <h2>Assessment Complete!</h2>
            <p>Based on your responses, here are your recommended career paths:</p>
            <div class="career-recommendations">
                ${careerRecommendations.map(career => `
                    <div class="career-recommendation">
                        <h4>${career.title}</h4>
                        <p>${career.description}</p>
                        <div class="match-score">Match: ${career.score}%</div>
                    </div>
                `).join('')}
            </div>
            <div class="assessment-actions">
                <button class="btn-primary" onclick="showCourses()">Explore Courses</button>
                <button class="btn-secondary" onclick="showColleges()">Find Colleges</button>
                <button class="btn-secondary" onclick="initializeAssessment()">Retake Assessment</button>
            </div>
        </div>
    `;
}

function getCareerRecommendations() {
    // Simple scoring algorithm based on answers
    const careers = [
        { title: "Software Engineering", description: "Design and develop software applications", score: 85 },
        { title: "Medical Doctor", description: "Provide healthcare and medical treatment", score: 78 },
        { title: "Business Management", description: "Lead and manage business operations", score: 72 },
        { title: "Teaching", description: "Educate and inspire the next generation", score: 68 }
    ];
    
    return careers.sort((a, b) => b.score - a.score).slice(0, 3);
}

// Data Loading Functions
function loadColleges() {
    const collegesGrid = document.getElementById('collegesGrid');
    if (!collegesGrid) return;
    
    collegesGrid.innerHTML = colleges.map(college => `
        <div class="college-card">
            <h3>${college.name}</h3>
            <p>${college.description}</p>
            <div class="card-tags">
                ${college.courses.map(course => `<span class="tag">${course}</span>`).join('')}
            </div>
            <div class="college-info">
                <p><i class="fas fa-map-marker-alt"></i> ${college.location}</p>
                <p><i class="fas fa-tag"></i> ${college.category}</p>
            </div>
        </div>
    `).join('');
}

function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = courses.map(course => `
        <div class="course-card">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <div class="course-info">
                <p><i class="fas fa-clock"></i> Duration: ${course.duration}</p>
                <p><i class="fas fa-briefcase"></i> Career Opportunities:</p>
                <div class="card-tags">
                    ${course.careers.map(career => `<span class="tag">${career}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function loadDashboard() {
    if (!currentUser) return;
    
    // Update dashboard with user-specific data
    const dashboardUserName = document.getElementById('dashboardUserName');
    if (dashboardUserName) {
        dashboardUserName.textContent = currentUser.firstName;
    }
}

function loadScholarships() {
    const scholarshipsGrid = document.getElementById('scholarshipsGrid');
    if (!scholarshipsGrid) return;
    
    scholarshipsGrid.innerHTML = scholarships.map(scholarship => `
        <div class="scholarship-card">
            <div class="scholarship-amount">${scholarship.amount}</div>
            <h3>${scholarship.name}</h3>
            <p>${scholarship.description}</p>
            <div class="scholarship-details">
                <p><i class="fas fa-user-check"></i> <strong>Eligibility:</strong> ${scholarship.eligibility}</p>
                <p><i class="fas fa-calendar"></i> <strong>Deadline:</strong> ${scholarship.deadline}</p>
                <div class="card-tags">
                    <span class="tag">${scholarship.category}</span>
                </div>
            </div>
            <button class="btn-primary" onclick="applyScholarship('${scholarship.name}')">
                Apply Now
            </button>
        </div>
    `).join('');
}

function loadInternships() {
    const internshipsGrid = document.getElementById('internshipsGrid');
    if (!internshipsGrid) return;
    
    internshipsGrid.innerHTML = internships.map(internship => `
        <div class="internship-card">
            <div class="internship-duration">${internship.duration}</div>
            <h3>${internship.name}</h3>
            <p class="company"><i class="fas fa-building"></i> ${internship.company}</p>
            <p>${internship.description}</p>
            <div class="internship-details">
                <p><i class="fas fa-money-bill-wave"></i> <strong>Stipend:</strong> ${internship.stipend}</p>
                <p><i class="fas fa-tools"></i> <strong>Skills Required:</strong></p>
                <div class="card-tags">
                    ${internship.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
            </div>
            <button class="btn-primary" onclick="applyInternship('${internship.name}')">
                Apply for Internship
            </button>
        </div>
    `).join('');
}

function loadTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;
    
    timelineContainer.innerHTML = timelineEvents.map(event => `
        <div class="timeline-item">
            <div class="timeline-date">
                <div style="font-size: 0.75rem; line-height: 1;">${event.date}</div>
                <div style="font-size: 0.875rem; font-weight: 700;">${event.day}</div>
            </div>
            <div class="timeline-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="timeline-status ${event.status}">
                    ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </div>
            </div>
        </div>
    `).join('');
}

function loadExpertGuidance() {
    const expertGuidanceContent = document.getElementById('expertGuidanceContent');
    if (!expertGuidanceContent) return;
    
    expertGuidanceContent.innerHTML = experts.map(expert => `
        <div class="expert-card">
            <div class="expert-avatar">
                <i class="fas fa-user-graduate"></i>
            </div>
            <h3>${expert.name}</h3>
            <p class="specialty">${expert.specialty}</p>
            <p class="experience"><i class="fas fa-clock"></i> ${expert.experience} experience</p>
            <div class="rating">
                ${Array.from({length: 5}, (_, i) => 
                    `<i class="fas fa-star${i < Math.floor(expert.rating) ? '' : '-o'}"></i>`
                ).join('')}
                <span>(${expert.rating})</span>
            </div>
            <div class="card-tags">
                ${expert.expertise.map(skill => `<span class="tag">${skill}</span>`).join('')}
            </div>
            <button class="contact-expert-btn" onclick="contactExpert('${expert.name}')">
                <i class="fas fa-message"></i> Contact Expert
            </button>
        </div>
    `).join('');
}

// Chatbot Functions
function toggleChatbot() {
    const chatInterface = document.getElementById('chatInterface');
    const chatButton = document.getElementById('chatbotButton');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatInterface.classList.remove('hidden');
        chatButton.style.display = 'none';
        
        // Add welcome message if first time opening
        if (!chatInterface.querySelector('.user-message')) {
            // Chat is already initialized with welcome message in HTML
        }
    } else {
        chatInterface.classList.add('hidden');
        chatButton.style.display = 'flex';
        isChatMaximized = false;
        chatInterface.classList.remove('maximized');
    }
}

function maximizeChat() {
    const chatInterface = document.getElementById('chatInterface');
    const maximizeBtn = document.getElementById('maximizeBtn');
    
    isChatMaximized = !isChatMaximized;
    
    if (isChatMaximized) {
        chatInterface.classList.add('maximized');
        maximizeBtn.innerHTML = '<i class="fas fa-compress"></i>';
        maximizeBtn.title = 'Restore';
    } else {
        chatInterface.classList.remove('maximized');
        maximizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
        maximizeBtn.title = 'Maximize';
    }
}

function handleChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage('user', message);
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage('bot', response);
        }, 1000);
    }
}

function addChatMessage(type, content) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}-message`;
    
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage(message) {
    document.getElementById('chatInput').value = message;
    handleChatMessage({ preventDefault: () => {} });
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('engineering') || lowerMessage.includes('computer')) {
        return "Engineering is a great field! For Computer Science Engineering, you can explore colleges like NIT Srinagar. The career prospects include Software Engineer, Data Scientist, and AI Specialist positions.";
    } else if (lowerMessage.includes('medical') || lowerMessage.includes('doctor') || lowerMessage.includes('mbbs')) {
        return "Medical career is very rewarding! Government Medical College Srinagar offers excellent MBBS programs. You'll need to prepare for NEET entrance exam.";
    } else if (lowerMessage.includes('neet')) {
        return "NEET preparation requires focus on Physics, Chemistry, and Biology. I recommend starting early, taking mock tests, and considering coaching if needed. The application usually opens in December.";
    } else if (lowerMessage.includes('college') || lowerMessage.includes('admission')) {
        return "I can help you find the right college! Use our College Directory to explore government colleges in J&K. Consider factors like courses offered, location, and admission requirements.";
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
        return "Choosing the right career is crucial! I recommend taking our Career Assessment Quiz first. It will help identify your interests and suggest suitable career paths.";
    } else {
        return "I'm here to help with your career and education queries! You can ask me about colleges, courses, career paths, exam preparation, or take our assessment quiz.";
    }
}

// Notification Functions
function showNotifications() {
    showToast('info', 'Notifications', 'You have 3 new notifications: Assessment complete, New scholarships available, College application deadline reminder.');
}

// Toast Notification System
function showToast(type, title, message, duration = 4000) {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <div class="toast-header">
            <strong>${title}</strong>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, duration);
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add loading states to buttons
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                this.classList.add('loading');
            }
        });
    });
    
    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .college-card, .course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Application interaction functions
function applyScholarship(scholarshipName) {
    if (!currentUser) {
        showToast('warning', 'Login Required', 'Please login to apply for scholarships');
        showLogin();
        return;
    }
    
    showToast('success', 'Application Started', `Starting application process for ${scholarshipName}`);
    // Here you would typically redirect to the scholarship application form
}

function applyInternship(internshipName) {
    if (!currentUser) {
        showToast('warning', 'Login Required', 'Please login to apply for internships');
        showLogin();
        return;
    }
    
    showToast('success', 'Application Started', `Starting application process for ${internshipName}`);
    // Here you would typically redirect to the internship application form
}

function contactExpert(expertName) {
    if (!currentUser) {
        showToast('warning', 'Login Required', 'Please login to contact experts');
        showLogin();
        return;
    }
    
    showToast('info', 'Connecting...', `Connecting you with ${expertName}. They will reach out within 24 hours.`);
    // Here you would typically open a contact form or booking system
}

// Enhanced search to include new content
function updateSearchData() {
    // Add scholarships to search data
    scholarships.forEach(scholarship => {
        searchData.push({
            type: "scholarship",
            title: scholarship.name,
            description: scholarship.description,
            category: scholarship.category + " Scholarship",
            page: "scholarships"
        });
    });
    
    // Add internships to search data
    internships.forEach(internship => {
        searchData.push({
            type: "internship",
            title: internship.name,
            description: internship.description,
            category: internship.category + " Internship",
            page: "internships"
        });
    });
    
    // Add timeline events to search data
    timelineEvents.forEach(event => {
        searchData.push({
            type: "timeline",
            title: event.title,
            description: event.description,
            category: "Timeline Event",
            page: "timeline"
        });
    });
    
    // Add experts to search data
    experts.forEach(expert => {
        searchData.push({
            type: "expert",
            title: expert.name,
            description: expert.specialty,
            category: "Expert Guidance",
            page: "expert-guidance"
        });
    });
}

// Enhanced search result handling
function handleSearchResultClick(page, title) {
    hideSearchResults();
    document.getElementById('searchInput').value = '';
    
    // Navigate to the appropriate page
    switch(page) {
        case 'colleges':
            showColleges();
            break;
        case 'courses':
            showCourses();
            break;
        case 'scholarships':
            showScholarships();
            break;
        case 'internships':
            showInternships();
            break;
        case 'timeline':
            showTimeline();
            break;
        case 'expert-guidance':
            showExpertGuidance();
            break;
        case 'assessment':
            showAssessment();
            break;
        default:
            showHome();
    }
    
    showToast('success', 'Search Result', `Found: ${title}`);
}

// Enhanced initialization
function loadInitialData() {
    updateSearchData(); // Add new content to search
    loadColleges();
    loadCourses();
    loadScholarships();
    loadInternships();
    loadTimeline();
    loadExpertGuidance();
    
    if (currentUser) {
        loadDashboard();
    }
}

// Right sidebar functionality
function toggleRightSidebar() {
    const sidebar = document.getElementById('rightSidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Lazy loading for better performance
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('.lazy-load');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced theme transition
function optimizeThemeTransition() {
    document.documentElement.classList.add('transitioning');
    
    setTimeout(() => {
        document.documentElement.classList.remove('transitioning');
        document.documentElement.classList.add('transition-complete');
        setTimeout(() => {
            document.documentElement.classList.remove('transition-complete');
        }, 50);
    }, 200);
}

// Update theme toggle function
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const themeIcon = document.getElementById('theme-icon');
    
    optimizeThemeTransition();
    
    if (isDarkTheme) {
        document.body.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        document.documentElement.classList.remove('dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Enhanced bot responses
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('financial aid')) {
        return "Great! We have various scholarships available including Merit-cum-Means Scholarship and Post Matric Scholarship. Check out our Scholarships section for more details and application processes.";
    } else if (lowerMessage.includes('internship') || lowerMessage.includes('work experience')) {
        return "Excellent! We have internship opportunities in various fields like Software Development, Medical Research, and Digital Marketing. Visit our Internships section to explore and apply.";
    } else if (lowerMessage.includes('timeline') || lowerMessage.includes('deadline') || lowerMessage.includes('dates')) {
        return "Stay on track with our Timeline Tracker! It shows important dates like JEE Main registration, NEET deadlines, and college admission processes. Never miss an important deadline again!";
    } else if (lowerMessage.includes('expert') || lowerMessage.includes('counselor') || lowerMessage.includes('guidance')) {
        return "Connect with our expert counselors! We have specialists in career counseling, engineering, medical education, and business. They can provide personalized guidance for your career journey.";
    } else if (lowerMessage.includes('engineering') || lowerMessage.includes('computer')) {
        return "Engineering is a great field! For Computer Science Engineering, you can explore colleges like NIT Srinagar. The career prospects include Software Engineer, Data Scientist, and AI Specialist positions.";
    } else if (lowerMessage.includes('medical') || lowerMessage.includes('doctor') || lowerMessage.includes('mbbs')) {
        return "Medical career is very rewarding! Government Medical College Srinagar offers excellent MBBS programs. You'll need to prepare for NEET entrance exam.";
    } else if (lowerMessage.includes('neet')) {
        return "NEET preparation requires focus on Physics, Chemistry, and Biology. I recommend starting early, taking mock tests, and considering coaching if needed. Check our Timeline for application dates!";
    } else if (lowerMessage.includes('college') || lowerMessage.includes('admission')) {
        return "I can help you find the right college! Use our College Directory to explore government colleges in J&K. Consider factors like courses offered, location, and admission requirements.";
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
        return "Choosing the right career is crucial! I recommend taking our Career Assessment Quiz first. It will help identify your interests and suggest suitable career paths.";
    } else {
        return "I'm here to help with your career and education queries! You can ask me about colleges, courses, scholarships, internships, career paths, expert guidance, or take our assessment quiz.";
    }
}

// Call initialization functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUIEnhancements();
    initializeLazyLoading();
    
    // Initialize theme properly
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDarkTheme = true;
        document.body.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').className = 'fas fa-moon';
    }
});