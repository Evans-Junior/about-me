import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NAV, links, stats, currentRoles, skills } from "../data";
import { Container, Reveal, Card, Badge, Tag } from "../ui";

/* ── Catch-the-code game ── */
function PhotoGame() {
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setPos({ x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 }), 1200);
    return () => clearInterval(id);
  }, []);

  const catch_ = () => {
    setScore((s) => s + 1);
    setGlitch(true);
    setPos({ x: Math.random() * 70 + 15, y: Math.random() * 70 + 15 });
    setTimeout(() => setGlitch(false), 300);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 px-5 py-2 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Catch the Code</span>
        <span className="font-mono text-sm font-bold text-blue-600 dark:text-cyan-400">{score}</span>
        {score >= 10 && <span className="text-xs font-semibold text-emerald-500 animate-bounce">Master! 🚀</span>}
      </div>
      <div className="relative w-full max-w-2xl aspect-video overflow-hidden rounded-3xl border-2 border-white/80 dark:border-zinc-800 shadow-2xl shadow-black/20">
        <img
          src="/me.jpeg"
          alt="Evans Kumi"
          className={`h-full w-full object-cover object-top transition-all duration-300 ${glitch ? "scale-105 blur-sm brightness-90" : "scale-100"}`}
        />
        <button
          onMouseEnter={catch_}
          onClick={catch_}
          className="absolute z-30 flex h-11 w-11 cursor-crosshair items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl transition-all duration-500 ease-out hover:scale-125"
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}
        >
          <span className="font-mono text-base font-bold">{"</>"}</span>
        </button>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-6 text-white">
          <p className="text-lg font-bold tracking-tight">Evans Kumi</p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300 font-semibold">Builder · Innovator · Scholar</p>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-xl bg-black/40 backdrop-blur-md px-3 py-2 border border-white/20">
          <img src="/app_icon.png" alt="AfyaAI" className="h-6 w-6 rounded-lg object-cover" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">AfyaAI</span>
        </div>
      </div>
    </div>
  );
}

/* ── McCall MacBain banner ── */
function McCallBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-yellow-300/60 dark:border-yellow-500/30 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-950/40 dark:via-amber-950/30 dark:to-orange-950/20 p-5 shadow-lg shadow-yellow-100/50 dark:shadow-yellow-900/20">
        <div className="absolute top-0 right-0 h-32 w-32 -translate-y-4 translate-x-4 rounded-full bg-gradient-to-br from-yellow-300/30 to-amber-300/20 blur-2xl pointer-events-none" />
        <div className="relative flex flex-wrap items-center gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 shadow-md shadow-yellow-300/40 text-2xl">🏆</div>
          <div className="flex-1 min-w-0">
            <span className="inline-block rounded-full bg-yellow-200 dark:bg-yellow-800/60 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-yellow-800 dark:text-yellow-300 mb-1">New Achievement · 2026</span>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">McCall MacBain Scholarship 2026 — Scholar</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">McCall MacBain Foundation at McGill University — one of Canada's most prestigious graduate scholarships</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Domain cards ── */
const domains = [
  {
    icon: "🏥",
    title: "HealthTech AI",
    desc: "Building AI-powered diagnostics for COPD, field data tools for clinics, and scalable health infrastructure for Africa.",
    gradient: "from-blue-600 to-cyan-500",
    path: "/software",
  },
  {
    icon: "🛠",
    title: "Software Engineering",
    desc: "90+ projects spanning full-stack web, mobile (Flutter), backend APIs, SaaS platforms, and e-commerce.",
    gradient: "from-violet-600 to-purple-500",
    path: "/software",
  },
  {
    icon: "🌍",
    title: "Leadership & Community",
    desc: "Mentored 100+ youth, led the Ashesi AI Club, founded Hopscof Inc., and built peer mentorship networks.",
    gradient: "from-emerald-600 to-teal-500",
    path: "/leadership",
  },
  {
    icon: "🔬",
    title: "Research & Publications",
    desc: "Published in Sage Digital Health Journal. Research spans COPD breath analysis, sign-language AI, flood prediction, and health investment.",
    gradient: "from-rose-600 to-pink-500",
    path: "/research",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <Badge tone="info">Software Engineer · AI/ML Builder · HealthTech Innovator</Badge>
                <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                  Building{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    ethical, scalable
                  </span>
                  <br />software for Africa.
                </h1>
                <p className="mt-5 max-w-xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I design and ship practical systems that solve real problems — from AI-assisted COPD diagnostics (Breathwise) to scholarship platforms (MyScholarsHub) and merchant solutions (EmeGroups).
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Connect on LinkedIn
                  </a>
                  <Link
                    to="/software"
                    className="rounded-xl border border-gray-200 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Explore 90+ Projects
                  </Link>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {skills.languages.slice(0, 7).map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <PhotoGame />
            </Reveal>
          </div>

          {/* Stats */}
          <Reveal delay={200}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
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

      {/* ── McCall MacBain ── */}
      <section className="pb-10">
        <Container>
          <McCallBanner />
        </Container>
      </section>

      {/* ── What I Build ── */}
      <section className="py-14 bg-gray-50/80 dark:bg-zinc-900/40">
        <Container>
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">What I Build</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Four domains where I create real impact.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {domains.map((d, i) => (
              <Reveal key={d.title} delay={i * 70}>
                <Link to={d.path} className="group block h-full">
                  <Card glow className="h-full cursor-pointer group-hover:border-blue-300 dark:group-hover:border-cyan-700">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${d.gradient} text-2xl shadow-md mb-4`}>
                      {d.icon}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{d.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{d.desc}</p>
                    <p className="mt-3 text-xs font-semibold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      Explore →
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Active roles ── */}
      <section className="py-14">
        <Container>
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">Currently Active</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Where I spend my time right now.</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {currentRoles.filter((r) => r.status === "active").map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <Card glow className="relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                  <div className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold shadow-md ${r.shadow} mb-4`}>
                    {r.title.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white pr-16">{r.title}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">{r.role}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.period}</p>
                  <ul className="mt-3 space-y-1.5">
                    {r.bullets.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to="/currently" className="mt-4 inline-block text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:translate-x-1 transition-transform duration-200">
                    Read more →
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Navigation grid ── */}
      <section className="py-14 bg-gray-50/80 dark:bg-zinc-900/40">
        <Container>
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">Explore My Portfolio</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Every section is its own focused page.</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {NAV.map((n, i) => (
              <Reveal key={n.path} delay={i * 50}>
                <Link to={n.path} className="group block h-full">
                  <div className="h-full rounded-2xl border border-gray-200/80 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:hover:border-cyan-700 cursor-pointer">
                    <span className="text-2xl mb-3 block">{n.icon}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{n.label}</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-snug">{n.desc}</p>
                    <p className="mt-3 text-xs font-semibold text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 inline-block">
                      Open →
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
