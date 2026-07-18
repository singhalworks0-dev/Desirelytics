import { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Brain,
  Mic,
  Wallet,
  ShieldCheck,
  Globe2,
  Sparkles,
} from "lucide-react";

// SEO keywords: "AI marketing capabilities", "AI-powered content automation",
// "AI SEO agent features", "conversational AI for marketing"

const capabilities = [
  {
    icon: MessageSquare,
    title: "Natural, On-Brand Content",
    desc: "Human-like, SEO-optimized copy that adapts tone, keywords and structure to your audience — never generic, always on-brand.",
  },
  {
    icon: Brain,
    title: "Persistent Context & Strategy",
    desc: "Your AI system remembers past campaigns, rankings and audience data, so every new piece of content builds on what already works.",
  },
  {
    icon: Mic,
    title: "Voice, Visual & Multi-Format Output",
    desc: "Generate blog posts, ad copy, social captions and voice scripts from a single brief — consistent messaging across every channel.",
  },
  {
    icon: Wallet,
    title: "Built-In Conversion Tracking",
    desc: "Every campaign is wired to real conversion data — clicks, leads and revenue — so you always know what's actually working.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Brand Safety",
    desc: "Built-in guardrails keep content accurate, on-brand and compliant with platform policies and advertising regulations.",
  },
  {
    icon: Globe2,
    title: "Multilingual & Always-On",
    desc: "One system handles campaigns across dozens of languages and time zones, 24/7, with no fatigue and infinitely scalable output.",
  },
];

export default function AgentCapabilities() {
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
            AI CAPABILITIES
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          What Our{" "}
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            AI Marketing Systems
          </span>{" "}
          Can Do
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-2xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Every AI system we build is multi-skilled out of the box — it
          writes, analyzes, optimizes and reports, all tuned to your brand
          and your goals.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                style={{ transitionDelay: mounted ? `${150 + i * 90}ms` : "0ms" }}
                className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-700 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.05] ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-fuchsia-300 transition-colors duration-500 group-hover:bg-fuchsia-500/15 group-hover:text-fuchsia-200">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white transition-colors duration-500 group-hover:text-fuchsia-300">
                  {cap.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}