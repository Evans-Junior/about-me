import React from "react";
import { Link } from "react-router-dom";
import { softwareJourney, links, NAV } from "../data";
import { Container, Reveal, Card, Badge, ExternalLink, PageHeader, SectionCardHeader, BulletList } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/software");
const next = NAV[idx + 1];

export default function Software() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Software Engineering Journey"
            subtitle="90+ projects shipped across AI, SaaS, mobile, web, and HealthTech. Selected work grouped by domain."
            accent="from-violet-600 to-purple-500"
          />
        </Reveal>

        <Reveal delay={80}>
          <Card className="mb-8">
            <SectionCardHeader title="Engineering Roles" gradient="from-blue-500 to-purple-500" />
            <BulletList items={softwareJourney.roles} color="bg-blue-500" />
          </Card>
        </Reveal>

        <div className="space-y-10">
          {softwareJourney.categories.map((cat, ci) => (
            <Reveal key={cat.name} delay={ci * 60}>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{cat.name}</h4>
                  <div className="flex-1 h-px bg-gray-100 dark:bg-zinc-800" />
                  {cat.name === "Hosted & Live" && <Badge tone="success">Live</Badge>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((p) => (
                    <Card key={p.name} glow>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {"logo" in p && p.logo && (
                            <img src="/app_icon.png" alt="AfyaAI" className="h-5 w-5 rounded-md object-cover border border-gray-100 dark:border-zinc-700 flex-shrink-0" />
                          )}
                          <h5 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{p.name}</h5>
                        </div>
                        {"live" in p && p.live ? <Badge tone="info">Live</Badge> : <Badge>GitHub</Badge>}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                      <div className="mt-3">
                        {"live" in p && p.live
                          ? <ExternalLink href={p.live as string}>Open Project</ExternalLink>
                          : <ExternalLink href={(p as { repo: string }).repo || links.github}>View on GitHub</ExternalLink>}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            All repositories →{" "}
            <ExternalLink href={links.github}>github.com/Evans-Junior</ExternalLink>
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex items-center justify-between">
            <Link to="/about" className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← About</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
