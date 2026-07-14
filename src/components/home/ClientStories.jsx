import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Our organic traffic nearly tripled in under five months, and we're now ranking for terms we never thought we'd touch. This team genuinely gets the adult space.",
    name: "Head of Marketing",
    company: "Premium Dating Platform",
  },
  {
    quote:
      "After a Google penalty tanked our visibility, they got us fully recovered and compliant within weeks. Organic revenue has climbed steadily ever since.",
    name: "Co-Founder",
    company: "Adult eCommerce Brand",
  },
  {
    quote:
      "Discreet, professional, and relentless about results. Our platform now shows up in AI search answers and holds top spots on Google.",
    name: "Growth Lead",
    company: "Live Streaming Network",
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

export default function ClientStories() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-700/10 blur-3xl rounded-full" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Client Stories
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          Results Our Clients{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Love to Talk About
          </span>
        </h2>
      </div>

      {/* Testimonial grid */}
      <div
        ref={gridRef}
        className="relative mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            style={{ transitionDelay: gridInView ? `${i * 130}ms` : "0ms" }}
            className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-7 overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:rotate-0 hover:border-transparent hover:shadow-[0_15px_45px_rgba(147,51,234,0.25)] ${
              gridInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            } ${i === 1 ? "sm:-translate-y-2" : ""}`}
          >
            {/* Gradient border reveal on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.6), rgba(217,70,239,0.4), rgba(147,51,234,0.6))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            {/* Giant quote mark watermark */}
            <span className="absolute -top-2 left-4 text-7xl sm:text-8xl font-serif text-red-500/10 group-hover:text-red-500/20 transition-colors duration-500 select-none">
              "
            </span>

            {/* Glow wash on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/10 pointer-events-none" />

            <p className="relative text-sm sm:text-base italic text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-500">
              "{t.quote}"
            </p>

            <div className="relative mt-6 pt-4 border-t border-white/10 group-hover:border-red-500/20 transition-colors duration-500">
              <p className="text-sm sm:text-base font-bold text-white group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                {t.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                {t.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}