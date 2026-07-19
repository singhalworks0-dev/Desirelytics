import React, { useEffect, useRef, useState } from "react";

/**
 * WhySpecialistSection.jsx
 * "A specialist partner, not a generalist agency" — React + Tailwind CSS
 * Light-background variant. Includes: entrance animation, fast hover
 * color-shift on icon badges + cards, small type scale.
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
      className={`transition-all duration-600 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- Icon SVGs (simple line icons) ----------
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16l5-5 4 4 7-8" />
      <path d="M14 7h6v6" />
    </svg>
  );
}

const features = [
  {
    Icon: TargetIcon,
    title: "Adult is all we do",
    desc: "Every strategy is engineered for adult platforms, audiences and compliance — not borrowed from generic playbooks.",
  },
  {
    Icon: ShieldIcon,
    title: "Compliance-aware by default",
    desc: "We grow rankings aggressively while protecting your brand, payment processors and platform partnerships.",
  },
  {
    Icon: TrendIcon,
    title: "Compounding organic growth",
    desc: "White-hat work that builds durable visibility, qualified traffic and revenue that grows month after month.",
  },
];

function FeatureCard({ Icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group cursor-default">
        <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center transition-all duration-200 ease-out group-hover:bg-rose-500 group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-rose-300/60 group-hover:rotate-3">
          <Icon />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-rose-600">
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-600 max-w-xs">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

export default function WhySpecialistSection() {
  return (
    <section
      aria-labelledby="why-specialist-heading"
      className="bg-gradient-to-b from-indigo-50 to-white py-16 px-6 sm:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-rose-500 text-[11px] font-bold tracking-[0.15em] uppercase">
            <span className="w-4 h-px bg-rose-500" />
            Why These Results Happen
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="why-specialist-heading"
            className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900"
          >
            A specialist partner, not a generalist agency
          </h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={150 + i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}