import React, { useEffect, useRef, useState } from "react";

/**
 * SecuritySection.jsx
 * "Security & Privacy Built Into Every Build" grid — React + Tailwind CSS
 * Includes: staggered entrance animation, hover-elevate cards with icon pop,
 * gradient-glow border, and semantic markup for SEO.
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

const securityItems = [
  {
    icon: "🔐",
    title: "Encryption & Data Privacy",
    desc: "AES-256 encryption, SSL everywhere and privacy-by-design architecture that protects sensitive user and creator data.",
  },
  {
    icon: "🛡️",
    title: "Secure Auth & 2FA",
    desc: "Tokenized logins, two-factor and biometric auth, session fingerprinting and IP-based restrictions to stop account takeovers.",
  },
  {
    icon: "🚨",
    title: "DDoS & Fraud Protection",
    desc: "Cloudflare and AWS Shield protection, 3D Secure, velocity checks and AVS/CVV to block attacks and reduce chargebacks.",
  },
  {
    icon: "📋",
    title: "GDPR / CCPA Compliance",
    desc: "Cookie consent, 18+ gating, data-subject rights and audit-ready logs so your platform stays compliant across regions.",
  },
  {
    icon: "🧹",
    title: "DMCA & Content Moderation",
    desc: "Takedown workflows, AI-assisted moderation and reporting tools that keep your platform clean, legal and brand-safe.",
  },
  {
    icon: "🖥️",
    title: "Safe Infrastructure",
    desc: "Staging workflows, automated backups and tested rollouts on adult-friendly cloud, so new features never break production.",
  },
];

function SecurityCard({ icon, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 sm:p-7 h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.06] hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/30">
        {/* glow ring on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-rose-500/25" />

        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center text-xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>

        <h3 className="mt-4 text-base sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-400">
          {title}
        </h3>
        <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-slate-400">
          {desc}
        </p>
      </article>
    </Reveal>
  );
}

export default function SecuritySection() {
  return (
    <section
      aria-labelledby="security-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 bg-fuchsia-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            SECURITY FIRST
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="security-heading"
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          >
            Security &amp; Privacy Built Into
            <br />
            Every Build
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            In adult, trust is everything. We engineer security and privacy
            into the core of your platform — not as an afterthought — and
            back it with AI-assisted monitoring to catch issues before they
            become incidents.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {securityItems.map((item, i) => (
            <SecurityCard key={item.title} {...item} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}