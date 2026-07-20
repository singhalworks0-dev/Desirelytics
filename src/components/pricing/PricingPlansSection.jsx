import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * PricingPlansSection.jsx
 * "Transparent Adult SEO Pricing Plans" — React + Tailwind CSS
 * Includes: entrance animation, hover-elevate cards with glow border,
 * animated checkmarks, "Most Popular" ribbon, fast button hover with shine.
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
      { threshold: 0.1 }
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

const plans = [
  {
    tier: "FOREPLAY",
    price: "$1,297",
    tagline: "New adult sites, creators and small brands",
    features: [
      "Basic SEO audit",
      "15 adult keywords tracked",
      "5 new pages created & optimized/month",
      "10 blog posts/month",
      "25 adult-friendly backlinks/month",
      "1 press release/month",
    ],
    featured: false,
  },
  {
    tier: "AROUSAL",
    price: "$1,997",
    tagline: "Adult eCommerce, AI tools, dating, webcam & affiliate sites",
    features: [
      "Full SEO audit",
      "25 adult keywords tracked",
      "10 landing pages created & optimized/month",
      "10 blog posts/month",
      "AI-powered content optimization",
      "50 backlinks/month + strategy call",
      "1 press release/month",
    ],
    featured: true,
  },
  {
    tier: "SATISFY",
    price: "$2,997",
    tagline: "Competitive adult brands, SaaS, marketplaces & large affiliate sites",
    features: [
      "Advanced SEO audit",
      "60 adult keywords tracked",
      "15 pages created & optimized/month",
      "20 blog posts optimized/month",
      "155 backlinks + AI search optimization",
      "Dedicated AI-driven growth strategist",
      "2 press releases/month",
    ],
    featured: false,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4 flex-shrink-0" fill="none">
      <path
        d="M4 10.5l3.5 3.5L16 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlanCard({ tier, price, tagline, features, featured, delay }) {
  return (
    <Reveal delay={delay} className={featured ? "lg:-mt-4" : ""}>
      <div
        className={`group relative rounded-2xl h-full flex flex-col p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-2
          ${
            featured
              ? "bg-[#0f0a17] border-2 border-rose-500 shadow-xl shadow-rose-900/30 hover:shadow-2xl hover:shadow-rose-900/50"
              : "bg-white/[0.03] border border-white/10 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/20"
          }
        `}
      >
        {featured && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white text-[11px] font-bold tracking-wide shadow-lg">
            MOST POPULAR
          </span>
        )}

        {/* glow ring on hover */}
        <div
          className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
            featured
              ? "bg-gradient-to-r from-rose-500/30 to-fuchsia-500/30"
              : "bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20"
          }`}
        />

        <div className="text-center">
          <span className="text-xs font-bold tracking-[0.15em] text-rose-400">
            {tier}
          </span>
          <div className="mt-3 flex items-end justify-center gap-1">
            <span className="text-4xl font-extrabold text-white">{price}</span>
            <span className="text-sm text-slate-400 mb-1">/mo</span>
          </div>
          <p className="mt-3 text-[13px] text-slate-400 leading-relaxed min-h-[38px]">
            {tagline}
          </p>
        </div>

        <div className="mt-6 h-px bg-white/10" />

        <ul className="mt-6 space-y-3 flex-1">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 text-[13px] text-slate-300 group/item"
            >
              <span className="mt-0.5 text-rose-400 transition-transform duration-200 group-hover:scale-110">
                <CheckIcon />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={`group/btn relative mt-8 px-6 py-2.5 rounded-full font-bold text-sm overflow-hidden transition-all duration-200 ease-out hover:scale-105 active:scale-95
            ${
              featured
                ? "text-white"
                : "text-rose-400 border border-rose-500/50 hover:text-white"
            }
          `}
        >
          {featured ? (
            <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-200 group-hover/btn:scale-105" />
          ) : (
            <span className="absolute inset-0 bg-rose-500 scale-x-0 origin-left transition-transform duration-200 group-hover/btn:scale-x-100" />
          )}
          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <span className="relative">Choose {tier.charAt(0) + tier.slice(1).toLowerCase()}</span>
        </Link>
      </div>
    </Reveal>
  );
}

export default function PricingPlansSection() {
  return (
    <section
      aria-labelledby="pricing-plans-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-72 bg-rose-800/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <h2
            id="pricing-plans-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Transparent Adult SEO Pricing Plans
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
            Three adult SEO packages built around AI-powered strategy, to
            match your stage and budget. Every plan is penalty-safe, fully
            managed and reported monthly.
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 sm:gap-7 items-start">
          {plans.map((p, i) => (
            <PlanCard key={p.tier} {...p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}