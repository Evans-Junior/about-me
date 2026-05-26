import React from "react";
import { Link } from "react-router-dom";
import { leadership, NAV } from "../data";
import { Container, Reveal, Card, PageHeader, SectionCardHeader, BulletList } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/leadership");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Leadership() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Leadership & Servantship"
            subtitle="Serving communities, building institutions, and growing the next generation of technologists."
            accent="from-emerald-600 to-teal-500"
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={80}>
            <Card glow className="h-full">
              <SectionCardHeader title="Roles" gradient="from-violet-500 to-purple-500" />
              <BulletList items={leadership.roles} color="bg-violet-500" />
            </Card>
          </Reveal>
          <Reveal delay={140}>
            <Card glow className="h-full">
              <SectionCardHeader title="Impact" gradient="from-pink-500 to-rose-500" />
              <BulletList items={leadership.achievements} color="bg-pink-500" />
            </Card>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
