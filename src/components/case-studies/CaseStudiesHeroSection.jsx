import React, { useEffect, useRef, useState } from "react";

/**
 * CaseStudiesHeroSection.jsx
 * "Real growth for real adult brands" case-studies hero — React + Tailwind CSS
 * Includes: entrance animation, animated count-up stats, dual CTA buttons
 * with hover states, staggered industry-pill row with hover glow.
 */

// ---------- Scroll Reveal Hook ----------
function useReveal(threshold = 0.15) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

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

// ---------- Count-up Stat ----------
function CountUpStat({ target, suffix = "", label, delay }) {
  const [ref, visible] = useReveal(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative rounded-xl bg-white/[0.03] border border-white/10 px-6 py-6 text-center transition-all duration-500 ease-out
        hover:-translate-y-1.5 hover:border-rose-500/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-rose-900/30
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-rose-500/25 to-fuchsia-500/25" />
      <div className="text-3xl sm:text-4xl font-extrabold text-rose-500">
        {value}
        {suffix}
      </div>
      <div className="mt-1.5 text-xs sm:text-sm text-slate-400">{label}</div>
    </div>
  );
}

// ---------- Industry Pill ----------
function IndustryPill({ label, dot, delay }) {
  const [ref, visible] = useReveal();
  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.03] text-xs sm:text-sm font-semibold text-slate-200 cursor-default
        transition-all duration-400 ease-out hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.07] hover:shadow-md hover:shadow-fuchsia-900/30
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: dot }}
      />
      {label}
    </span>
  );
}

const stats = [
  { target: 20, suffix: "+", label: "Brands scaled" },
  { target: 8, suffix: "", label: "Adult niches" },
  { target: 100, suffix: "%", label: "Adult-only focus" },
];

const industries = [
  { label: "Adult Directories", dot: "#f5a623" },
  { label: "Adult Social", dot: "#22d3ee" },
  { label: "AI Companions", dot: "#a855f7" },
  { label: "Cam Sites", dot: "#ec4899" },
  { label: "Doll Stores", dot: "#818cf8" },
  { label: "Feet Pic Platforms", dot: "#f472b6" },
  { label: "Massage & Local SEO", dot: "#fb923c" },
  { label: "Sex Toy Retail", dot: "#2dd4bf" },
];

export default function CaseStudiesHeroSection() {
  return (
    <section
      aria-labelledby="case-studies-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-72 bg-rose-800/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-rose-400 text-[11px] font-bold tracking-[0.15em] uppercase">
            Case Studies
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="case-studies-heading"
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          >
            <span className="text-white">Real growth for real </span>
            <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
              adult brands
            </span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            We only do adult SEO — and these are the brands that trust us
            with it. From AI companions and cam sites to feet-pic
            marketplaces, doll stores, adult retail and local massage
            parlours, here's a look at the platforms we've helped grow in
            organic search and on Google Maps.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button className="group relative px-6 py-2.5 rounded-full font-semibold text-white text-sm overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95">
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-300 group-hover:scale-105" />
              <span className="relative">Get a Free Proposal</span>
            </button>
            <button className="px-6 py-2.5 rounded-full font-semibold text-white text-sm border border-white/20 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/35 hover:scale-105 active:scale-95">
              Book a Call
            </button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {stats.map((s, i) => (
            <CountUpStat key={s.label} {...s} delay={i * 100} />
          ))}
          {/* "Global" isn't numeric, styled to match */}
          <div
            className="group relative rounded-xl bg-white/[0.03] border border-white/10 px-6 py-6 text-center transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-rose-500/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-rose-900/30"
            style={{ transitionDelay: "300ms" }}
          >
            <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-rose-500/25 to-fuchsia-500/25" />
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-500">
              Global
            </div>
            <div className="mt-1.5 text-xs sm:text-sm text-slate-400">
              Client reach
            </div>
          </div>
        </div>

        <Reveal delay={400} className="mt-16">
          <p className="text-[11px] font-bold tracking-[0.15em] text-slate-500 uppercase">
            Industries We Have Scaled
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <IndustryPill key={ind.label} {...ind} delay={i * 60} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}