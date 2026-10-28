import React from "react";
import { Link } from "react-router-dom";
import { university, NAV } from "../data";
import { Container, Reveal, Card, PageHeader, SectionCardHeader, BulletList, ExternalLink } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/ashesi");
const prev = NAV[idx - 1];
const next = NAV[idx + 1];

export default function Ashesi() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Life at Ashesi University"
            subtitle="Four years of academic excellence, leadership, community service, and technical innovation at Ashesi University, Ghana."
            accent="from-orange-500 to-amber-500"
          />
        </Reveal>

        <Reveal delay={60}>
          <Card glow className="mb-5 overflow-hidden p-0">
            <div className="aspect-video w-full bg-black">
              <iframe
                src="https://www.youtube.com/embed/_3mbrOfqnXc"
                title="Notable Thesis Project feature: Evans Kumi's capstone at Ashesi University"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="h-full w-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Notable Thesis Project 2025</h3>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  Produced by Ashesi University to celebrate my capstone project
                </p>
              </div>
              <ExternalLink href="https://www.youtube.com/watch?v=_3mbrOfqnXc">Watch on YouTube</ExternalLink>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal delay={80}>
            <Card glow className="h-full">
              <SectionCardHeader title="Roles & Positions" gradient="from-orange-500 to-amber-500" />
              <BulletList items={university.roles} color="bg-orange-500" />
            </Card>
          </Reveal>
          <Reveal delay={140}>
            <Card glow className="h-full">
              <SectionCardHeader title="Achievements" gradient="from-cyan-500 to-teal-500" />
              <BulletList items={university.achievements} color="bg-cyan-500" />
            </Card>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to={next.path} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              {next.label} →
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
