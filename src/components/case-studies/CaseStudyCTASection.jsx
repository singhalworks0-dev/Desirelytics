import React, { useEffect, useRef, useState } from "react";

/**
 * CaseStudyCTASection.jsx
 * "Want to be our next case study?" gradient CTA banner — React + Tailwind CSS
 * Includes: entrance animation, ambient glow behind the banner,
 * single "Book a Call" button with fast hover scale + shine sweep.
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
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function CaseStudyCTASection() {
  return (
    <section
      aria-labelledby="case-study-cta-heading"
      className="relative bg-[#0a0612] py-16 px-6 sm:px-10 overflow-hidden"
    >
      <Reveal>
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 px-8 sm:px-14 py-14 text-center">
          {/* ambient glow bleeding outside the card */}
          <div className="pointer-events-none absolute -inset-10 bg-rose-600/30 blur-3xl -z-10" />
          {/* subtle inner texture */}
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />

          <h2
            id="case-study-cta-heading"
            className="relative text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white"
          >
            Want to be our next case study?
          </h2>
          <p className="relative mt-4 max-w-xl mx-auto text-white/90 text-sm sm:text-base leading-relaxed">
            Tell us about your platform and we'll show you exactly where
            your next wave of organic growth is hiding.
          </p>

          <div className="relative mt-8 flex justify-center">
            <button className="group relative px-8 py-3 rounded-full font-bold text-rose-600 bg-white overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-black/20">
              {/* shine sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-rose-200/60 to-transparent" />
              <span className="relative">Book a Call</span>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}