import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { NAV, links } from "./data";
import { Container, ReadingProgress, ThemeToggle } from "./ui";

/* ── Theme context ── */
interface ThemeCtx { dark: boolean; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const s = localStorage.getItem("theme");
    return s ? s === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Header ── */
function Header() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header className={`sticky top-[3px] z-50 w-full border-b transition-all duration-300 ${
      scrolled
        ? "border-gray-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 shadow-sm backdrop-blur-xl"
        : "border-transparent bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md"
    }`}>
      <Container className="flex items-center justify-between py-3 max-w-none px-5">
        {/* Logo */}
        <Link to="/" className="group inline-flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Portfolio</p>
            <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white">Evans Kumi</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-0.5 xl:flex">
          {!isHome && NAV.map((n) => {
            const active = location.pathname === n.path;
            return (
              <Link
                key={n.path}
                to={n.path}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          {isHome && (
            <Link to="/about" className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-200">
              Explore Portfolio
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} toggle={toggle} />
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all duration-200">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center rounded-xl bg-gray-900 dark:bg-white px-3 py-2 text-xs font-semibold text-white dark:text-gray-900 hover:opacity-90 transition-all duration-200 shadow-sm">
            GitHub
          </a>
          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-700 xl:hidden hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
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
      <div className={`overflow-hidden transition-all duration-300 ease-in-out xl:hidden ${open ? "max-h-[600px] border-t border-gray-100 dark:border-zinc-800" : "max-h-0"}`}>
        <div className="bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl">
          <Container className="py-3">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {NAV.map((n) => {
                const active = location.pathname === n.path;
                return (
                  <Link
                    key={n.path}
                    to={n.path}
                    className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span className="mr-1.5">{n.icon}</span>{n.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex gap-2 border-t border-gray-100 dark:border-zinc-800 pt-3">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-gray-200 dark:border-zinc-700 px-3 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="flex-1 rounded-xl bg-gray-900 dark:bg-white px-3 py-2 text-center text-sm font-semibold text-white dark:text-gray-900">GitHub</a>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

/* ── Footer ── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-zinc-800 py-10 mt-auto">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <img src="/app_icon.png" alt="AfyaAI" className="h-6 w-6 rounded-lg object-cover border border-gray-100 dark:border-zinc-700" />
              <span className="text-sm font-bold text-gray-900 dark:text-white">Evans Kumi</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600">© {year} Evans Kumi. All rights reserved.</p>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">McCall MacBain Scholar 2026 · AfyaAI Founder · EmeGroup Exec. Director</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            {[
              { label: "Email", href: links.email },
              { label: "LinkedIn", href: links.linkedin },
              { label: "GitHub", href: links.github },
              { label: "AfyaAI", href: links.hosted.afya },
              { label: "MyScholarsHub", href: links.hosted.myscholars },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ── Root layout ── */
export default function Layout() {
  const { dark } = useTheme();
  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-900 antialiased dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100 transition-colors duration-300 ${dark ? "dark" : ""}`}>
      <ReadingProgress />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
