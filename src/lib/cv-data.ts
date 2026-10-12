/**
 * Single source of truth for all CV content used across the portfolio,
 * the printable /cv page and the metadata.
 */

export const profile = {
  name: "Matheeshan Sinnathamby",
  firstName: "Matheeshan",
  lastName: "Sinnathamby",
  title: "Full Stack Developer",
  tagline:
    "Building fast, secure and user-focused web applications from front end to back end.",
  location: "Wembley, London, HA0 2LE, United Kingdom",
  shortLocation: "London, UK",
  phone: "07403 334616",
  phoneHref: "tel:+447403334616",
  email: "matheeshans@gmail.com",
  linkedin: "https://linkedin.com/in/matheeshan-sinnathamby-9026564918",
  linkedinLabel: "linkedin.com/in/matheeshan-sinnathamby",
  portfolioUrl: "https://github.com/matheeshans/portfpolio",
  portfolioLabel: "github.com/matheeshans/portfpolio",
  summary:
    "BSc (Hons) Computer Science graduate seeking a Full Stack Developer role, combining hands-on programming in Python, C++ and modern web technologies with a strong foundation in networking, cybersecurity and IT support. Recently certified in Digital Marketing, Effective Business Websites, AI for Business Professionals, Data Science & Analytics and more — bringing a well-rounded skill set across development, UX, SEO and analytics to build fast, secure, user-focused web applications.",
  workAuthorization: "Full-time right to work in the United Kingdom",
  availability: "Immediate / ASAP",
  preferredRoles: [
    "Full Stack Developer",
    "Front-End Developer",
    "Junior Full-Stack Developer",
    "Website Support Engineer",
  ],
  languages: [
    { name: "English", level: "Professional Proficiency" },
    { name: "Tamil", level: "Native Speaker" },
  ],
} as const;

/**
 * The headline pitch at the top of the site. Kept separate from `summary`
 * (which is the formal CV paragraph) because the hero needs to land a single
 * distinctive claim fast, then back it with evidence.
 */
export const heroIntro = {
  lead: "I build fast, secure, user-focused web applications — with a network engineer's instinct for what breaks.",
  support:
    "Four years across 24/7 network operations, IT support and cybersecurity taught me that reliability isn't a feature you add at the end. I bring that same discipline to full-stack development: thoughtful user experiences, reliable application logic, and performance and security designed in from the first commit.",
} as const;

export interface HeroHighlight {
  icon: "graduation" | "briefcase" | "award" | "shield";
  label: string;
}

export const heroHighlights: HeroHighlight[] = [
  { icon: "graduation", label: "BSc (Hons) Computer Science" },
  { icon: "briefcase", label: "4+ years in tech" },
  { icon: "award", label: "Certificates & courses" },
  { icon: "shield", label: "24/7 NOC experience" },
];

export type SkillIcon =
  | "code"
  | "terminal"
  | "brain"
  | "megaphone"
  | "network"
  | "wrench"
  | "users";

export interface SkillGroup {
  id: string;
  title: string;
  icon: SkillIcon;
  gradient: string;
  glow: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "web",
    title: "Web Development",
    icon: "code",
    gradient: "from-cyan-400 to-sky-500",
    glow: "rgba(34,211,238,0.35)",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Responsive design",
      "Cross-browser compatibility",
      "Website optimisation",
      "Best-practice website development",
      "Website metrics & analytics",
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "terminal",
    gradient: "from-violet-400 to-fuchsia-500",
    glow: "rgba(167,139,250,0.35)",
    skills: [
      "JavaScript",
      "Python",
      "C++",
      "Algorithms & data structures",
      "Object-oriented programming",
      "Regular expressions",
      "Problem solving",
      "Code debugging",
      "Version control fundamentals",
    ],
  },
  {
    id: "data-ai",
    title: "Data & AI",
    icon: "brain",
    gradient: "from-emerald-400 to-teal-500",
    glow: "rgba(52,211,153,0.35)",
    skills: [
      "Data analytics & visualisation",
      "Scientific computing with Python",
      "Data Science with Python",
      "Machine Learning fundamentals",
      "AI tools for business",
      "AI Visibility & AI search optimisation",
      "Effective prompting",
      "Ethical AI use",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO",
    icon: "megaphone",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(251,191,36,0.35)",
    skills: [
      "Inbound marketing",
      "SEO-friendly content",
      "AI visibility & AI-powered marketing",
      "Social media strategy",
      "Google Ads (Search, Display, Video, Apps)",
      "Google Analytics",
      "Campaign Manager 360",
      "Conversion optimisation",
    ],
  },
  {
    id: "network",
    title: "Networking & Security",
    icon: "network",
    gradient: "from-rose-400 to-pink-500",
    glow: "rgba(251,113,133,0.35)",
    skills: [
      "TCP/IP",
      "IP addressing & subnetting",
      "Routers & switches",
      "Network monitoring",
      "Cybersecurity fundamentals",
      "Ethical hacking",
      "Security best practices",
    ],
  },
  {
    id: "support",
    title: "IT Support",
    icon: "wrench",
    gradient: "from-sky-400 to-indigo-500",
    glow: "rgba(56,189,248,0.35)",
    skills: [
      "Windows / Linux troubleshooting",
      "Hardware diagnostics",
      "Incident management",
      "Ticketing systems",
      "SLA management",
    ],
  },
  {
    id: "professional",
    title: "Professional",
    icon: "users",
    gradient: "from-lime-400 to-green-500",
    glow: "rgba(163,230,53,0.35)",
    skills: [
      "Effective communication",
      "Leadership",
      "Agile project management (Scrum, Kanban)",
      "CRM",
      "Customer service",
      "Time management",
      "Team collaboration",
    ],
  },
];

/** Compact keywords rendered in the 3D skill constellation. */
export const skillCloud: string[] = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "ES6+",
  "Python",
  "C++",
  "Algorithms",
  "Data Structures",
  "OOP",
  "Responsive Design",
  "Web Optimisation",
  "SEO",
  "Google Ads",
  "Google Analytics",
  "AI Visibility",
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "Prompt Engineering",
  "TCP/IP",
  "Subnetting",
  "Routing & Switching",
  "Cybersecurity",
  "Ethical Hacking",
  "Linux",
  "Windows",
  "Incident Management",
  "Scrum",
  "Kanban",
  "CRM",
  "Debugging",
  "Version Control",
  "IoT",
  "Semrush",
  "HubSpot",
];

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  start: string;
  end: string;
  location?: string;
  type: string;
  highlights: string[];
  /** Skills applied and sharpened in this role. */
  skills: string[];
  accent: string;
}

export const experience: ExperienceItem[] = [
  {
    id: "bakkavor",
    role: "Production Operative",
    company: "Bakkavor",
    period: "Jan 2025 – Apr 2026",
    start: "2025-01",
    end: "2026-04",
    location: "United Kingdom",
    type: "Part-time alongside BSc studies",
    highlights: [
      "Maintained strict compliance with health, safety and food-manufacturing regulations while collaborating with cross-functional teams.",
      "Balanced a 20-hour weekly shift schedule alongside full-time BSc studies, demonstrating strong time management and reliability.",
    ],
    skills: [
      "Regulatory compliance",
      "Health & safety standards",
      "Cross-functional teamwork",
      "Shift scheduling",
      "Time management",
      "Working under pressure",
      "Reliability & attendance",
      "Attention to detail",
    ],
    accent: "#22d3ee",
  },
  {
    id: "hexad",
    role: "Network Technical Operator",
    company: "Hexad Tech Solutions (Pvt) Ltd",
    period: "Mar 2022 – Aug 2024",
    start: "2022-03",
    end: "2024-08",
    location: "Jaffna, Sri Lanka",
    type: "24/7 Network Operations Centre",
    highlights: [
      "Delivered 24/7 Network Operations Centre (NOC) support, including weekly infrastructure coverage for enterprise clients.",
      "Monitored network stability and reduced SLA-critical connectivity incidents through rapid triage.",
      "Troubleshot complex software and hardware faults using structured problem-solving; escalated unresolved issues to senior engineers.",
      "Produced clear incident and resolution documentation to support knowledge-sharing across shifts.",
    ],
    skills: [
      "24/7 NOC monitoring",
      "Network troubleshooting",
      "TCP/IP diagnostics",
      "Incident management",
      "SLA management",
      "Root-cause analysis",
      "Escalation handling",
      "Technical documentation",
      "Enterprise network support",
      "Shift handover",
      "Hardware & software fault-finding",
      "Client communication",
    ],
    accent: "#a78bfa",
  },
  {
    id: "globe",
    role: "IT Technician",
    company: "Globe Digital IT Zone",
    period: "Nov 2021 – Mar 2022",
    start: "2021-11",
    end: "2022-03",
    location: "Jaffna, Sri Lanka",
    type: "Hardware & software support",
    highlights: [
      "Performed end-to-end hardware diagnostics, troubleshooting and direct repair for client devices.",
      "Investigated software conflicts and identified underlying hardware faults, improving first-time-fix rates.",
      "Resolved operating system update issues, improving device stability and user satisfaction.",
    ],
    skills: [
      "Hardware diagnostics",
      "Component-level repair",
      "Operating system installation",
      "Windows & Linux troubleshooting",
      "Software conflict resolution",
      "Driver & update management",
      "Customer-facing support",
      "First-time fix rate",
      "Device testing & QA",
    ],
    accent: "#f472b6",
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  focus: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "smart-parking",
    name: "Smart Parking Management System",
    category: "IoT Simulation",
    summary:
      "An IoT simulation project exploring how parking-space occupancy can be monitored and shared, helping drivers identify available spaces more easily.",
    focus: ["Slot occupancy", "Live availability", "IoT workflow", "Parking operations"],
  },
  {
    id: "restaurant-management",
    name: "Restaurant Management System",
    category: "Business Application",
    summary:
      "A system project centred on organizing restaurant operations and keeping common service workflows in one place.",
    focus: ["Restaurant workflows", "Service operations", "Information management"],
  },
  {
    id: "inventory-management",
    name: "Inventory Management System",
    category: "Business Application",
    summary:
      "A system for managing inventory records and making stock information easier to maintain, find and review.",
    focus: ["Stock records", "Inventory tracking", "Data organization"],
  },
  {
    id: "it-helpdesk",
    name: "IT Helpdesk & Ticketing System",
    category: "IT Service Management",
    summary:
      "A helpdesk project focused on recording IT support requests and keeping ticket progress visible through the resolution workflow.",
    focus: ["Support requests", "Ticket tracking", "Issue resolution"],
  },
  {
    id: "network-monitoring",
    name: "Network Monitoring Dashboard",
    category: "Networking",
    summary:
      "A monitoring dashboard project designed to bring network status and operational information together for easier review.",
    focus: ["Network status", "Monitoring view", "Operational visibility"],
  },
];

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  detail: string;
  /** Module-level and practical skills covered by the qualification. */
  skills: string[];
}

export const education: EducationItem[] = [
  {
    id: "herts",
    degree: "BSc (Hons) Computer Science",
    institution: "University of Hertfordshire",
    period: "Sep 2024 – May 2026",
    detail:
      "Programming, software engineering, data & AI, networking and cybersecurity fundamentals.",
    skills: [
      "Advanced JavaScript",
      "Python",
      "C++",
      "Algorithms & complexity",
      "Data structures",
      "Object-oriented design",
      "Software engineering",
      "Agile & Scrum",
      "Databases & SQL",
      "Web application development",
      "Machine learning",
      "Data analytics",
      "Computer networks",
      "Cybersecurity principles",
      "Operating systems",
      "Version control (Git)",
      "Research & dissertation",
    ],
  },
  {
    id: "bcas",
    degree: "Pearson BTEC Level 5 HND in Computing (Network Engineering)",
    institution: "British College of Applied Studies (BCAS)",
    period: "2018 – 2021",
    detail:
      "Network engineering pathway: routing & switching, network design, security and infrastructure support.",
    skills: [
      "Network design & implementation",
      "Routing & switching",
      "TCP/IP",
      "IP addressing & subnetting",
      "VLANs",
      "Network security & firewalls",
      "Network troubleshooting",
      "Server administration",
      "Windows Server",
      "Linux administration",
      "IT technical support",
      "Hardware diagnostics",
      "Database design",
      "IT project management",
      "Business computing",
    ],
  },
  {
    id: "alevel",
    degree: "G.C.E. Advanced Level",
    institution: "Science for Technology & General Curriculum",
    period: "2017",
    detail:
      "Completed Advanced Level studies in scientific and technology-focused subjects with a strong practical and analytical foundation.",
    skills: [
      "Mathematics",
      "Science",
      "Technology",
      "Analytical thinking",
      "Problem solving",
      "Applied learning",
    ],
  },
  {
    id: "olevel",
    degree: "G.C.E. Ordinary Level",
    institution: "General Curriculum",
    period: "2014",
    detail:
      "Completed General Certificate of Education Ordinary Level with a broad academic grounding across core subjects.",
    skills: [
      "Core academics",
      "English",
      "Mathematics",
      "Science",
      "IT fundamentals",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                               certifications                               */
/* -------------------------------------------------------------------------- */

export interface CertificationGroup {
  id: string;
  provider: string;
  gradient: string;
  items: string[];
}

export const certificationGroups: CertificationGroup[] = [
  {
    id: "freecodecamp",
    provider: "freeCodeCamp (2026)",
    gradient: "from-slate-200 to-slate-400",
    items: [
      "JavaScript Algorithms and Data Structures",
      "Scientific Computing with Python",
    ],
  },
  {
    id: "hp-life",
    provider: "HP LIFE / HP Foundation (2026)",
    gradient: "from-cyan-400 to-sky-500",
    items: [
      "Effective Business Websites",
      "Social Media Marketing",
      "AI for Business Professionals",
      "Data Science & Analytics",
      "Business Communications",
      "Agile Project Management",
      "Customer Relationship Management",
      "Effective Leadership",
    ],
  },
  {
    id: "claude",
    provider: "Claude",
    gradient: "from-violet-400 to-indigo-500",
    items: [
      "AI Fluency: Framework and Foundations",
      "Introduction to Claude Cowork",
      "Building Effective Human-Agent Teams (beta)",
      "Introduction to Model Context Protocol",
      "Claude with Amazon Bedrock",
      "Claude with Google Cloud's Vertex AI",
      "Model Context Protocol: Advanced Topics",
    ],
  },
  {
    id: "hubspot",
    provider: "HubSpot Academy",
    gradient: "from-orange-400 to-amber-500",
    items: ["Digital Marketing", "Sales Management (2026)"],
  },
  {
    id: "udemy",
    provider: "Udemy",
    gradient: "from-amber-400 to-orange-500",
    items: [
      "Master Python for Data Science, Machine Learning, Automation",
      "Python for Excel Automation: Master Data Processing Reporting",
      "Complete Artificial Intelligence and Python Developer Course",
      "Python Automation Mastery: Automate Boring Tasks Like a Pro",
      "UI/UX with Figma and Adobe XD",
      "Software Architecture",
      "Complete Video Editing BootCamp: Beginner to Advanced",
      "Android App's Development Masterclass — Build 2 Apps — Java",
    ],
  },
  {
    id: "cisco",
    provider: "Cisco Networking Academy",
    gradient: "from-sky-400 to-blue-600",
    items: [
      "Data Analytics Essentials",
      "Introduction to Cybersecurity",
      "Cyber Threat Management",
      "Ethical Hacker",
      "Network Technician Career Path",
      "Networking Basics",
      "Networking Devices and Initial Configuration",
      "Network Addressing and Basic Troubleshooting",
      "Network Support and Security",
      "Introduction to the Internet of Things (IoT)",
    ],
  },
  {
    id: "programming-data",
    provider: "Programming & Data",
    gradient: "from-violet-400 to-fuchsia-500",
    items: [
      "C++ Advanced",
      "Python Essentials 1 & 2",
      "Data Science Essentials with Python",
      "Machine Learning with Python (IBM Cognitive Class)",
      "IBM Enterprise Design Thinking",
      "Conversion Optimization Certification",
    ],
  },
  {
    id: "google",
    provider: "Google Skillshop",
    gradient: "from-emerald-400 to-teal-500",
    items: [
      "Google Ads — Search, Display, Video, Apps, Creative & Measurement",
      "AI-Powered Performance Ads",
      "AI-Powered Shopping Ads",
      "Grow Offline Sales",
      "Campaign Manager 360 (2026)",
      "Google Ads & Video 360 (2026)",
      "Google Analytics (2026)",
    ],
  },
  {
    id: "semrush",
    provider: "Semrush Academy (2026)",
    gradient: "from-rose-400 to-pink-500",
    items: [
      "AI Visibility Essentials with Semrush",
      "AI Visibility Toolkit Crash Course",
      "Become an AI-Powered Marketer",
      "AI PR Toolkit Crash Course",
      "AI Search Operating System",
    ],
  },
];

export const totalLearningItems = certificationGroups.reduce(
  (sum, group) => sum + group.items.length,
  0,
);

export const stats = [
  { label: "Years in tech", value: "4+" },
  { label: "Courses & credentials", value: `${totalLearningItems}+` },
  { label: "Skill domains", value: String(skillGroups.length) },
  { label: "Availability", value: "Now" },
];

export const focusAreas = [
  {
    title: "Fast, secure websites",
    description:
      "Responsive, cross-browser HTML5/CSS3/JavaScript builds with performance optimisation and security best practices baked in.",
    icon: "code" as const,
  },
  {
    title: "SEO & AI visibility",
    description:
      "SEO-friendly content, AI search optimisation, Google Ads and analytics so every site is discoverable and measurable.",
    icon: "megaphone" as const,
  },
  {
    title: "Data-informed decisions",
    description:
      "Certified in data analytics and scientific computing with Python — website metrics become product improvements, not just dashboards.",
    icon: "brain" as const,
  },
  {
    title: "Network-grade reliability",
    description:
      "Years in NOC and IT support mean structured troubleshooting, incident management and an SLA mindset.",
    icon: "network" as const,
  },
];
