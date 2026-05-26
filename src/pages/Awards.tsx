import React from "react";
import { Link } from "react-router-dom";
import { awards, NAV } from "../data";
import { Container, Reveal, Card, Badge, PageHeader } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/awards");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Awards() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Achievements & Awards"
            subtitle="Scholarships, competition prizes, and institutional recognition across academia, entrepreneurship, and technology."
            accent="from-yellow-500 to-amber-500"
          />
        </Reveal>

        <div className="grid gap-3">
          {awards.map((a, idx_) => (
            <Reveal key={idx_} delay={idx_ * 40}>
              {"featured" in a && a.featured ? (
                <div className="relative overflow-hidden rounded-2xl border border-yellow-300/70 dark:border-yellow-600/40 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 p-5 shadow-md shadow-yellow-100/60 dark:shadow-yellow-900/10 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-5xl opacity-10 select-none pointer-events-none">🏆</div>
                  <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{a.title}</p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-0.5">{a.org}</p>
                      </div>
                    </div>
                    <Badge tone="gold">{a.date}</Badge>
                  </div>
                </div>
              ) : (
                <Card>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{a.title}</p>
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

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
