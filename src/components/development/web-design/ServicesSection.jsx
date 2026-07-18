import React, { useEffect, useRef, useState } from "react";

/**
 * ServicesSection.jsx
 * "What We Build" services grid — React + Tailwind CSS
 * Includes: entrance animations, elevate-on-hover cards, icon pop,
 * gradient-glow borders, and placeholder icon mockups (swap for real images).
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

// ---------- Placeholder Icon Mockup ----------
// Stand-in header graphic for each service — swap with <img src="..." /> later.
function ServiceMockup({ gradient, icon }) {
  return (
    <div
      className={`relative h-36 sm:h-40 rounded-t-xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
      <span className="text-4xl drop-shadow-lg">{icon}</span>
    </div>
  );
}

const services = [
  {
    icon: "🤖",
    gradient: "from-indigo-600 to-fuchsia-700",
    title: "Adult Chatbot Development",
    desc: "AI companion and chatbot apps with custom personalities, voice, paid messaging and token billing — tuned with AI-powered engagement optimization to monetize every conversation.",
  },
  {
    icon: "🛍️",
    gradient: "from-rose-600 to-pink-700",
    title: "Adult eCommerce Development",
    desc: "Discreet checkout, age gates, subscriptions and high-risk payment gateways — built mobile-first with AI-driven SEO and product-ranking optimization.",
  },
  {
    icon: "🧍",
    gradient: "from-pink-400 to-rose-500",
    title: "Sex Doll Website Development",
    desc: "Rich product configurators, reviews and secure checkout, engineered with AI-powered search optimization to turn browsers into buyers.",
  },
  {
    icon: "📹",
    gradient: "from-red-700 to-rose-900",
    title: "Cam Site Website Development",
    desc: "Live streaming, private shows, tipping and model dashboards — built for low latency, massive concurrency, and AI-optimized discovery.",
  },
  {
    icon: "💞",
    gradient: "from-fuchsia-500 to-purple-600",
    title: "Adult Dating Website Development",
    desc: "Smart matching, chat, geolocation and premium memberships — scalable platforms with AI-powered growth marketing baked in.",
  },
  {
    icon: "📸",
    gradient: "from-rose-500 to-pink-600",
    title: "Niche Content Marketplaces",
    desc: "Creator profiles, paywalls, messaging and payouts for niche content platforms — launched with AI-driven SEO to help you rank and earn faster.",
  },
];

function ServiceCard({ icon, gradient, title, desc }) {
  return (
    <div className="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-fuchsia-900/30 hover:border-fuchsia-500/40">
      {/* glow ring on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/40 to-rose-500/40" />

      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <ServiceMockup gradient={gradient} icon={icon} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-400">
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-[#0a0612] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            WHAT WE BUILD
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            Adult Website Development Services
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm sm:text-[15px] leading-relaxed">
            Conversion-focused adult platforms — designed, engineered and
            continuously improved with AI-powered SEO, optimization and
            digital marketing, by a team that does this every day.
          </p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}