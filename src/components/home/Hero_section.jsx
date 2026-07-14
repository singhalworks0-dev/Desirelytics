import { useEffect, useState } from "react";

const TRUST_ITEMS = ["Cam Sites", "Tube Sites", "OnlyFans", "Dating & Escort", "eCommerce"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#0a0710] px-4 py-20 sm:px-6 md:px-12 lg:py-0 lg:h-screen lg:max-h-[900px]">
      {/* Ambient glow accents */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-700/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* LEFT: Text content */}
        <div>
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 shadow-[0_0_20px_rgba(225,29,72,0.15)] transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Adult Industry Growth Specialists
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-snug tracking-tight text-white transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Growth Partners for Brands{" "}
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Most Agencies Won't Touch
            </span>
          </h1>

          {/* Subtext */}
          <p
            className={`mt-4 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-gray-400 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            SEO, performance marketing, and growth strategy built exclusively
            for the adult industry — engineered to convert, built to last.
          </p>

          {/* CTAs */}
          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "260ms" }}
          >
            <a
              href="/free-audit"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_8px_30px_rgba(225,29,72,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(147,51,234,0.45)]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <span className="relative z-10">Get Your Free Audit</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-white/[0.03]"
            >
              See Case Studies
            </a>
          </div>

          {/* Trust bar */}
          <div
            className={`mt-10 transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          >
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
              Trusted Across Every Niche
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="text-xs sm:text-sm font-medium text-gray-500 hover:text-red-400 transition-colors duration-300 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Visual */}
        <div
          className={`relative hidden lg:block transition-all duration-1000 ease-out ${
            mounted
              ? "translate-x-0 scale-100 opacity-100"
              : "translate-x-6 scale-95 opacity-0"
          }`}
          style={{ transitionDelay: "160ms" }}
        >
          <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-3xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=900&auto=format&fit=crop"
              alt="Adult industry growth"
              className="h-full w-full object-cover"
            />
            {/* Color wash to match theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-700/30 via-fuchsia-800/20 to-purple-900/40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0710]/40 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <div
            className={`absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-[#0E0B14]/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              +187%
            </p>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-gray-400">
              Avg. organic traffic growth
            </p>
          </div>

          {/* Small floating badge, top right */}
          <div
            className={`absolute -top-4 -right-4 rounded-2xl border border-red-500/20 bg-[#0E0B14]/95 px-4 py-3 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] sm:text-xs font-semibold text-gray-300">
                100+ Niche Specialists
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}