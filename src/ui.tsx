import React, { useRef, useState, useEffect } from "react";

/* ── Scroll reveal ── */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export const Reveal: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({
  children, className = "", delay = 0,
}) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Layout ── */
export const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/* ── Cards ── */
export const Card: React.FC<React.PropsWithChildren<{ className?: string; glow?: boolean }>> = ({
  className = "", children, glow = false,
}) => (
  <div className={`rounded-2xl border border-gray-200/80 dark:border-zinc-700/60 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200 dark:hover:border-cyan-800 ${glow ? "hover:shadow-blue-100/50 dark:hover:shadow-cyan-900/20" : ""} ${className}`}>
    {children}
  </div>
);

/* ── Badges ── */
type Tone = "default" | "success" | "warning" | "info" | "gold" | "violet";
export const Badge: React.FC<React.PropsWithChildren<{ tone?: Tone }>> = ({ tone = "default", children }) => {
  const cls: Record<Tone, string> = {
    default: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 ring-1 ring-yellow-400/50",
    violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  };
  return <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${cls[tone]}`}>{children}</span>;
};

export const Tag: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/60 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors hover:border-blue-400 hover:text-blue-600 dark:hover:text-cyan-400">
    {children}
  </span>
);

/* ── Links ── */
export const ExternalLink: React.FC<React.PropsWithChildren<{ href: string; label?: string }>> = ({ href, children, label }) => (
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

/* ── Bullet list ── */
export const BulletList: React.FC<{ items: string[]; color?: string }> = ({ items, color = "bg-blue-500" }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${color}`} />
        {item}
      </li>
    ))}
  </ul>
);

/* ── Reading progress bar ── */
export const ReadingProgress: React.FC = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[3px] bg-transparent">
      <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 transition-[width] duration-75" style={{ width: `${pct}%` }} />
    </div>
  );
};

/* ── Theme toggle button ── */
export const ThemeToggle: React.FC<{ dark: boolean; toggle: () => void }> = ({ dark, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle theme"
    className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 transition-all duration-200 hover:scale-105 shadow-sm"
  >
    <span className={`absolute transition-all duration-300 ${dark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-500">
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.166 17.834a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06l-1.591-1.591ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.166 6.166a.75.75 0 0 0 1.06 1.06l1.591-1.59a.75.75 0 1 0-1.061-1.061l-1.59 1.591Z" />
      </svg>
    </span>
    <span className={`absolute transition-all duration-300 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-blue-400">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
      </svg>
    </span>
  </button>
);

/* ── Page header (used on every section page) ── */
export const PageHeader: React.FC<{ title: string; subtitle?: string; accent?: string }> = ({
  title, subtitle, accent = "from-blue-600 to-cyan-500",
}) => (
  <div className="mb-10">
    <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${accent} mb-6`} />
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
      {title}
    </h1>
    {subtitle && <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-2xl">{subtitle}</p>}
  </div>
);

/* ── Section card header (colored bar + title) ── */
export const SectionCardHeader: React.FC<{ title: string; gradient: string }> = ({ title, gradient }) => (
  <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
    <span className={`inline-block h-5 w-1 rounded-full bg-gradient-to-b ${gradient}`} />
    {title}
  </h3>
);
