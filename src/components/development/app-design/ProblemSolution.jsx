import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";

// SEO keywords: "custom AI agent development", "why generic AI agencies fail",
// "enterprise AI chatbot development"

const fallShort = [
  "Off-the-shelf chatbots break context mid-conversation",
  "No real memory across sessions or returning users",
  "No built-in billing, upsells or subscription logic",
  "Zero data security or compliance guardrails",
  "Chat logs stored on platforms with unclear data policies",
  "Generic agencies disappear once requirements get complex",
];

const reallyNeed = [
  "Purpose-built models tuned for your exact use case",
  "Long-term memory and a persona that stays consistent",
  "Built-in monetization and workflow automation that convert",
  "Compliance, access control and audit logging baked in",
  "Private, secure infrastructure your team fully controls",
  "A dedicated team that ships fast and stays accountable",
];

export default function ProblemSolution() {
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-rose-600 via-fuchsia-600 to-violet-700 px-6 py-20 sm:py-24"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            THE REAL PROBLEM
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Why Generic AI Agencies Can't Build{" "}
          <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-4">
            Real AI Agents
          </span>
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/85 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Most AI developers hit a wall the moment your use case gets
          specific. Foundation models refuse edge cases, big agencies fear
          niche requirements, and off-the-shelf chatbots break character,
          leak data or fail at scale. Real AI agent development is a
          different craft — and it's the only thing we do.
        </p>

        {/* Comparison cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Falls short */}
          <div
            className={`rounded-2xl bg-white p-8 transition-all delay-200 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-base font-bold text-gray-900">
              Where Generic AI Teams Fall Short
            </h3>
            <ul className="mt-5 space-y-3.5">
              {fallShort.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-2.5 text-xs text-gray-600 transition-colors duration-300"
                >
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-colors duration-300 group-hover:bg-rose-500 group-hover:text-white">
                    <X className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What they need */}
          <div
            className={`rounded-2xl bg-white p-8 transition-all delay-300 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-base font-bold text-gray-900">
              What Real AI Agents Really Need
            </h3>
            <ul className="mt-5 space-y-3.5">
              {reallyNeed.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-2.5 text-xs text-gray-600 transition-colors duration-300"
                >
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-600 transition-colors duration-300 group-hover:bg-fuchsia-500 group-hover:text-white">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing line */}
        <p
          className={`mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/85 transition-all delay-500 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          That's exactly why ambitious teams hire us for custom AI agent
          development. We build, train and scale the AI agents generic
          agencies aren't equipped to touch.
        </p>
      </div>
    </section>
  );
}