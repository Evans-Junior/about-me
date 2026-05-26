import React from "react";
import { Link } from "react-router-dom";
import { publications, NAV } from "../data";
import { Container, Reveal, Card, Badge, ExternalLink, PageHeader } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/publications");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Publications() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Publications"
            subtitle="Peer-reviewed research published in international journals."
            accent="from-sky-600 to-blue-500"
          />
        </Reveal>

        <div className="grid gap-5">
          {publications.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Card glow className="relative overflow-hidden">
                <div className="absolute top-0 right-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/5 blur-2xl pointer-events-none" />
                <div className="relative flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">📄</span>
                      <Badge tone="info">{p.venue}</Badge>
                      <Badge tone="warning">{p.date}</Badge>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug">{p.title}</h4>
                  </div>
                </div>
                <div className="mt-5">
                  <ExternalLink href={p.link}>Read Publication</ExternalLink>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
