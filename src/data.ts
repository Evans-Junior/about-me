export const links = {
  linkedin: "https://www.linkedin.com/in/evans-kumi/",
  github: "https://github.com/Evans-Junior?tab=repositories",
  email: "mailto:kwakukumi14@gmail.com",
  hosted: {
    myscholars: "https://myscholarshub.org/",
    afya: "https://afya-ai-lab.vercel.app/",
    church: "https://ziontemple.vercel.app/",
    roboquest: "https://robo-quest-arena-kahoot.vercel.app/",
    panafrican_ai_chat_bot: "https://panafricanaisummit.com/",
  },
};

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "PHP", "SQL", "Dart", "HTML", "CSS"],
  frameworks: ["Laravel", "FastAPI", "React.js", "Node.js", "Express.js", "Flutter", "Bootstrap", "Tailwind CSS", "Flask", "R (RStudio)"],
  tools: ["Git", "GitHub", "Docker", "AWS", "GCP", "Firebase", "Jira", "Figma", "Canva", "Filmora", "Microsoft 365"],
};

export const stats = [
  { label: "Projects Built", value: "90+", sub: "AI · SaaS · Mobile · Web" },
  { label: "Youth Mentored", value: "100+", sub: "Across Ghana & beyond" },
  { label: "Awards & Grants", value: "$44K+", sub: "Funding raised" },
  { label: "Publications", value: "1", sub: "Sage Digital Health" },
];

export const awards = [
  { title: "McCall MacBain Scholarship 2026 — Scholar", org: "McCall MacBain Foundation at McGill University", date: "2026", featured: true },
  { title: "Notable Thesis Project 2025 Award", org: "Ashesi University", date: "Jun 2025" },
  { title: "Health Venture Incubator Program – Winner ($40,000)", org: "Ashesi University", date: "Sep 2024 – Apr 2025" },
  { title: "AfyaAI Technologies – Best Innovative Business ($1,000)", org: "1st Pan African AI Summit", date: "Sep 2025" },
  { title: "Mastercard Entrepreneurship Fund ($1,000)", org: "Mastercard Foundation", date: "2025" },
  { title: "Dean's List", org: "Ashesi University", date: "Sep 2023 – Jun 2025" },
  { title: "Best Student Employee", org: "Ashesi University", date: "Dec 2024" },
  { title: "Coca-Cola Funds – Winner ($2,000)", org: "Ashesi University", date: "Apr 2023" },
  { title: "Second Place – Graphic User Design Competition", org: "Ashesi University", date: "Sep 2022" },
  { title: "Third Place – Google Developer Club Hackathon", org: "Ashesi University", date: "Jun 2022" },
  { title: "MasterCard Foundation Scholar Program", org: "Ashesi University", date: "Jan 2022" },
];

export const publications = [
  {
    title: "A Low-Cost Artificial Intelligence Powered Breath Analyzer for Early Chronic Obstructive Pulmonary Disease Detection in Resource-Limited Environments",
    venue: "Sage Digital Health Journal",
    date: "2026",
    link: "https://journals.sagepub.com/doi/epdf/10.1177/20552076261429627",
  },
];

export const rolesAbout = [
  "Software Engineer & Backend/Full-stack Developer",
  "AI/ML Builder focused on HealthTech and socially impactful systems",
  "Founder, Hopscof Inc. (non-profit upskilling youth in IT/ML)",
  "Co-founder & IT Manager, myScholarsHUB",
  "Founder & CEO, AfyaAI Technologies (AI health innovations in Ghana)",
  "Executive Director & Senior Developer, Emegroups (one-stop merchant solution provider)",
];

export const achievementsAbout = [
  "Built 90+ projects across AI, SaaS, mobile, and web",
  "Shipped hosted products with real users — MyScholarsHub, AfyaAI Technologies, Church Platform, RoboQuest",
  "Mentored 100+ youth in web, mobile, and ML (Hopscof)",
];

export const softwareJourney = {
  roles: [
    "Backend Engineer / Full-stack Developer (Laravel, FastAPI, Node.js, React, PostgreSQL)",
    "AI/ML Developer (classification, CV, predictive modeling)",
    "Mobile Developer (Flutter + Firebase/GCP)",
  ],
  categories: [
    {
      name: "Hosted & Live",
      items: [
        { name: "MyScholarsHub", desc: "Opportunity discovery platform connecting students to scholarships and programs.", live: links.hosted.myscholars },
        { name: "AfyaAI Technologies", desc: "AI health innovations hub (Ghana).", live: links.hosted.afya, logo: true },
        { name: "Church Platform", desc: "Digital platform for church content & engagement.", live: links.hosted.church },
        { name: "RoboQuest Arena", desc: "Kahoot-style game system connected to robots.", live: links.hosted.roboquest },
        { name: "PAAIS Junior AI Chat Bot", desc: "AI chat assistant for the Pan African AI Summit.", live: links.hosted.panafrican_ai_chat_bot },
      ],
    },
    {
      name: "AI/ML & Data",
      items: [
        { name: "Custom RAG for COPD Validation", desc: "Retrieval pipeline supporting COPD result validation.", repo: links.github },
        { name: "LangChain Marketing AI", desc: "AI-driven conversational marketing — personalises recommendations and guides patients to best purchasing decisions.", repo: links.github },
        { name: "Sentiment App", desc: "Text sentiment analysis UI for quick insights.", repo: links.github },
        { name: "Weather Prediction App", desc: "Time-series/ML-based forecast demo.", repo: links.github },
      ],
    },
    {
      name: "HealthTech",
      items: [
        { name: "Breathwise (Diagnostic Suite)", desc: "AI-assisted breath-biomarker analysis for early COPD risk indication.", live: links.hosted.afya },
        { name: "Report Apps with QR", desc: "Field data capture & verification for clinics/NGOs via QR.", repo: links.github },
        { name: "Custom RAG for COPD Results", desc: "Knowledge retrieval supporting diagnostic context.", repo: links.github },
      ],
    },
    {
      name: "EdTech",
      items: [
        { name: "SignWithMe", desc: "Sign-language learning with TTS, STT, and sign-to-text features.", repo: links.github },
      ],
    },
    {
      name: "SaaS / Business Systems",
      items: [
        { name: "Nosmay E-Commerce Platform", desc: "Full e-commerce platform — product catalog, cart, orders, and payments with LangChain AI marketing.", repo: links.github },
        { name: "Insurance SaaS", desc: "Policy management, claims processing, role-based access, and analytics.", repo: links.github },
        { name: "Payroll System", desc: "SME-focused payroll — pay runs, tax, compliance, and reporting.", repo: links.github },
        { name: "Chore Management System", desc: "Shared responsibility tracking for homes/teams.", repo: links.github },
        { name: "Hostel Management Application", desc: "Rooming, requests, and billing workflows.", repo: links.github },
        { name: "Report Applications (QR)", desc: "Secure field data capture & verification via QR.", repo: links.github },
      ],
    },
    {
      name: "Mobile & Utilities",
      items: [
        { name: "Buddy Finding / Trail App", desc: "Lightweight social/location discovery.", repo: links.github },
      ],
    },
    {
      name: "Clones / Practice",
      items: [
        { name: "Amazon Clone", desc: "E-commerce architecture and UX practice.", repo: links.github },
        { name: "Disney Clone", desc: "Media catalog & auth practice.", repo: links.github },
        { name: "Gmail Clone", desc: "Mail UI/threads practice.", repo: links.github },
      ],
    },
  ],
};

export const leadership = {
  roles: [
    "Resident Assistant (Aug 2022 – Jun 2025)",
    "Artificial Intelligence Club Lead, Ashesi (Dec 2023 – Dec 2024)",
    "Google DSC – Mobile Track Co-Lead (Sep 2022 – Dec 2023)",
    "Founder, Hopscof Inc. (Dec 2022 – Present)",
    "Co-founder & IT Manager, myScholarsHUB (May 2023 – Present)",
    "Social Media Manager & Career Peer Advisor (Sep 2022 – Jun 2025)",
    "Graphic Design Specialist (Aug 2022 – Jun 2025)",
  ],
  achievements: [
    "Mentored 100+ learners across Ghana and beyond",
    "Built club-industry bridges and peer mentorship programs",
    "Improved university event reach by ~20% via design & comms",
  ],
};

export const university = {
  roles: [
    "Health Aider, Natembea Health Center (Jan 2024 – May 2025)",
    "Career Peer Advisor (Sep 2023 – Apr 2025)",
    "Senior Resident Assistant (Aug 2023 – May 2025)",
    "Founder & Lead, Ashesi AI Club (Dec 2023 – Dec 2024)",
    "Co-Lead Table Tennis Club (Jan 2024 – Dec 2024)",
    "Co-Lead Mobile Track, Google DSC Ashesi (Jan – Dec 2023)",
    "Career Development & Entrepreneurship Assistant (Jul 2022 – Apr 2023)",
    "AIX Senior Robotics Coach (Jun – Aug 2025)",
    "AIX Robotics Coach (Jun – Jul 2023)",
  ],
  achievements: [
    "Balanced intensive leadership roles with academics and shipped real products",
    "Organized 10+ tech talks, hackathons, and workshops",
    "Mentored 50+ students in AI, mobile, and web development",
    "Led Ashesi AI Club to 100+ members and 5+ events in first year",
    "Achieved Dean's List recognition for academic excellence from 2023 to 2025",
    "Built career resources and led workshops benefiting 400+ students",
    "Designed and implemented entrepreneurship programs supporting 20+ student ventures",
    "Delivered hands-on robotics (VEX/LEGO), embedded systems (Arduino/ESP32), and software integrations",
  ],
};

export const research = [
  {
    title: "Hand Sign → Gesture Recognition (SignWithMe)",
    body: "Assistive learning platform combining Computer Vision with TTS, STT, and sign-to-text to support inclusive classrooms.",
    org: "Applied Methods and Research Experience, United States",
  },
  {
    title: "Breathwise: COPD Early-Risk Indication via Breath Biomarkers",
    body: "AI-assisted pipeline using breath VOCs + classification to support early COPD detection in low-resource settings (mobile-integrated).",
    org: "Ashesi University, Ghana",
  },
  {
    title: "Flood Prediction System (Cloud-based)",
    body: "Cloud ML service for early flood alerts using environmental signals and weather data streams.",
    org: "Ashesi University, Ghana",
  },
  {
    title: "Identifying High-Growth Investment Health Opportunities in the United States",
    body: "Data-driven analysis of health investment trends using financial models to assess the potential of healthcare companies.",
    org: "Enhanced Healthcare Partners, United States",
  },
];

export const currentRoles = [
  {
    status: "active" as const,
    title: "AfyaAI Technologies",
    role: "Founder & CEO — Full-Time",
    period: "2024 – Present",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/25",
    accentColor: "blue",
    bullets: [
      "Full-time focus on building AI-powered healthcare solutions in Ghana and across Africa",
      "Leading product development, research partnerships, and team growth",
      "Scaling Breathwise — AI-assisted COPD early-detection diagnostic suite",
      "Driving AfyaAI's mission: equitable healthcare technology in low-resource settings",
    ],
  },
  {
    status: "active" as const,
    title: "Emegroups",
    role: "Executive Director & Senior Developer",
    period: "May 2026 – Present",
    gradient: "from-violet-600 to-purple-500",
    shadow: "shadow-violet-500/25",
    accentColor: "violet",
    bullets: [
      "Executive Director and lead engineer at a one-stop merchant solution provider",
      "Overseeing product development, product design, and software architecture",
      "Hands-on development alongside a team of 3 developers",
      "End-to-end product strategy — from ideation and design to building and deployment",
    ],
  },
  {
    status: "past" as const,
    title: "Nosmay Company Limited",
    role: "Backend Software Engineer (Remote)",
    period: "Jan 2025 – Apr 2026",
    gradient: "from-gray-500 to-gray-400",
    shadow: "shadow-gray-400/20",
    accentColor: "gray",
    bullets: [
      "Built full e-commerce platform — product catalog, cart, orders, and payments",
      "Integrated LangChain AI marketing assistant to personalise patient product recommendations",
      "Built Insurance SaaS — policy management, claims processing, analytics",
      "Built Payroll System for SMEs — pay runs, tax compliance, reporting",
      "Database architecture design, testing/debugging, feature integration, docs, cloud deployment",
      "Earlier (Apr – Dec 2024): Business Development Unit — recruiting, market analysis, onboarding",
    ],
  },
];

export const personalGoal =
  "Pursue a PhD in AI for Health & Digital Solutions, focusing on trustworthy AI that scales in low-resource settings. Long-term: scale AfyaAI Technologies into a continental engine for equitable healthcare technology.";

export const NAV = [
  { label: "About", path: "/about", icon: "👤", desc: "Who I am, my roles and key achievements" },
  { label: "Software", path: "/software", icon: "💻", desc: "90+ projects across AI, SaaS, mobile & web" },
  { label: "Leadership", path: "/leadership", icon: "🏛", desc: "Leading teams, clubs and communities" },
  { label: "Ashesi", path: "/ashesi", icon: "🎓", desc: "My university journey at Ashesi" },
  { label: "Research", path: "/research", icon: "🔬", desc: "Applied and academic research projects" },
  { label: "Publications", path: "/publications", icon: "📄", desc: "Peer-reviewed papers and journals" },
  { label: "Awards", path: "/awards", icon: "🏆", desc: "Scholarships, prizes and recognition" },
  { label: "Currently", path: "/currently", icon: "⚡", desc: "AfyaAI Technologies & Emegroups" },
  { label: "Goal", path: "/goal", icon: "🎯", desc: "My vision for AI-powered healthcare in Africa" },
];
