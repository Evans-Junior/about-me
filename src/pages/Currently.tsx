import React from "react";
import { Link } from "react-router-dom";
import { currentRoles, NAV } from "../data";
import { Container, Reveal, Card, Badge, PageHeader, BulletList } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/currently");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Currently() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Currently"
            subtitle="Where I spend my time right now — building AI healthcare solutions full-time and leading EmeGroup as Executive Director."
            accent="from-blue-600 to-cyan-500"
          />
        </Reveal>

        {/* Active roles */}
        <div className="mb-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Now
          </p>
          <div className="grid gap-5 lg:grid-cols-2">
            {currentRoles.filter((r) => r.status === "active").map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <Card glow className="h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Active</span>
                  </div>
                  <div className={`flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold text-xs shadow-md ${r.shadow} mb-4`}>
                    {r.title.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white pr-16">{r.title}</h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-cyan-400 mt-0.5">{r.role}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{r.period}</p>
                  <div className="mt-4">
                    <BulletList items={r.bullets} color="bg-blue-500" />
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Past */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-600">Past Experience</p>
          {currentRoles.filter((r) => r.status === "past").map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <Card className="opacity-80 hover:opacity-100">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                    {r.title.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">{r.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{r.role}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-600">{r.period}</p>
                      </div>
                      <Badge tone="default">Ended Apr 2026</Badge>
                    </div>
                    <div className="mt-3">
                      <BulletList items={r.bullets} color="bg-gray-400" />
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
