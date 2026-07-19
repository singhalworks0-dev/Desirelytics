import React, { useEffect, useRef, useState } from "react";

/**
 * PricingHeroSection.jsx
 * "Adult SEO Packages" pricing hero — React + Tailwind CSS
 * Includes: entrance animation, ambient starfield-style backdrop,
 * gradient CTA button with hover scale + shine, trust-pill row with hover lift.
 */

// ---------- Scroll Reveal Hook ----------
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const trustPills = [
  "From $1,297/mo",
  "AI-Powered Strategy",
  "No Long Lock-In",
  "Penalty-Safe",
  "Monthly Reporting",
];

export default function PricingHeroSection() {
  return (
    <section
      aria-labelledby="pricing-hero-heading"
      className="relative bg-gradient-to-b from-[#120a1f] via-[#0c0815] to-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 bg-fuchsia-700/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 w-96 h-96 bg-indigo-700/15 rounded-full blur-3xl" />
      {/* subtle dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            PRICING &amp; PACKAGES
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1
            id="pricing-hero-heading"
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight"
          >
            AI-Powered Adult SEO Packages
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Straightforward pricing for adult brands, AI companion apps,
            affiliate sites, creators and competitive adult businesses.
            Every package runs on AI-driven keyword research, content and
            technical optimization — clear monthly costs, no lock-in
            surprises, just rankings, traffic and revenue.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-9">
            <button className="group relative px-8 py-3.5 rounded-full font-bold text-white overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-200 group-hover:scale-105" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">Get a Custom AI SEO Quote</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {trustPills.map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-xs sm:text-[13px] font-semibold text-slate-200 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.08] hover:text-fuchsia-300"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}