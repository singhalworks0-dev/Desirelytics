import React, { useEffect, useRef, useState } from "react";

/**
 * ProblemSection.jsx
 * "Why generic agencies fail" comparison section — React + Tailwind CSS
 * Includes: entrance animations, animated gradient backdrop,
 * hover-interactive comparison cards, staggered list-item reveals.
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const failPoints = [
  "They refuse adult content or quietly drop you mid-build",
  "No real strategy for high-risk payment gateways or chargebacks",
  "Hosting and CDNs that throttle or ban adult traffic overnight",
  "Zero age-verification or compliance experience",
  "Static templates with no AI-driven personalization or SEO logic",
  "Slow, manual workflows that miss your launch window",
];

const needPoints = [
  "High-risk, adult-friendly payment integrations",
  "Age verification, 2257 records and compliance baked in",
  "AI-optimized site architecture that adapts to search intent",
  "Bulletproof, scalable hosting for heavy media libraries",
  "Content protection, watermarking and anti-piracy tooling",
  "A discreet team that ships fast and signs an NDA",
];

function ComparisonCard({ variant, title, points }) {
  const isFail = variant === "fail";
  return (
    <div
      className={`group relative rounded-2xl p-8 sm:p-9 bg-white transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
        ${isFail ? "hover:shadow-rose-900/30" : "hover:shadow-fuchsia-900/30"}
      `}
    >
      {/* animated gradient border glow on hover */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm
          ${isFail ? "bg-gradient-to-r from-rose-500 to-pink-500" : "bg-gradient-to-r from-fuchsia-500 to-purple-500"}
        `}
      />

      <h3
        className={`text-xl font-extrabold mb-6 ${
          isFail ? "text-fuchsia-600" : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <ul className="space-y-4">
        {points.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-slate-700 text-[15px] leading-snug"
          >
            <span
              className={`mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transition-transform duration-300 group-hover:scale-110
                ${
                  isFail
                    ? "bg-rose-100 text-rose-600"
                    : "bg-rose-500 text-white"
                }
              `}
            >
              {isFail ? "✕" : "✓"}
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative py-24 px-6 sm:px-10 overflow-hidden bg-gradient-to-br from-rose-600 via-fuchsia-700 to-purple-800">
      {/* ambient animated blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 text-white text-xs font-bold tracking-wide backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            THE REAL PROBLEM
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Why Mainstream Agencies Fail
            <br />
            Adult Brands
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl mx-auto text-white/85 text-base sm:text-lg leading-relaxed">
            Generic web agencies freeze the moment a project turns adult.
            They don't understand high-risk payments, compliance, or scale
            — and they can't tell you why your site isn't ranking. You need
            a team that builds and optimizes adult platforms with AI-driven
            SEO, every single day.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6 sm:gap-8 text-left">
          <Reveal delay={300}>
            <ComparisonCard
              variant="fail"
              title="Where Generic Agencies Fall Short"
              points={failPoints}
            />
          </Reveal>
          <Reveal delay={450}>
            <ComparisonCard
              variant="win"
              title="What Adult Platforms Really Need"
              points={needPoints}
            />
          </Reveal>
        </div>

        <Reveal delay={600}>
          <p className="mt-14 max-w-3xl mx-auto text-white/80 text-sm sm:text-base leading-relaxed">
            That's exactly why ambitious adult brands hire SecureLaunch
            Studio. We build, scale, and continuously optimize platforms
            with AI-powered SEO and performance tooling that mainstream
            agencies simply aren't equipped to touch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}