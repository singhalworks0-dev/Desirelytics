import React, { useEffect, useRef, useState } from "react";

/**
 * AudienceSection.jsx
 * "Adult Website Development for Every Brand" — React + Tailwind CSS
 * Includes: entrance animation over gradient backdrop, hover-elevate cards
 * with icon pop + glow, highlighted variant card, semantic markup for SEO.
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

const audiences = [
  {
    icon: "🎥",
    title: "Adult Creators",
    desc: "Launch your own subscription site or content app and stop renting your audience from someone else's platform.",
    highlight: false,
  },
  {
    icon: "🏢",
    title: "Studios & Networks",
    desc: "Custom platforms and tools to manage rosters, content and revenue across multiple adult brands at scale.",
    highlight: false,
  },
  {
    icon: "🚀",
    title: "Adult Startups",
    desc: "From MVP to funded scale-up, we build the product fast so you can test, launch and grow before the competition — with AI-powered analytics built in from day one.",
    highlight: true,
  },
  {
    icon: "🤝",
    title: "Agencies & Resellers",
    desc: "A white-label adult development partner you can resell with confidence — we build, you brand and bill.",
    highlight: false,
  },
  {
    icon: "📡",
    title: "Cam & Live Platforms",
    desc: "Full adult webcam website development with streaming, tokens and dashboards built to perform under load.",
    highlight: false,
  },
  {
    icon: "🛒",
    title: "Adult eCommerce Brands",
    desc: "Sex toy, lingerie and novelty stores with discreet, high-converting checkout and high-risk payments solved.",
    highlight: false,
  },
];

function AudienceCard({ icon, title, desc, highlight, delay }) {
  return (
    <Reveal delay={delay}>
      <article
        className={`group relative rounded-2xl p-6 sm:p-7 h-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl
          ${
            highlight
              ? "bg-[#0d0a16] border border-fuchsia-500/50 hover:shadow-fuchsia-900/50"
              : "bg-[#0d0a16]/90 border border-white/10 hover:border-fuchsia-500/40 hover:shadow-fuchsia-900/30"
          }
        `}
      >
        {/* top accent line */}
        <span
          className={`absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-300 ease-out
            ${highlight ? "bg-gradient-to-r from-rose-500 to-fuchsia-500 scale-x-100" : "bg-gradient-to-r from-rose-500 to-fuchsia-500 scale-x-0 group-hover:scale-x-100"}
          `}
        />
        {/* glow ring on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-rose-500/25" />

        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center text-xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
          {icon}
        </div>

        <h3
          className={`mt-4 text-base sm:text-lg font-bold transition-colors duration-300
            ${highlight ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-400"}
          `}
        >
          {title}
        </h3>
        <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-slate-400">
          {desc}
        </p>
      </article>
    </Reveal>
  );
}

export default function AudienceSection() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="relative py-20 px-6 sm:px-10 overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-800"
    >
      {/* ambient blobs to echo original background texture */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/30 bg-white/10 text-white text-[11px] font-bold tracking-wide backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300" />
            WHO WE BUILD FOR
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="audience-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Adult Website Development
            <br />
            for Every Brand
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-white/75 text-sm leading-relaxed">
            Whichever side of the industry you're building for, we tailor
            the platform, payments and AI-powered growth tools to fit.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {audiences.map((a, i) => (
            <AudienceCard key={a.title} {...a} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}