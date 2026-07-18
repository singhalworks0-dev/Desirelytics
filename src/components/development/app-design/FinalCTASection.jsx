import React, { useEffect, useRef, useState } from "react";

/**
 * FinalCTASection.jsx
 * Closing "Ready to Launch" call-to-action — React + Tailwind CSS
 * Includes: entrance animation, ambient pulsing gradient backdrop,
 * button hover (scale + glow + shine sweep), semantic markup for SEO.
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

export default function FinalCTASection() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative py-24 px-6 sm:px-10 overflow-hidden bg-[#0a0612]"
    >
      {/* ambient pulsing gradient backdrop */}
      <div className="pointer-events-none absolute -top-32 -left-20 w-[28rem] h-[28rem] bg-indigo-700/25 rounded-full blur-3xl animate-pulse" />
      <div
        className="pointer-events-none absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-rose-700/25 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Ready to Launch an AI Agent
            <br />
            That Sells While You Sleep?
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book a free AI strategy call and we'll map the fastest, most
            profitable path to your own AI-powered platform — the personas,
            the models, the monetization and the timeline.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <button className="group relative mt-9 inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-[#1a0510] bg-gradient-to-r from-rose-500 to-fuchsia-500 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            {/* pulsing glow ring */}
            <span className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 opacity-0 group-hover:opacity-60 blur-lg transition-opacity duration-300 -z-10" />
            {/* shine sweep on hover */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="relative">Book a Free AI Strategy Call</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}