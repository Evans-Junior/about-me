import React from "react";
import { Link } from "react-router-dom";
import { research, NAV } from "../data";
import { Container, Reveal, Card, PageHeader } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/research");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Research() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Research"
            subtitle="Applied and academic research spanning AI diagnostics, assistive technology, environmental prediction, and health investment analysis."
            accent="from-rose-600 to-pink-500"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {research.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <Card glow className="h-full">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{r.title}</h4>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{r.body}</p>
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-rose-500 dark:text-pink-400">{r.org}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
