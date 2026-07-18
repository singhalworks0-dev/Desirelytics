import React, { useEffect, useRef, useState } from "react";

/**
 * ProcessSection.jsx
 * "Our Adult Website Development Process" — React + Tailwind CSS
 * Includes: staggered entrance animation, hover color-shift on step number
 * + connector line, reduced font scale, semantic ordered-list markup for SEO.
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
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Discovery & Scope",
    desc: "We map your audience, content model and monetization strategy, then lock a clear scope, timeline and fixed quote — no surprises.",
  },
  {
    n: "02",
    title: "UX & UI Design",
    desc: "We design a premium, conversion-first interface and prototype every key flow before a line of code is written.",
  },
  {
    n: "03",
    title: "Development",
    desc: "We build front-end, back-end, payments and admin tooling in fast sprints, with working demos you can review every week.",
  },
  {
    n: "04",
    title: "QA & Compliance",
    desc: "We test on real devices, harden security, and verify age, payment and compliance flows before you go live.",
  },
  {
    n: "05",
    title: "AI-Powered Launch & SEO",
    desc: "We deploy to scalable, adult-friendly hosting with CI/CD, and run AI-powered SEO setup so your platform starts ranking from day one.",
  },
  {
    n: "06",
    title: "Scale & Support",
    desc: "We monitor performance with AI-driven analytics and keep adding features as you grow, so your platform stays faster, safer and more profitable.",
  },
];

function Step({ n, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative pl-1">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-500 transition-colors duration-300 group-hover:text-fuchsia-400">
            {n}
          </span>
          <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-fuchsia-500/40" />
        </div>

        <h3 className="mt-3 text-sm sm:text-base font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-300">
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] sm:text-sm leading-relaxed text-slate-400">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}

export default function ProcessSection() {
  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-20 right-1/4 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            HOW IT WORKS
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="process-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Our Adult Website
            <br />
            Development Process
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
            A proven, six-step build process — from scope to launch to
            AI-powered growth — so you always know what's next.
          </p>
        </Reveal>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 text-left">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Step {...s} delay={i * 100} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}