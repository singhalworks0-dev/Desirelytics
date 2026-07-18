import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Database,
  Wrench,
  Layers,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

// SEO keywords: "LLM-powered marketing agents", "AI SEO automation",
// "agentic AI for digital marketing", "AI content workflow automation"

const features = [
  {
    icon: Brain,
    title: "Autonomous Strategy",
    desc: "Your AI system plans multi-step campaigns, decides when to publish, optimize or reallocate spend, and adapts in real time instead of following a rigid schedule.",
  },
  {
    icon: Database,
    title: "Long-Term Memory (RAG)",
    desc: "Retrieval-augmented memory stores every campaign's history in a vector database, so your system recalls past performance, keywords and audience data automatically.",
  },
  {
    icon: Wrench,
    title: "Tool & Function Calling",
    desc: "Agents call real tools — pull analytics, update a CMS, generate an image, schedule a post or fetch competitor data — turning a brief into completed, published work.",
  },
  {
    icon: Layers,
    title: "Multi-Agent Orchestration",
    desc: "Specialized agents — content, SEO, ads and reporting — work together behind one workflow, so each does its job perfectly while you see one seamless dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Guardrails & Compliance",
    desc: "A moderation layer wraps every AI output to enforce brand voice, factual accuracy and platform policy — keeping campaigns effective and always brand-safe.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Learning",
    desc: "We feed real performance data back into the system, so it keeps getting better at ranking, converting and retaining your audience the longer it runs.",
  },
];

export default function LlmAgentFeatures() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0510] px-6 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-fuchsia-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
            <Sparkles className="h-3 w-3" />
            LLM AGENTS
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          LLM-Powered Agents That Do{" "}
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            More Than Chat
          </span>
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          A chatbot answers. An LLM agent acts. We build true agentic systems
          that reason, remember, use tools and make decisions — so your AI
          marketing stack does real work like publishing, optimizing and
          reporting on its own.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                style={{ transitionDelay: mounted ? `${150 + i * 90}ms` : "0ms" }}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-700 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.05] ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-fuchsia-300 transition-colors duration-500 group-hover:bg-fuchsia-500/15 group-hover:text-fuchsia-200">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-500 group-hover:text-fuchsia-300">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}