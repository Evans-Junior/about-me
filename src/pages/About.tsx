import React from "react";
import { Link } from "react-router-dom";
import { rolesAbout, achievementsAbout, skills, NAV } from "../data";
import { Container, Reveal, Card, Tag, PageHeader, SectionCardHeader, BulletList } from "../ui";

const next = NAV[NAV.findIndex((n) => n.path === "/about") + 1];

export default function About() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="About Evans Kumi"
            subtitle="Software Engineer, AI/ML builder, founder, and scholar on a mission to build trustworthy technology for Africa."
          />
        </Reveal>

        {/* Photo + intro */}
        <Reveal delay={80}>
          <div className="mb-10 overflow-hidden rounded-3xl border-2 border-white/80 dark:border-zinc-800 shadow-xl shadow-black/10 max-w-sm">
            <img src="/evanskumi.jpg" alt="Evans Kumi" className="w-full object-cover" />
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={100}>
            <Card glow className="h-full">
              <SectionCardHeader title="Roles" gradient="from-blue-500 to-cyan-500" />
              <BulletList items={rolesAbout} color="bg-blue-500" />
            </Card>
          </Reveal>

          <Reveal delay={160}>
            <Card glow className="h-full">
              <SectionCardHeader title="Key Achievements" gradient="from-emerald-500 to-teal-500" />
              <BulletList items={achievementsAbout} color="bg-emerald-500" />
            </Card>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal delay={220}>
          <div className="mt-8">
            <h3 className="mb-4 text-base font-bold text-gray-900 dark:text-white">Skills & Technologies</h3>
            <div className="space-y-4">
              {[
                { label: "Languages", items: skills.languages },
                { label: "Frameworks & Libraries", items: skills.frameworks },
                { label: "Tools & Platforms", items: skills.tools },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{label}</p>
                  <div className="flex flex-wrap gap-2">{items.map((s) => <Tag key={s}>{s}</Tag>)}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Next nav */}
        <Reveal delay={280}>
          <div className="mt-12 flex justify-end">
            <Link
              to={next.path}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-200"
            >
              {next.label} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
