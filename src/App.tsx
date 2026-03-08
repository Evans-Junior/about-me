import React, { useMemo, useState } from "react";

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Section: React.FC<
  React.PropsWithChildren<{
    id?: string;
    title?: string;
    subtitle?: string;
    className?: string;
  }>
> = ({ id, title, subtitle, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-12 sm:py-16 ${className}`}>
    <Container>
      {title && (
        <header className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </Container>
  </section>
);

const Tag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium leading-5">
    {children}
  </span>
);

const Badge: React.FC<
  React.PropsWithChildren<{ tone?: "default" | "success" | "warning" | "info" }>
> = ({ tone = "default", children }) => {
  const toneClasses = {
    default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
    success:
      "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100",
    warning:
      "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100",
    info: "bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${toneClasses}`}
    >
      {children}
    </span>
  );
};

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <div
    className={`rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur dark:bg-zinc-900/60 ${className}`}
  >
    {children}
  </div>
);

const ExternalLink: React.FC<
  React.PropsWithChildren<{ href: string; label?: string }>
> = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer noopener"
    aria-label={label || href}
    className="inline-flex items-center gap-1 font-medium underline decoration-dotted underline-offset-4 hover:decoration-solid"
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="ml-0.5 h-4 w-4"
    >
      <path d="M12.5 2A1.5 1.5 0 0 1 14 3.5V6a1 1 0 1 1-2 0V5.414L7.707 9.707a1 1 0 0 1-1.414-1.414L10.586 4H9a1 1 0 1 1 0-2h3.5ZM5 5a2 2 0 0 0-2 2v8A2 2 0 0 0 5 17h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 1 0 0-2H5Z" />
    </svg>
  </a>
);

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
  languages: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C++",
    "PHP",
    "SQL",
    "Dart",
    "HTML",
    "CSS",
  ],
  frameworks: [
    "Django",
    "FastAPI",
    "React.js",
    "Node.js",
    "Express.js",
    "Flutter",
    "Bootstrap",
    "Tailwind CSS",
    "Flask",
    "Laravel",
    "R (RStudio)",
  ],
  tools: [
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "GCP",
    "Firebase",
    "Jira",
    "Figma",
    "Canva",
    "Filmora",
    "Microsoft 365",
  ],
};

const awards = [
  {
    title: "Finalist – McCall MacBain Scholarship for Graduate Studies",
    org: "McCall MacBain at McGill University",
    date: "Feb 2026",
  },
  {
    title: "Notable Thesis Project 2025 Award",
    org: "Ashesi University",
    date: "Jun 2025",
  },
  {
    title: "Health Venture Incubator Program – Winner ($40,000)",
    org: "Ashesi University",
    date: "Sep 2024 – Apr 2025",
  },
  {
    title: "AfyaAI Technologies won Best Innovative Business - Winner ($1,000)",
    org: "1st Pan African AI Submit",
    date: "Sep 2025",
  },
  {
    title: "Mastercard Entrepreneurship Fund ($1,000)",
    org: "Mastercard Foundation",
    date: "2025",
  },
  {
    title: "Dean’s List",
    org: "Ashesi University",
    date: "Sep 2023 – Jun 2025",
  },
  {
    title: "Best Student Employee",
    org: "Ashesi University",
    date: "Dec 2024",
  },
  {
    title: "Coca-Cola Funds – Winner ($2,000)",
    org: "Ashesi University",
    date: "Apr 2023",
  },
  {
    title: "Second Place – Graphic User Design Competition",
    org: "Ashesi University",
    date: "Sep 2022",
  },
  {
    title: "Third Place – Google Developer Club Hackathon",
    org: "Ashesi University",
    date: "Jun 2022",
  },
  {
    title: "MasterCard Foundation Scholar Program",
    org: "Ashesi University",
    date: "Jan 2022",
  },
];

const rolesAbout = [
  "Software Engineer & Backend/Full‑stack Developer",
  "AI/ML Builder focused on HealthTech and socially impactful systems",
  "Founder, Hopscof Inc. (non‑profit upskilling youth in IT/ML)",
  "Co‑founder & IT Manager, myScholarsHUB",
  "Founder, AfyaAI Technologies (AI health innovations in Ghana)",
];

const achievementsAbout = [
  "Built 80+ projects across AI, SaaS, mobile, and web",
  "Shipped hosted products with real users (MyScholarsHub, AfyaAI Technologies, Church Platform, RoboQuest)",
  "Mentored 100+ youth in web, mobile, and ML (Hopscof)",
];

const softwareJourney = {
  roles: [
    "Backend Engineer / Full‑stack Developer (Django, FastAPI, Node.js, React, PostgreSQL)",
    "AI/ML Developer (classification, CV, predictive modeling)",
    "Mobile Developer (Flutter + Firebase/GCP)",
  ],
  categories: [
    {
      name: "Hosted",
      items: [
        {
          name: "MyScholarsHub",
          desc: "Opportunity discovery platform connecting students to scholarships and programs.",
          live: links.hosted.myscholars,
        },
        {
          name: "AfyaAI Technologies",
          desc: "AI health innovations hub (Ghana).",
          live: links.hosted.afya,
        },
        {
          name: "Church Platform",
          desc: "Digital platform for church content & engagement.",
          live: links.hosted.church,
        },
        {
          name: "RoboQuest Arena",
          desc: "Kahoot‑style game system connected to robots.",
          live: links.hosted.roboquest,
        },
        {
          name: "PAAIS Junior AI Chat Bot",
          desc: "AI chat assistant for the Pan African AI Summit.",
          live: links.hosted.panafrican_ai_chat_bot,
        },
      ],
    },
    {
      name: "AI/ML & Data",
      items: [
        {
          name: "Custom RAG for COPD Validation",
          desc: "Retrieval pipeline supporting COPD result validation.",
          repo: links.github,
        },
        {
          name: "Sentiment App",
          desc: "Text sentiment analysis UI for quick insights.",
          repo: links.github,
        },
        {
          name: "Weather Prediction App",
          desc: "Time‑series/ML‑based forecast demo.",
          repo: links.github,
        },
      ],
    },
    {
      name: "HealthTech",
      items: [
        {
          name: "Breathwise (Diagnostic Suite)",
          desc: "AI‑assisted breath‑biomarker analysis for early COPD risk indication.",
          live: links.hosted.afya,
        },
        {
          name: "Report Apps with QR",
          desc: "Field data capture & verification for clinics/NGOs via QR.",
          repo: links.github,
        },
        {
          name: "Custom RAG model for validating COPD results",
          desc: "Knowledge retrieval supporting diagnostic context.",
          repo: links.github,
        },
      ],
    },
    {
      name: "EdTech",
      items: [
        {
          name: "SignWithMe",
          desc: "Sign‑language learning with TTS, STT, and sign‑to‑text features.",
          repo: links.github,
        },
      ],
    },
    {
      name: "SaaS / Business Systems",
      items: [
        {
          name: "Payroll System",
          desc: "SME‑focused payroll (pay runs, tax, roles).",
          repo: links.github,
        },
        {
          name: "Chore Management System",
          desc: "Shared responsibility tracking for homes/teams.",
          repo: links.github,
        },
        {
          name: "Report Applications (QR)",
          desc: "Secure reporting & verification via QR.",
          repo: links.github,
        },
        {
          name: "Hostel Management Application",
          desc: "Rooming, requests, billing workflows.",
          repo: links.github,
        },
      ],
    },
    {
      name: "Mobile & Utilities",
      items: [
        {
          name: "Buddy Finding / Trail App",
          desc: "Lightweight social/location discovery.",
          repo: links.github,
        },
      ],
    },
    {
      name: "Clones / Practice",
      items: [
        {
          name: "Amazon Clone",
          desc: "E‑commerce architecture and UX practice.",
          repo: links.github,
        },
        {
          name: "Disney Clone",
          desc: "Media catalog & auth practice.",
          repo: links.github,
        },
        {
          name: "Gmail Clone",
          desc: "Mail UI/threads practice.",
          repo: links.github,
        },
      ],
    },
  ],
};

const leadership = {
  roles: [
    "Resident Assistant (Aug 2022 – Jun 2025)",
    "Artificial Intelligence Club Lead, Ashesi (Dec 2023 – Dec 2024)",
    "Google DSC – Mobile Track Co‑Lead (Sep 2022 – Dec 2023)",
    "Founder, Hopscof Inc. (Dec 2022 – Present)",
    "Co‑founder & IT Manager, myScholarsHUB (May 2023 – Present)",
    "Social Media Manager & Career Peer Advisor (Sep 2022 – Jun 2025)",
    "Graphic Design Specialist (Aug 2022 – Jun 2025)",
  ],
  achievements: [
    "Mentored 100+ learners across Ghana and beyond",
    "Built club‑industry bridges and peer mentorship programs",
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
    "Achieved Dean’s List recognition for academic excellence from 2023 to 2025",
    "Built career resources and led workshops benefiting 400+ students",
    "Designed and implemented entrepreneurship programs supporting 20+ student ventures",
    "Delivered hands‑on robotics (VEX/LEGO), embedded systems (Arduino/ESP32), and software integrations",
  ],
};

const research = [
  {
    title: "Hand Sign → Gesture Recognition (SignWithMe)",
    body: "Assistive learning platform combining Computer Vision with TTS, STT, and sign‑to‑text to support inclusive classrooms.",
    organization: "Applied Methods and Research Experience, United States",
  },
  {
    title: "Breathwise: COPD Early‑Risk Indication via Breath Biomarkers",
    body: "AI‑assisted pipeline using breath VOCs + classification to support early COPD detection in low‑resource settings (mobile‑integrated).",
    organization: "Ashesi University, Ghana",
  },
  {
    title: "Flood Prediction System (Cloud‑based)",
    body: "Cloud ML service for early flood alerts using environmental signals and weather data streams.",
    organization: "Ashesi University, Ghana",
  },
  {
    title:
      "Identifying high growth Investment Health opportunities in the Unites States",
    body: "Data‑driven analysis of health investment trends using data-driven analyses and financial models to assess the potential of healthcare companies",
    organization: "Enhanced Healthcare Partners, United States",
  },
];

const currently = {
  title: "Currently — Nosmay Company Limited (Jan 2025 – Present)",
  bullets: [
    "Backend Software Engineer (Remote)",
    "Building Insurance SaaS (policy, claims, roles, analytics)",
    "Building Payroll System for SMEs (pay runs, compliance, reporting)",
    "Contributions: Database Architecture design, testing/debugging, feature integration, docs, cloud deployment",
    "Earlier: Business Development Unit (Apr – Dec 2024) recruiting fiber technicians, market analysis, onboarding",
  ],
};

const personalGoal =
  "Pursue a PhD in AI for Health & Digital Solutions, focusing on trustworthy AI that scales in low‑resource settings. Long‑term: scale AfyaAI Technologies into a continental engine for equitable healthcare technology.";

const NAV = [
  { id: "about", label: "About" },
  { id: "software", label: "Software Journey" },
  { id: "leadership", label: "Leadership" },
  { id: "university", label: "Ashesi Journey" },
  { id: "research", label: "Research" },
  { id: "awards", label: "Awards" },
  { id: "currently", label: "Currently" },
  { id: "goal", label: "Personal Goal" },
];

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-zinc-950/70">
      <Container className="flex items-center justify-between py-3">
        <a href="#top" className="group inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400" />
          <div>
            <p className="text-sm leading-none text-muted-foreground">
              Portfolio
            </p>
            <h1 className="text-base font-semibold leading-tight">
              Evans Kumi
            </h1>
          </div>
        </a>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            LinkedIn
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
          >
            GitHub
          </a>
          <button
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span>≡</span>
          </button>
        </div>
      </Container>
      {open && (
        <div className="border-t bg-white/90 backdrop-blur md:hidden dark:bg-zinc-950/70">
          <Container className="grid gap-2 py-3">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-lg px-2 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
};

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <div
      id="top"
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 antialiased dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100"
    >
      <Header />

      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Badge tone="info">
                Software Engineer • AI/ML Builder • HealthTech Innovator
              </Badge>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Building ethical, useful, and scalable software for people.
              </h2>
              <p className="mt-3 max-w-prose text-base text-muted-foreground">
                I design and ship practical systems across HealthTech, EdTech,
                and business software thats' from AI‑assisted diagnostics
                (Breathwise) to opportunity platforms (MyScholarsHub) and
                robotics‑connected learning (RoboQuest Arena).
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-black"
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  Explore 80+ Projects
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.languages.slice(0, 7).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
            <Card className="md:ml-auto">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {skills.frameworks.slice(0, 9).map((s) => (
                  <div
                    key={s}
                    className="rounded-xl border p-3 text-center text-sm font-medium"
                  >
                    {s}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Also: {skills.tools.slice(0, 6).join(" · ")}, …
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section id="about" title="About Evans Kumi">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Roles</h3>
            <ul className="list-inside list-disc space-y-1">
              {rolesAbout.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Achievements</h3>
            <ul className="list-inside list-disc space-y-1">
              {achievementsAbout.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="software"
        title="My Software Engineering Journey"
        subtitle="Selected projects grouped by category. Many more on GitHub."
      >
        <Card className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Roles</h3>
          <ul className="list-inside list-disc space-y-1">
            {softwareJourney.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-6">
          {softwareJourney.categories.map((cat) => (
            <div key={cat.name} className="">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-base font-semibold">{cat.name}</h4>
                {cat.name === "Hosted" && <Badge tone="success">Live</Badge>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((p) => (
                  <Card key={p.name}>
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-semibold">{p.name}</h5>
                      {"live" in p && p.live ? (
                        <Badge tone="info">Hosted</Badge>
                      ) : (
                        <Badge>GitHub</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="mt-3">
                      {"live" in p && p.live ? (
                        <ExternalLink href={p.live as string}>
                          Open Project
                        </ExternalLink>
                      ) : (
                        <ExternalLink href={(p as any).repo || links.github}>
                          View on GitHub
                        </ExternalLink>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Explore all repositories →{" "}
          <ExternalLink href={links.github}>
            github.com/Evans-Junior
          </ExternalLink>
        </p>
      </Section>

      <Section id="leadership" title="Leadership and Servantship">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Roles</h3>
            <ul className="list-inside list-disc space-y-1">
              {leadership.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Achievements</h3>
            <ul className="list-inside list-disc space-y-1">
              {leadership.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="university" title="Life at University (Ashesi Journey)">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Roles</h3>
            <ul className="list-inside list-disc space-y-1">
              {university.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-2 text-lg font-semibold">Achievements</h3>
            <ul className="list-inside list-disc space-y-1">
              {university.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="research" title="Research">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {research.map((r) => (
            <Card key={r.title}>
              <h4 className="text-sm font-semibold">{r.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="awards" title="Achievements & Awards">
        <div className="grid gap-4">
          {awards.map((a, idx) => (
            <Card key={idx}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">{a.title}</p>
                <div className="flex items-center gap-2">
                  <Badge tone="default">{a.org}</Badge>
                  <Badge tone="warning">{a.date}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="currently" title="Currently">
        <Card>
          <h3 className="text-lg font-semibold">{currently.title}</h3>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {currently.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section id="goal" title="My Personal Goal">
        <Card>
          <p className="text-base">{personalGoal}</p>
        </Card>
      </Section>

      <footer className="border-t py-10 text-sm">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p>© {year} Evans Kumi. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-3">
              <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
              <ExternalLink href={links.github}>GitHub</ExternalLink>
              <ExternalLink href={links.hosted.myscholars}>
                MyScholarsHub
              </ExternalLink>
              <ExternalLink href={links.hosted.afya}>AfyaAI Technologies</ExternalLink>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
