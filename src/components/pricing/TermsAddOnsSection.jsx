import React, { useEffect, useRef, useState } from "react";

/**
 * TermsAddOnsSection.jsx
 * "Recommended Terms & Add-On Costs" pill row — React + Tailwind CSS
 * Includes: entrance pop-in animation, fast hover lift + color shift on pills.
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

function TermPill({ label, delay }) {
  const [ref, visible] = useReveal();
  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`inline-flex items-center px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-xs sm:text-[13px] font-semibold text-slate-200 cursor-default
        transition-all duration-200 ease-out hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 hover:shadow-md hover:shadow-fuchsia-900/30
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      {label}
    </span>
  );
}

const terms = [
  "3-month minimum commitment",
  "Best result period: 6 months",
  "Monthly reporting",
  "Email + strategy call",
  "Extra blog: $100–$150",
  "Extra backlink: $100–$250",
];

export function TermsAddOnsSection() {
  return (
    <section
      aria-labelledby="terms-heading"
      className="relative bg-gradient-to-br from-[#150a1f] via-[#0d0a15] to-[#0a0612] py-16 px-6 sm:px-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <h2
            id="terms-heading"
            className="text-xl sm:text-2xl font-extrabold text-white leading-tight"
          >
            Recommended Terms &amp; Add-On Costs
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {terms.map((t, i) => (
              <TermPill key={t} label={t} delay={i * 50} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-7 text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-lg mx-auto">
            These packages are designed for adult SEO campaigns where link
            building, content compliance, indexing and niche authority
            require specialist execution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default TermsAddOnsSection;