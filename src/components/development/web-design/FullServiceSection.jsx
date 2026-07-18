import React, { useEffect, useRef, useState } from "react";

/**
 * FullServiceSection.jsx
 * "Everything We Develop" pill/tag cloud — React + Tailwind CSS
 * Includes: staggered pop-in entrance, hover lift + glow on pills,
 * subtle ambient background glow.
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

const services = [
  "Adult Content Website Development",
  "Adult Subscription Platform Setup",
  "Adult eCommerce Development",
  "Video Streaming Platform Development",
  "Live Cam Site Development",
  "Adult Dating App Development",
  "Adult Membership Site Development",
  "Adult CMS Development",
  "Payment Gateway Integration",
  "Mobile-Responsive UI/UX Design",
  "Privacy & Compliance Setup",
  "Adult Marketplace Platforms",
  "Custom Feature Integration",
  "Adult NFT & Fan Token Integration",
  "AI-Powered SEO & Content Optimization",
  "AI-Driven Digital Marketing & Growth",
  "Maintenance & Support Services",
];

// ---------- Pop-in Pill ----------
function ServicePill({ label, delay }) {
  const [ref, visible] = useReveal();
  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative inline-flex items-center px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-sm font-semibold text-slate-200
        transition-all duration-500 ease-out cursor-default
        hover:-translate-y-1 hover:text-white hover:border-fuchsia-400/50 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-fuchsia-900/40
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      {/* glow on hover */}
      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/30 to-rose-500/30" />
      {label}
    </span>
  );
}

export default function FullServiceSection() {
  return (
    <section className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] bg-fuchsia-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            FULL-SERVICE
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Everything We Develop for the
            <br />
            Adult Industry
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            From a single-model site to a global platform, our adult website
            development services cover the full build — design, code,
            payments, compliance, AI-powered SEO, launch and ongoing support.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-3.5">
          {services.map((s, i) => (
            <ServicePill key={s} label={s} delay={i * 45} />
          ))}
        </div>
      </div>
    </section>
  );
}