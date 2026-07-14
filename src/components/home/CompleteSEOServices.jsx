import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Search Engine Optimization",
    desc: "Deep technical audits, on-page fixes, and authority-driven link building engineered to win top rankings for your hardest keywords.",
  },
  {
    title: "Social Media Growth",
    desc: "Platform-compliant social strategies and cross-promotion that redirect real attention to your site and build lasting brand awareness.",
  },
  {
    title: "Reputation & Brand Protection",
    desc: "We monitor your name across the web, suppress negative noise, and amplify trust signals so you're seen as the reliable choice in your niche.",
  },
  {
    title: "Content & Copywriting",
    desc: "Keyword-mapped blogs and landing pages built to rank for long-tail searches, establish authority, and keep visitors on-page longer.",
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

export default function CompleteSEOServices() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 right-1/4 w-[500px] h-[500px] bg-purple-700/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-red-600/10 blur-3xl rounded-full" />

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
            Full-Spectrum Services
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          Our Complete Adult SEO{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Marketing Arsenal
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A full toolkit of adult SEO marketing services built to strengthen
          your digital footprint and drive traffic that actually converts.
          Launching or rebuilding a site? Check out our{" "}
          <span className="text-red-400 font-medium cursor-pointer hover:text-red-300 transition-colors">
            adult website development
          </span>{" "}
          service.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="relative mt-12 sm:mt-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
      >
        {services.map((item, i) => (
          <div
            key={item.title}
            style={{
              transitionDelay: gridInView ? `${i * 120}ms` : "0ms",
            }}
            className={`group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm p-7 sm:p-8 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(225,29,72,0.25)] ${
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Animated gradient border (draws in on hover) */}
            <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-transparent transition-colors duration-500" />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(239,68,68,0.6), rgba(217,70,239,0.5), rgba(147,51,234,0.6))",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />
            </div>

            {/* Number watermark */}
            <span className="absolute top-4 right-6 text-5xl sm:text-6xl font-extrabold text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 select-none">
              0{i + 1}
            </span>

            {/* Sweep glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/10 pointer-events-none" />

            <h3 className="relative text-lg sm:text-xl font-bold text-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
              {item.title}
            </h3>
            <p className="relative mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500 max-w-md">
              {item.desc}
            </p>

            {/* Arrow indicator that slides in on hover */}
            <div className="relative mt-5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <span>Learn more</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}