import { useEffect, useState } from "react";
import { Code2, Server, Cloud, ShieldCheck, Palette, Users, Sparkles, ArrowRight } from "lucide-react";

// ---------------------------------------------
// NEXORA AI — "Hire Dedicated AI & Web Developers"
// ---------------------------------------------

const roles = [
  {
    icon: Code2,
    title: "Frontend Engineers",
    desc: "React, Next.js and Vue specialists shipping fast, AI-assisted, conversion-ready interfaces.",
  },
  {
    icon: Server,
    title: "Backend Engineers",
    desc: "Node, Laravel and Django experts building secure APIs, ML pipelines and scalable data layers.",
  },
  {
    icon: Cloud,
    title: "DevOps & MLOps",
    desc: "Cloud, CI/CD and model-serving infra specialists keeping your platform fast, observable and online.",
  },
  {
    icon: ShieldCheck,
    title: "QA & Automation",
    desc: "Manual and AI-driven test engineers who verify security, performance and compliance pre-launch.",
  },
  {
    icon: Palette,
    title: "Product Designers",
    desc: "UI/UX craftspeople who design intuitive, AI-personalized flows tuned for engagement.",
  },
  {
    icon: Users,
    title: "Full-Stack Leads",
    desc: "Senior leads who own delivery end-to-end — sprint tracking, timesheets, direct Slack access.",
  },
];

export default function HireDevelopers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0F] px-6 py-20 sm:py-24">
      {/* ambient glow signature */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-fuchsia-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
            <Sparkles className="h-3 w-3" />
            HIRE AI DEVELOPERS
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`mx-auto mt-5 max-w-3xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Hire Dedicated{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            AI &amp; Web App
          </span>{" "}
          Developers
        </h1>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-2xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Senior, NDA-signed engineers fluent in React, Node, Laravel, DevOps and
          applied AI/LLM tooling — working exclusively on your build, with weekly
          demos and direct access.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                style={{ transitionDelay: mounted ? `${150 + i * 90}ms` : "0ms" }}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-700 hover:border-fuchsia-400/50 hover:bg-white/[0.05] ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {/* corner trace accent */}
                <span className="absolute -top-px -left-px h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-transparent transition-colors duration-500 group-hover:border-fuchsia-400" />
                <span className="absolute -bottom-px -right-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-transparent transition-colors duration-500 group-hover:border-violet-400" />

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-fuchsia-300 transition-colors duration-500 group-hover:bg-fuchsia-500/15 group-hover:text-fuchsia-200">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-500 group-hover:text-fuchsia-200">
                  {role.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {role.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`mt-14 flex justify-center transition-all delay-500 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all duration-300 hover:shadow-fuchsia-500/40 hover:brightness-110">
            Hire AI Developers
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}