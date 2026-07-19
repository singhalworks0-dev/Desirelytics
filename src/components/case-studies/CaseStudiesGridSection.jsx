import React, { useEffect, useRef, useState } from "react";

/**
 * CaseStudiesGridSection.jsx
 * "Adult SEO Case Studies" portfolio grid — React + Tailwind CSS
 * Includes: staggered entrance animation, fast hover color-shift on cards,
 * category-tinted badges, small type scale, and abstract per-category SVG
 * motifs in place of real screenshots (non-explicit, decorative only).
 *
 * NOTE: Card names/stats are placeholders in a fictional-brand style.
 * Replace with real, verified client names and real metrics before publishing.
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
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- Category theme tokens ----------
const themes = {
  feet: { badge: "bg-rose-500", ring: "hover:border-rose-400/60 hover:shadow-rose-900/40", glow: "from-rose-500/25 to-pink-500/25", bg: "from-rose-950 to-black", stroke: "#fb7185" },
  cam: { badge: "bg-fuchsia-500", ring: "hover:border-fuchsia-400/60 hover:shadow-fuchsia-900/40", glow: "from-fuchsia-500/25 to-purple-500/25", bg: "from-fuchsia-950 to-black", stroke: "#e879f9" },
  ai: { badge: "bg-purple-500", ring: "hover:border-purple-400/60 hover:shadow-purple-900/40", glow: "from-purple-500/25 to-indigo-500/25", bg: "from-purple-950 to-black", stroke: "#c084fc" },
  doll: { badge: "bg-blue-500", ring: "hover:border-blue-400/60 hover:shadow-blue-900/40", glow: "from-blue-500/25 to-cyan-500/25", bg: "from-blue-950 to-black", stroke: "#60a5fa" },
  toy: { badge: "bg-teal-500", ring: "hover:border-teal-400/60 hover:shadow-teal-900/40", glow: "from-teal-500/25 to-emerald-500/25", bg: "from-teal-950 to-black", stroke: "#2dd4bf" },
  directory: { badge: "bg-amber-500", ring: "hover:border-amber-400/60 hover:shadow-amber-900/40", glow: "from-amber-500/25 to-orange-500/25", bg: "from-amber-950 to-black", stroke: "#fbbf24" },
  social: { badge: "bg-cyan-500", ring: "hover:border-cyan-400/60 hover:shadow-cyan-900/40", glow: "from-cyan-500/25 to-teal-500/25", bg: "from-cyan-950 to-black", stroke: "#22d3ee" },
  massage: { badge: "bg-orange-500", ring: "hover:border-orange-400/60 hover:shadow-orange-900/40", glow: "from-orange-500/25 to-amber-500/25", bg: "from-orange-950 to-black", stroke: "#fb923c" },
};

// ---------- Abstract per-category motif (decorative SVG, non-explicit) ----------
function CategoryMotif({ theme }) {
  const stroke = themes[theme].stroke;
  const common = { stroke, fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

  switch (theme) {
    case "cam":
      // concentric live-signal waves
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <circle cx="60" cy="40" r="6" fill={stroke} />
          <circle cx="60" cy="40" r="16" {...common} opacity="0.7" />
          <circle cx="60" cy="40" r="26" {...common} opacity="0.45" />
          <circle cx="60" cy="40" r="36" {...common} opacity="0.25" />
        </svg>
      );
    case "ai":
      // chat bubble + spark (companion/chatbot)
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <path d="M30 30 h50 a10 10 0 0 1 10 10 v14 a10 10 0 0 1 -10 10 h-30 l-12 10 v-10 h-8 a10 10 0 0 1 -10 -10 v-14 a10 10 0 0 1 10 -10 z" {...common} />
          <path d="M90 22 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 z" fill={stroke} opacity="0.9" />
        </svg>
      );
    case "doll":
      // storefront / product box
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <path d="M28 34 h64 v34 h-64 z" {...common} />
          <path d="M24 34 l6 -14 h60 l6 14" {...common} />
          <path d="M50 68 v-20 h20 v20" {...common} opacity="0.7" />
        </svg>
      );
    case "toy":
      // gift/product tag
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <rect x="34" y="30" width="52" height="38" rx="4" {...common} />
          <circle cx="60" cy="24" r="8" {...common} />
          <line x1="34" y1="46" x2="86" y2="46" {...common} opacity="0.5" />
        </svg>
      );
    case "feet":
      // path/footprint trail motif
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <ellipse cx="40" cy="30" rx="6" ry="9" fill={stroke} opacity="0.8" />
          <ellipse cx="58" cy="45" rx="6" ry="9" fill={stroke} opacity="0.55" />
          <ellipse cx="76" cy="60" rx="6" ry="9" fill={stroke} opacity="0.3" />
        </svg>
      );
    case "directory":
      // list/index card
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <rect x="30" y="22" width="60" height="36" rx="4" {...common} />
          <line x1="38" y1="34" x2="82" y2="34" {...common} opacity="0.6" />
          <line x1="38" y1="42" x2="70" y2="42" {...common} opacity="0.6" />
          <line x1="38" y1="50" x2="76" y2="50" {...common} opacity="0.6" />
        </svg>
      );
    case "social":
      // connected nodes / network
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <circle cx="40" cy="30" r="5" fill={stroke} />
          <circle cx="80" cy="26" r="5" fill={stroke} opacity="0.8" />
          <circle cx="60" cy="55" r="5" fill={stroke} opacity="0.6" />
          <line x1="40" y1="30" x2="80" y2="26" {...common} opacity="0.5" />
          <line x1="40" y1="30" x2="60" y2="55" {...common} opacity="0.5" />
          <line x1="80" y1="26" x2="60" y2="55" {...common} opacity="0.5" />
        </svg>
      );
    case "massage":
      // location pin (local SEO)
      return (
        <svg viewBox="0 0 120 80" className="w-24 h-16">
          <path d="M60 20 c12 0 20 8 20 19 c0 14 -20 29 -20 29 s-20 -15 -20 -29 c0 -11 8 -19 20 -19 z" {...common} />
          <circle cx="60" cy="39" r="6" {...common} />
        </svg>
      );
    default:
      return null;
  }
}

const caseStudies = [
  { tag: "Feet Pic Platform", theme: "feet", name: "StepMarket", desc: "Turned a feet-content marketplace into a page-one brand for its highest-intent searches with penalty-safe, creator-first SEO.", stats: ["+214% Organic Traffic", "900+ Page-1 Keywords", "3.4x Sign-ups"] },
  { tag: "Cam Site", theme: "cam", name: "LiveHourGlass", desc: "Scaled a live-cam platform from launch into competitive page-one rankings across high-volume cam search terms.", stats: ["+186% Organic Sessions", "Top-5 Core Cam Terms", "+147% Sign-ups"] },
  { tag: "Cam Site", theme: "cam", name: "PulseCams", desc: "Broke an established cam brand out of a 12-month ranking plateau with technical cleanup and topical authority.", stats: ["+92% Organic Traffic", "+38 Avg Positions", "+120% Revenue/Visit"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "EverHer.ai", desc: "Owned the fast-moving AI girlfriend search market for an NSFW AI companion app, from entity SEO to AI-search visibility.", stats: ["+340% Organic Traffic", "Top-3 AI-Companion Terms", "4.8x Free Trials"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "DreamMate.ai", desc: "Scaled an AI companion app with keyword-clustered, programmatic landing pages that compound organic demand.", stats: ["+268% Organic Traffic", "5,000+ Keywords Ranked", "+193% Installs"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "Lumechat AI", desc: "Built topical authority around AI chat and companion keywords to drive qualified organic traffic at scale.", stats: ["+274% Organic Traffic", "700+ Keywords Ranked", "3.5x Signups"] },
  { tag: "AI Companion & Chatbot", theme: "ai", name: "SweetSpark.ai", desc: "Enterprise-scale technical SEO and content support grew organic footprint as a leading AI companion and chatbot platform.", stats: ["+312% Organic Traffic", "900+ Keywords Ranked", "4x Organic Signups"] },
  { tag: "NSFW AI Platform", theme: "ai", name: "VelvetLab.ai", desc: "Specialist NSFW-safe SEO and link acquisition expanded organic footprint in the AI image and companion space.", stats: ["+264% Organic Traffic", "600+ Keywords Ranked", "-38% Acquisition Cost"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "Hushmate.AI", desc: "Keyword research and conversion-focused pages helped rank for high-value AI virtual companion searches.", stats: ["+239% Organic Traffic", "650+ Keywords Ranked", "3x Signups"] },
  { tag: "Silicone Doll Store", theme: "doll", name: "PureFormDolls", desc: "Product and category SEO plus authority links improved rankings for silicone and sex doll buying terms.", stats: ["+296% Organic Traffic", "850+ Keywords Ranked", "+176% Revenue"] },
  { tag: "AI Companion", theme: "ai", name: "Idylle.ai", desc: "Content velocity and on-page optimization grew share of AI girlfriend and companion search demand.", stats: ["+251% Organic Traffic", "720+ Keywords Ranked", "4x Signups"] },
  { tag: "Feet Pic Platform", theme: "feet", name: "SoleSeekers", desc: "Marketplace and creator-page SEO strengthened organic visibility across feet-content search queries.", stats: ["+341% Organic Traffic", "1,200+ Keywords Ranked", "+190% Creator Signups"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "MyOwnFlame", desc: "Grew organic reach with AI-companion content and a clean, scalable site structure.", stats: ["+233% Organic Traffic", "680+ Keywords Ranked", "3.5x Signups"] },
  { tag: "AI Virtual Companion", theme: "ai", name: "NightVeil.ai", desc: "Topical content and authority building expanded visibility across AI virtual companion keywords.", stats: ["+221% Organic Traffic", "640+ Keywords Ranked", "3x Signups"] },
  { tag: "Adult Social Media", theme: "social", name: "OpenlyShare", desc: "Large-scale technical and content SEO supported organic growth as an adult social platform.", stats: ["+207% Organic Traffic", "12,000+ Keywords Ranked", "+158% Pages Ranking"] },
  { tag: "Cam Site", theme: "cam", name: "SodaCamLive", desc: "Competitive cam-vertical SEO and content scaled organic visibility across high-volume live-cam and model search terms.", stats: ["+229% Organic Traffic", "5,500+ Keywords Ranked", "+171% Visits"] },
  { tag: "Massage Parlour", theme: "massage", name: "Exotic Touch Bangkok", desc: "Local SEO and Google Business Profile optimization for an adult massage parlour, building real reviews and Map Pack visibility in a competitive local market.", stats: ["100+ Reviews", "Top 5 on Google Maps"] },
];

function Badge({ label, theme }) {
  return (
    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-white ${themes[theme].badge}`}>
      {label}
    </span>
  );
}

function StatPill({ label }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] font-semibold border border-white/15 bg-white/5 text-slate-200">
      <span className="text-emerald-400">✓</span>
      {label}
    </span>
  );
}

function CaseStudyCard({ tag, theme, name, desc, stats, delay }) {
  const t = themes[theme];
  return (
    <Reveal delay={delay}>
      <article className={`group relative rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-xl ${t.ring}`}>
        <div className={`pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r ${t.glow}`} />

        {/* abstract motif area */}
        <div className={`relative h-36 bg-gradient-to-br ${t.bg} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:14px_14px]" />
          <Badge label={tag} theme={theme} />
          <div className="transition-transform duration-300 ease-out group-hover:scale-110">
            <CategoryMotif theme={theme} />
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-bold text-white transition-colors duration-150 group-hover:text-fuchsia-400">
            {name}
          </h3>
          <p className="mt-1.5 text-[12px] leading-relaxed text-slate-400">
            {desc}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stats.map((s) => (
              <StatPill key={s} label={s} />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function CaseStudiesGridSection() {
  return (
    <section aria-labelledby="case-studies-grid-heading" className="bg-[#0a0612] py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-rose-400 text-[11px] font-bold tracking-[0.15em] uppercase">
            <span className="w-4 h-px bg-rose-400" />
            Our Work
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="case-studies-grid-heading" className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
            Adult SEO Case Studies
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-2 max-w-2xl text-slate-400 text-sm leading-relaxed">
            A growing portfolio of adult platforms we've partnered with.
            Real screenshots are on the way — the AI-powered SEO results
            stay the same.
          </p>
        </Reveal>

        <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((cs, i) => (
            <CaseStudyCard key={cs.name} {...cs} delay={(i % 6) * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}