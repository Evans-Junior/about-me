import React, { useMemo, useState, useEffect, useRef } from "react";

/* ── Theme ── */
function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

/* ── Scroll animation hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Reading progress bar ── */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 transition-all duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ── Reveal wrapper ── */
const Reveal: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({
  children, className = "", delay = 0,
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Primitives ── */
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section: React.FC<React.PropsWithChildren<{ id?: string; title?: string; subtitle?: string; className?: string }>> = ({
  id, title, subtitle, className = "", children,
}) => (
  <section id={id} className={`scroll-mt-24 py-14 sm:py-20 ${className}`}>
    <Container>
      {title && (
        <Reveal>
          <header className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </header>
        </Reveal>
      )}
      {children}
    </Container>
  </section>
);

const Tag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/60 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors hover:border-blue-400 hover:text-blue-600 dark:hover:text-cyan-400">
    {children}
  </span>
);

const Badge: React.FC<React.PropsWithChildren<{ tone?: "default" | "success" | "warning" | "info" | "gold" }>> = ({
  tone = "default", children,
}) => {
  const cls = {
    default: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 ring-1 ring-yellow-400/50",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
};

const Card: React.FC<React.PropsWithChildren<{ className?: string; glow?: boolean }>> = ({
  className = "", children, glow = false,
}) => (
  <div className={`
    rounded-2xl border border-gray-200/80 dark:border-zinc-700/60
    bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm p-5 shadow-sm
    transition-all duration-300 ease-out
    hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-cyan-800
    ${glow ? "hover:shadow-blue-100 dark:hover:shadow-cyan-900/30" : ""}
    ${className}
  `}>
    {children}
  </div>
);

const ExternalLink: React.FC<React.PropsWithChildren<{ href: string; label?: string }>> = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={label || href}
    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-cyan-400 underline decoration-dotted underline-offset-4 hover:decoration-solid hover:text-blue-700 dark:hover:text-cyan-300 transition-colors"
  >
    {children}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
      <path d="M12.5 2A1.5 1.5 0 0 1 14 3.5V6a1 1 0 1 1-2 0V5.414L7.707 9.707a1 1 0 0 1-1.414-1.414L10.586 4H9a1 1 0 1 1 0-2h3.5ZM5 5a2 2 0 0 0-2 2v8A2 2 0 0 0 5 17h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 1 0 0-2H5Z" />
    </svg>
  </a>
);

/* ── Data ── */
const links = {
  linkedin: "https://www.linkedin.com/in/evans-kumi/",
  github: "https://github.com/Evans-Junior?tab=repositories",
  hosted: {
    myscholars: "https://myscholarshub.org/",
    afya: "https://afya-ai-lab.vercel.app/",
    church: "https://ziontemple.vercel.app/",
    roboquest: "https://robo-quest-arena-kahoot.vercel.app/",
    panafrican_ai_chat_bot: "https://panafricanaisummit.com/",
  },
};

const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "C++", "PHP", "SQL", "Dart", "HTML", "CSS"],
  frameworks: ["Laravel", "FastAPI", "React.js", "Node.js", "Express.js", "Flutter", "Bootstrap", "Tailwind CSS", "Flask", "R (RStudio)"],
  tools: ["Git", "GitHub", "Docker", "AWS", "GCP", "Firebase", "Jira", "Figma", "Canva", "Filmora", "Microsoft 365"],
};

const awards = [
  {
    title: "McCall MacBain Scholarship 2026 — Scholar",
    org: "McCall MacBain Foundation at McGill University",
    date: "2026",
    featured: true,
  },
  { title: "Notable Thesis Project 2025 Award", org: "Ashesi University", date: "Jun 2025" },
  { title: "Health Venture Incubator Program – Winner ($40,000)", org: "Ashesi University", date: "Sep 2024 – Apr 2025" },
  { title: "AfyaAI Technologies won Best Innovative Business – Winner ($1,000)", org: "1st Pan African AI Summit", date: "Sep 2025" },
  { title: "Mastercard Entrepreneurship Fund ($1,000)", org: "Mastercard Foundation", date: "2025" },
  { title: "Dean's List", org: "Ashesi University", date: "Sep 2023 – Jun 2025" },
  { title: "Best Student Employee", org: "Ashesi University", date: "Dec 2024" },
  { title: "Coca-Cola Funds – Winner ($2,000)", org: "Ashesi University", date: "Apr 2023" },
  { title: "Second Place – Graphic User Design Competition", org: "Ashesi University", date: "Sep 2022" },
  { title: "Third Place – Google Developer Club Hackathon", org: "Ashesi University", date: "Jun 2022" },
  { title: "MasterCard Foundation Scholar Program", org: "Ashesi University", date: "Jan 2022" },
];

const publications = [
  {
    title: "A Low-Cost Artificial Intelligence Powered Breath Analyzer for Early Chronic Obstructive Pulmonary Disease Detection in Resource-Limited Environments",
    venue: "Sage Digital Health Journal",
    date: "2026",
    link: "https://journals.sagepub.com/doi/epdf/10.1177/20552076261429627",
  },
];

const rolesAbout = [
  "Software Engineer & Backend/Full-stack Developer",
  "AI/ML Builder focused on HealthTech and socially impactful systems",
  "Founder, Hopscof Inc. (non-profit upskilling youth in IT/ML)",
  "Co-founder & IT Manager, myScholarsHUB",
  "Founder, AfyaAI Technologies (AI health innovations in Ghana)",
];

const achievementsAbout = [
  "Built 80+ projects across AI, SaaS, mobile, and web",
  "Shipped hosted products with real users (MyScholarsHub, AfyaAI Technologies, Church Platform, RoboQuest)",
  "Mentored 100+ youth in web, mobile, and ML (Hopscof)",
];

const softwareJourney = {
  roles: [
    "Backend Engineer / Full-stack Developer (Laravel, FastAPI, Node.js, React, PostgreSQL)",
    "AI/ML Developer (classification, CV, predictive modeling)",
    "Mobile Developer (Flutter + Firebase/GCP)",
  ],
  categories: [
    {
      name: "Hosted",
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
        { name: "Sentiment App", desc: "Text sentiment analysis UI for quick insights.", repo: links.github },
        { name: "Weather Prediction App", desc: "Time-series/ML-based forecast demo.", repo: links.github },
      ],
    },
    {
      name: "HealthTech",
      items: [
        { name: "Breathwise (Diagnostic Suite)", desc: "AI-assisted breath-biomarker analysis for early COPD risk indication.", live: links.hosted.afya },
        { name: "Report Apps with QR", desc: "Field data capture & verification for clinics/NGOs via QR.", repo: links.github },
        { name: "Custom RAG model for validating COPD results", desc: "Knowledge retrieval supporting diagnostic context.", repo: links.github },
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
        { name: "Payroll System", desc: "SME-focused payroll (pay runs, tax, roles).", repo: links.github },
        { name: "Chore Management System", desc: "Shared responsibility tracking for homes/teams.", repo: links.github },
        { name: "Report Applications (QR)", desc: "Secure reporting & verification via QR.", repo: links.github },
        { name: "Hostel Management Application", desc: "Rooming, requests, billing workflows.", repo: links.github },
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

const leadership = {
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

const university = {
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

const research = [
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

const currently = {
  title: "Nosmay Company Limited",
  period: "Jan 2025 – Present",
  bullets: [
    "Backend Software Engineer (Remote)",
    "Building Insurance SaaS — policy, claims, roles, analytics",
    "Building Payroll System for SMEs — pay runs, compliance, reporting",
    "Contributions: Database Architecture design, testing/debugging, feature integration, docs, cloud deployment",
    "Earlier: Business Development Unit (Apr – Dec 2024) — recruiting fiber technicians, market analysis, onboarding",
  ],
};

const personalGoal =
  "Pursue a PhD in AI for Health & Digital Solutions, focusing on trustworthy AI that scales in low-resource settings. Long-term: scale AfyaAI Technologies into a continental engine for equitable healthcare technology.";

const NAV = [
  { id: "about", label: "About" },
  { id: "software", label: "Software" },
  { id: "leadership", label: "Leadership" },
  { id: "university", label: "Ashesi" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "awards", label: "Awards" },
  { id: "currently", label: "Currently" },
  { id: "goal", label: "Goal" },
];

/* ── Theme Toggle Button ── */
const ThemeToggle: React.FC<{ dark: boolean; toggle: () => void }> = ({ dark, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle theme"
    className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:scale-105 shadow-sm"
  >
    <span className={`absolute transition-all duration-300 ${dark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}>
      {/* Sun icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-500">
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.166 17.834a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06l-1.591-1.591ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.166 6.166a.75.75 0 0 0 1.06 1.06l1.591-1.59a.75.75 0 1 0-1.061-1.061l-1.59 1.591Z" />
      </svg>
    </span>
    <span className={`absolute transition-all duration-300 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}>
      {/* Moon icon */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-400">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
      </svg>
    </span>
  </button>
);

/* ── Header ── */
const Header: React.FC<{ dark: boolean; toggle: () => void }> = ({ dark, toggle }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`sticky top-[3px] z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-gray-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 shadow-sm backdrop-blur-xl" : "border-transparent bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md"}`}>
      <Container className="flex items-center justify-between py-3 max-w-none px-6">
        <a href="#top" className="group inline-flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Portfolio</p>
            <h1 className="text-sm font-bold leading-tight text-gray-900 dark:text-white">Evans Kumi</h1>
          </div>
        </a>

        <nav className="hidden gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggle} />
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gray-900 dark:bg-white px-3 py-2 text-xs font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-all duration-200 shadow-sm">
            GitHub
          </a>
          <button
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 md:hidden hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${open ? "max-h-96 border-t border-gray-100 dark:border-zinc-800" : "max-h-0"}`}>
        <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl">
          <Container className="grid gap-1 py-3">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors" onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-gray-100 dark:border-zinc-800 pt-3">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="flex-1 rounded-xl bg-gray-900 dark:bg-white px-3 py-2 text-center text-sm font-semibold text-white dark:text-gray-900">GitHub</a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
};

/* ── Featured Achievement Banner ── */
const McCallBanner: React.FC = () => (
  <Reveal>
    <div className="relative mx-4 sm:mx-6 lg:mx-8 mb-8 overflow-hidden rounded-2xl border border-yellow-300/60 dark:border-yellow-500/30 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950/40 dark:via-amber-950/30 dark:to-orange-950/20 p-5 shadow-lg shadow-yellow-100/50 dark:shadow-yellow-900/20">
      <div className="absolute top-0 right-0 h-32 w-32 -translate-y-4 translate-x-4 rounded-full bg-gradient-to-br from-yellow-300/30 to-amber-300/20 blur-2xl" />
      <div className="absolute bottom-0 left-16 h-20 w-20 translate-y-4 rounded-full bg-gradient-to-br from-orange-300/20 to-yellow-300/10 blur-xl" />
      <div className="relative flex flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md shadow-yellow-300/40 text-white text-2xl">
          🏆
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-block rounded-full bg-yellow-200 dark:bg-yellow-800/60 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-300">New Achievement · 2026</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">McCall MacBain Scholarship 2026</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">McCall MacBain Foundation at McGill University — one of Canada's most prestigious graduate scholarships</p>
        </div>
      </div>
    </div>
  </Reveal>
);

/* ── Stats counter ── */
const stats = [
  { label: "Projects Built", value: "80+", sub: "AI · SaaS · Mobile · Web" },
  { label: "Youth Mentored", value: "100+", sub: "Across Ghana & beyond" },
  { label: "Awards & Grants", value: "$44K+", sub: "Funding raised" },
  { label: "Publications", value: "1", sub: "Sage Digital Health" },
];

/* ── Photo / Game section ── */
const PhotoGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPos({ x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleCatch = () => {
    setScore((s) => s + 1);
    setIsGlitching(true);
    setPos({ x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 });
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <section className="py-10">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center">
            <div className="mb-5 flex items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 px-5 py-2 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Catch the Code</span>
              <span className="font-mono text-sm font-bold text-blue-600 dark:text-cyan-400">{score}</span>
              {score >= 10 && <span className="text-xs font-semibold text-emerald-500 animate-bounce">Master! 🚀</span>}
            </div>

            <div className="relative group w-full max-w-4xl aspect-video overflow-hidden rounded-3xl border-2 border-white/80 dark:border-zinc-800 shadow-2xl shadow-black/20">
              <img
                src="/me.jpeg"
                alt="Evans Kumi"
                className={`h-full w-full object-cover object-top transition-all duration-300 ${isGlitching ? "scale-105 blur-sm brightness-90" : "scale-100"}`}
              />
              <button
                onMouseEnter={handleCatch}
                onClick={handleCatch}
                className="absolute z-30 flex h-12 w-12 cursor-crosshair items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl transition-all duration-500 ease-out hover:scale-125 hover:shadow-blue-500/50"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <span className="font-mono text-base font-bold">{"</>"}</span>
              </button>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-7 text-white">
                <h3 className="text-xl font-bold tracking-tight">Evans Kumi</h3>
                <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300 font-semibold">Builder · Innovator</p>
              </div>
              {/* AfyaAI logo badge */}
              <div className="absolute top-5 right-5 flex items-center gap-2 rounded-xl bg-black/40 backdrop-blur-md px-3 py-2 border border-white/20">
                <img src="/app_icon.png" alt="AfyaAI Technologies" className="h-7 w-7 rounded-lg object-cover" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">AfyaAI</span>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.06)_50%)] bg-[length:100%_4px] opacity-40" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

/* ── Main App ── */
export default function App() {
  const { dark, toggle } = useTheme();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-900 antialiased dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <ReadingProgress />
      <Header dark={dark} toggle={toggle} />

      {/* Hero */}
      <section className="scroll-mt-24 pt-14 pb-6 sm:pt-20 sm:pb-8">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge tone="info">Software Engineer · AI/ML Builder · HealthTech Innovator</Badge>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                  Building{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    ethical, scalable
                  </span>{" "}
                  software for people.
                </h2>
                <p className="mt-4 max-w-xl text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I design and ship practical systems across HealthTech, EdTech, and business software — from AI-assisted diagnostics
                  (Breathwise) to opportunity platforms (MyScholarsHub) and robotics-connected learning (RoboQuest Arena).
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Connect on LinkedIn
                  </a>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-gray-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Explore 80+ Projects
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {skills.languages.slice(0, 7).map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>

              <Card className="lg:ml-auto" glow>
                <div className="mb-4 flex items-center gap-3">
                  <img src="/app_icon.png" alt="AfyaAI Technologies" className="h-10 w-10 rounded-xl object-cover shadow-sm border border-gray-100 dark:border-zinc-700" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Founder · AfyaAI Technologies</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">AI health innovations, Ghana</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {skills.frameworks.slice(0, 9).map((s) => (
                    <div key={s} className="rounded-xl border border-gray-200 dark:border-zinc-700/60 bg-gray-50 dark:bg-zinc-800/50 p-2.5 text-center text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-cyan-600 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {s}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                  Also: {skills.tools.slice(0, 6).join(" · ")}, …
                </p>
              </Card>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-4 text-center backdrop-blur-sm hover:border-blue-200 dark:hover:border-cyan-800 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{s.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{s.label}</div>
                  <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* McCall MacBain Banner */}
      <McCallBanner />

      {/* Photo Game */}
      <PhotoGame />

      {/* About */}
      <Section id="about" title="About Evans Kumi">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={0}>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                Roles
              </h3>
              <ul className="space-y-2">
                {rolesAbout.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
                Key Achievements
              </h3>
              <ul className="space-y-2">
                {achievementsAbout.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Software Journey */}
      <Section id="software" title="My Software Engineering Journey" subtitle="Selected projects grouped by category. Many more on GitHub.">
        <Reveal>
          <Card className="mb-6">
            <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
              Engineering Roles
            </h3>
            <ul className="space-y-2">
              {softwareJourney.roles.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <div className="grid gap-8">
          {softwareJourney.categories.map((cat, ci) => (
            <Reveal key={cat.name} delay={ci * 50}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{cat.name}</h4>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
                  {cat.name === "Hosted" && <Badge tone="success">Live</Badge>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((p) => (
                    <Card key={p.name} glow>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {"logo" in p && p.logo && (
                            <img src="/app_icon.png" alt="AfyaAI" className="h-6 w-6 rounded-lg object-cover flex-shrink-0 border border-gray-100 dark:border-zinc-700" />
                          )}
                          <h5 className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</h5>
                        </div>
                        {"live" in p && p.live ? <Badge tone="info">Live</Badge> : <Badge>GitHub</Badge>}
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                      <div className="mt-3">
                        {"live" in p && p.live
                          ? <ExternalLink href={p.live as string}>Open Project</ExternalLink>
                          : <ExternalLink href={(p as any).repo || links.github}>View on GitHub</ExternalLink>}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            Explore all repositories →{" "}
            <ExternalLink href={links.github}>github.com/Evans-Junior</ExternalLink>
          </p>
        </Reveal>
      </Section>

      {/* Leadership */}
      <Section id="leadership" title="Leadership & Servantship">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-500" />
                Roles
              </h3>
              <ul className="space-y-2">
                {leadership.roles.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-pink-500 to-rose-500" />
                Achievements
              </h3>
              <ul className="space-y-2">
                {leadership.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Ashesi Journey */}
      <Section id="university" title="Life at University — Ashesi Journey">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-orange-500 to-amber-500" />
                Roles
              </h3>
              <ul className="space-y-2">
                {university.roles.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={100}>
            <Card glow>
              <h3 className="mb-3 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-teal-500" />
                Achievements
              </h3>
              <ul className="space-y-2">
                {university.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Research */}
      <Section id="research" title="Research">
        <div className="grid gap-4 sm:grid-cols-2">
          {research.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <Card glow className="h-full">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{r.title}</h4>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.body}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-blue-500 dark:text-cyan-500">{r.org}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications">
        <div className="grid gap-4">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Card glow>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{p.title}</h4>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{p.date}</p>
                  </div>
                  <Badge tone="info">{p.venue}</Badge>
                </div>
                <div className="mt-4">
                  <ExternalLink href={p.link}>Read Publication</ExternalLink>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section id="awards" title="Achievements & Awards">
        <div className="grid gap-3">
          {awards.map((a, idx) => (
            <Reveal key={idx} delay={idx * 40}>
              {"featured" in a && a.featured ? (
                <div className="relative overflow-hidden rounded-2xl border border-yellow-300/70 dark:border-yellow-600/40 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 p-4 shadow-md shadow-yellow-100/60 dark:shadow-yellow-900/10 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-20 select-none">🏆</div>
                  <div className="flex flex-wrap items-center justify-between gap-2 relative">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🏆</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">{a.org}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="gold">{a.date}</Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{a.title}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="default">{a.org}</Badge>
                      <Badge tone="warning">{a.date}</Badge>
                    </div>
                  </div>
                </Card>
              )}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Currently */}
      <Section id="currently" title="Currently">
        <Reveal>
          <Card glow>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/25">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-white">
                  <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clipRule="evenodd" />
                  <path d="M3 15.055v-.144c.97.49 2.006.91 3.114 1.255 2.145.659 4.553.859 6.886.859 2.333 0 4.741-.2 6.886-.859A22.065 22.065 0 0 0 21 14.911v.144c0 1.321-.947 2.489-2.294 2.676A41.047 41.047 0 0 1 12 18c-2.43 0-4.793-.394-6.706-1.269A2.52 2.52 0 0 1 3 14.055Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{currently.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mt-0.5">{currently.period}</p>
                <ul className="mt-3 space-y-2">
                  {currently.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Personal Goal */}
      <Section id="goal" title="My Personal Goal">
        <Reveal>
          <Card glow className="relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl" />
            <div className="flex items-start gap-4 relative">
              <div className="flex-shrink-0 mt-1 text-3xl">🎯</div>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{personalGoal}</p>
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-zinc-800 py-12">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <img src="/app_icon.png" alt="AfyaAI Technologies" className="h-7 w-7 rounded-lg object-cover border border-gray-100 dark:border-zinc-700" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Evans Kumi</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-600">© {year} Evans Kumi. All rights reserved.</p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">McCall MacBain Scholar 2026 · AfyaAI Technologies Founder</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ExternalLink href="mailto:kwakukumi14@gmail.com">Email</ExternalLink>
                <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
                <ExternalLink href={links.github}>GitHub</ExternalLink>
                <ExternalLink href={links.hosted.myscholars}>MyScholarsHub</ExternalLink>
                <ExternalLink href={links.hosted.afya}>AfyaAI Technologies</ExternalLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </footer>
    </div>
  );
}
