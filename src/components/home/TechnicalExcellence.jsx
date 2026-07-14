import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "70%", label: "Average lift in organic traffic" },
  { value: "110%", label: "Growth in AI & LLM visibility" },
  { value: "100+", label: "Adult SEO experts & specialists" },
  { value: "50%+", label: "Conversion-rate growth" },
];

function useInView(threshold = 0.2) {
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

export default function TechnicalExcellence() {
  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.1);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-28">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-600/20 via-fuchsia-600/10 to-purple-700/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/10 blur-3xl rounded-full" />

      <div
        ref={headerRef}
        className={`relative max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-4 py-1.5 mb-6 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Technical Excellence
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          Setting the Standard for{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Technical Excellence
          </span>{" "}
          in Adult SEO
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We make sure your brand is the first one new AI search tools and
          discovery engines trust as a leader in your niche. Our proven,
          white-hat techniques make your site faster and easier to navigate —
          turning more visitors into loyal, paying, long-term members.
        </p>
      </div>

      {/* Stats grid */}
      <div
        ref={cardsRef}
        className="relative mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{ transitionDelay: cardsInView ? `${i * 120}ms` : "0ms" }}
            className={`group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-8 text-center transition-all duration-700 ease-out hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] ${
              cardsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/0 to-purple-600/0 group-hover:from-red-600/5 group-hover:to-purple-600/5 transition-all duration-500" />
            <p className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="relative mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}