import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * CustomQuoteCTASection.jsx
 * "Get Your Custom Adult SEO Quote" closing CTA — React + Tailwind CSS
 * Includes: entrance animation, ambient glow, dark button with fast hover
 * scale + shine sweep and color inversion.
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
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CustomQuoteCTASection() {
  return (
    <section
      aria-labelledby="custom-quote-heading"
      className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_25%_25%,white,transparent_40%)]" />

      <Reveal className="relative max-w-2xl mx-auto text-center">
        <h2
          id="custom-quote-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight"
        >
          Get Your Custom Adult SEO Quote
        </h2>
        <p className="mt-4 text-slate-800/80 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          Not sure which package fits, or need something tailored? Get
          transparent adult SEO pricing built around your goals — powered
          by AI-driven strategy, no pressure, no jargon, just a clear plan
          and cost.
        </p>

        <div className="mt-8">
          <Link to="/contact" className="group relative px-8 py-3.5 rounded-full font-bold text-white overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95">
            <span className="absolute inset-0 bg-slate-900 transition-transform duration-200 group-hover:scale-105" />
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">Request Custom Pricing</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default CustomQuoteCTASection;