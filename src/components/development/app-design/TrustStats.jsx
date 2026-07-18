import { useEffect, useRef, useState } from "react";

// SEO keywords: "AI agent development stats", "trusted AI development team",
// "AI chatbot deployment results"

const stats = [
  { value: "50+", label: "AI agents designed and deployed" },
  { value: "4-8 wk", label: "From concept to a live, working agent" },
  { value: "10M+", label: "AI messages handled across client agents" },
  { value: "100%", label: "White-label, NDA-backed delivery" },
];

const clientPlaceholders = new Array(6).fill(null);

export default function TrustStats() {
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
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A0510]">
      {/* Trust bar */}
      <div className="px-6 py-14 text-center">
        <p
          className={`text-xs font-semibold tracking-wide text-gray-400 transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          TRUSTED BY AI STARTUPS, STUDIOS AND TEAMS WORLDWIDE
        </p>

        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-4">
          {clientPlaceholders.map((_, i) => (
            <div
              key={i}
              style={{ transitionDelay: mounted ? `${100 + i * 60}ms` : "0ms" }}
              className={`h-11 w-28 rounded-lg border border-white/5 bg-white/[0.03] transition-all duration-500 hover:border-fuchsia-400/40 hover:bg-white/[0.06] ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            />
          ))}
        </div>

        <p
          className={`mx-auto mt-6 max-w-md text-xs text-gray-500 transition-all delay-300 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Client names shown on request — every AI agent development project
          is NDA-backed and fully confidential.
        </p>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-white/5" />

      {/* Stats grid */}
      <div className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: mounted ? `${150 + i * 100}ms` : "0ms" }}
              className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-center transition-all duration-700 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.04] ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text transition-all duration-500 group-hover:from-fuchsia-400 group-hover:to-violet-400">
                {stat.value}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}