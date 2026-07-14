import { useEffect, useRef, useState } from "react";

const phases = [
  {
    num: "01",
    title: "Deep Audience & Keyword Discovery",
    desc: "We mine real search data to uncover exactly what your audience types — including the high-value terms your competitors never bothered to chase.",
  },
  {
    num: "02",
    title: "Conversion-Focused Content",
    desc: "Sharp, keyword-mapped copy and blog content that speaks your audience's language and keeps them scrolling instead of bouncing.",
  },
  {
    num: "03",
    title: "Authority Link Acquisition",
    desc: "Hand-vetted, niche-relevant placements that signal to search engines you're an established, trustworthy player — not a fly-by-night site.",
  },
  {
    num: "04",
    title: "Competitive Gap Analysis",
    desc: "We reverse-engineer what's working for the platforms currently outranking you, then build a plan to take their spots.",
  },
  {
    num: "05",
    title: "Continuous Ranking Defense",
    desc: "Around-the-clock monitoring and technical maintenance so you stay compliant, visible, and protected from ranking drops.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function FullLifecycleStrategy() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/10 blur-3xl rounded-full" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Our Process
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          The Complete Adult SEO{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Growth Framework
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A structured, five-phase approach that carries your brand from
          first-page invisibility to sustained top-of-search dominance.
        </p>
      </div>

      {/* Staggered / offset grid layout */}
      <div
        ref={gridRef}
        className="relative mt-14 sm:mt-20 max-w-5xl mx-auto space-y-4 sm:space-y-5"
      >
        {phases.map((phase, i) => (
          <div
            key={phase.num}
            style={{ transitionDelay: gridInView ? `${i * 130}ms` : "0ms" }}
            className={`group relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-7 transition-all duration-500 ease-out hover:border-transparent hover:bg-white/[0.05] hover:shadow-[0_10px_40px_rgba(225,29,72,0.2)] hover:pl-8 sm:hover:pl-10 ${
              gridInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            } ${i % 2 === 1 ? "sm:ml-10" : ""}`}
          >
            {/* Left accent bar that grows on hover */}
            <span className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-gradient-to-b from-red-500 to-purple-500 rounded-l-2xl transition-all duration-500" />

            <span className="shrink-0 text-3xl sm:text-4xl font-extrabold text-red-500/80 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 tabular-nums">
              {phase.num}
            </span>

            <div className="relative">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors duration-500">
                {phase.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed max-w-xl transition-colors duration-500">
                {phase.desc}
              </p>
            </div>

            {/* Arrow that appears on hover, top right */}
            <span className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 items-center justify-center w-9 h-9 rounded-full border border-white/10 text-gray-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-red-500/40 group-hover:text-red-400 transition-all duration-500">
              →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}