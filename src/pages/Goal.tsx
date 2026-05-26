import React from "react";
import { Link } from "react-router-dom";
import { personalGoal, NAV } from "../data";
import { Container, Reveal, Card, PageHeader } from "../ui";

const idx = NAV.findIndex((n) => n.path === "/goal");
const prev = NAV[idx - 1];

export default function Goal() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <Reveal>
          <PageHeader
            title="Personal Goal"
            subtitle="The long-term vision driving everything I build."
            accent="from-teal-600 to-emerald-500"
          />
        </Reveal>

        <Reveal delay={80}>
          <Card glow className="relative overflow-hidden">
            <div className="absolute top-0 right-0 h-48 w-48 -translate-y-10 translate-x-10 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/5 blur-3xl pointer-events-none" />
            <div className="relative flex items-start gap-5">
              <span className="text-4xl mt-1 flex-shrink-0">🎯</span>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{personalGoal}</p>
            </div>
          </Card>
        </Reveal>

        {/* Vision pillars */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "🤖", title: "PhD in AI for Health", desc: "Trustworthy AI that works in low-resource settings." },
            { icon: "🌍", title: "Continental Scale", desc: "AfyaAI Technologies as Africa's healthcare tech engine." },
            { icon: "⚖️", title: "Equitable Access", desc: "Closing the healthcare technology gap for all Africans." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 80 + 120}>
              <Card className="text-center h-full">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{p.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <div className="mt-10 flex items-center justify-between">
            <Link to={prev.path} className="text-sm font-medium text-gray-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">← {prev.label}</Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] transition-all duration-200">
              Back to Home
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
