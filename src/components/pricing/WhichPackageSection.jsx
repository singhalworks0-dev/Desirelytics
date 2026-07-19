import React, { useEffect, useRef, useState } from "react";

/**
 * WhichPackageSection.jsx
 * "Which Adult SEO Package Is Right for You?" — React + Tailwind CSS
 * Includes: entrance animation, hover-elevate cards with glow border + color shift.
 */

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
      { threshold: 0.15 }
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

const picks = [
  {
    title: "Pick Foreplay if…",
    desc: "You're a new adult site, solo creator or small brand building your first foundation of AI-optimized rankings and traffic — starting at $1,297/mo.",
  },
  {
    title: "Pick Arousal if…",
    desc: "You run adult eCommerce, an AI tool, a dating, webcam or affiliate site and want serious, AI-powered scalable growth at $1,997/mo.",
  },
  {
    title: "Pick Satisfy if…",
    desc: "You're a competitive adult brand, SaaS, marketplace or large affiliate site that needs to dominate with full AI search optimization at $2,997/mo.",
  },
];

function PickCard({ title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 h-full transition-all duration-200 ease-out hover:-translate-y-2 hover:border-fuchsia-500/50 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-fuchsia-900/30">
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-rose-500/25" />
        <h3 className="text-sm sm:text-base font-bold text-white transition-colors duration-150 group-hover:text-fuchsia-400">
          {title}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400 transition-colors duration-150 group-hover:text-slate-300">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

export function WhichPackageSection() {
  return (
    <section
      aria-labelledby="which-package-heading"
      className="bg-[#0a0612] py-16 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <h2
            id="which-package-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Which Adult SEO Package Is
            <br />
            Right for You?
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {picks.map((p, i) => (
            <PickCard key={p.title} {...p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhichPackageSection;