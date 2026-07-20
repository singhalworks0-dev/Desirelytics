import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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

export default function CustomStrategyCTA() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden rounded-none sm:rounded-3xl"
    >
      {/* Background: abstract gradient mesh instead of a photo */}
      <div className="absolute inset-0 bg-[#0a0710]" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-700/40 via-fuchsia-700/30 to-purple-800/50" />
      <div className="pointer-events-none absolute -top-40 -left-20 w-[500px] h-[500px] bg-red-600/30 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 w-[550px] h-[550px] bg-purple-700/30 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 blur-3xl rounded-full" />

      {/* Subtle noise/texture overlay for premium feel */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div
        className={`relative px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 text-center transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3.5 py-1 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/90">
            Custom Strategy
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight max-w-3xl mx-auto">
          Own Your Niche With a Tailor-Built Adult SEO Blueprint
        </h2>

        <p className="mt-5 text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
          No cookie-cutter playbooks. We map your audience's real search
          behavior — across dating, cam, creator, or eCommerce niches — and
          build a growth roadmap engineered to convert.
        </p>

        <div className="mt-8">
          <Link to="/free-audit" className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-fuchsia-600 px-7 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_8px_30px_rgba(225,29,72,0.35)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 active:translate-y-0">
            <span className="relative z-10">Claim Your Free SEO Audit</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}