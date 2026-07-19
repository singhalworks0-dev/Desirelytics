import React, { useEffect, useRef, useState } from "react";

/**
 * ComparisonTableSection.jsx
 * "Compare Every Adult SEO Package" table — React + Tailwind CSS
 * Includes: entrance animation, per-row hover highlight with color shift,
 * per-cell hover pop, highlighted middle-tier column, small type scale.
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

const columns = [
  { key: "foreplay", name: "Foreplay", price: "$1,297/mo", featured: false },
  { key: "arousal", name: "Arousal", price: "$1,997/mo", featured: true },
  { key: "satisfy", name: "Satisfy", price: "$2,997/mo", featured: false },
];

const rows = [
  { label: "Best For", foreplay: "New adult sites, creators, small brands", arousal: "Adult eCommerce, AI tools, dating, webcam, affiliate sites", satisfy: "Competitive adult brands, SaaS, marketplaces, large affiliate sites" },
  { label: "SEO Audit", foreplay: "Basic audit", arousal: "Full audit", satisfy: "Advanced audit" },
  { label: "Adult Keyword Research", foreplay: "15 keywords", arousal: "25 keywords", satisfy: "60 keywords" },
  { label: "Competitor Analysis", foreplay: "3 competitors", arousal: "5 competitors", satisfy: "8 competitors" },
  { label: "Pages Created & Optimized", foreplay: "5 new pages/month", arousal: "10 landing pages/month", satisfy: "15 pages/month" },
  { label: "Blog Posts", foreplay: "10/month", arousal: "10/month", satisfy: "20/month" },
  { label: "Technical SEO", foreplay: "Basic fixes", arousal: "Advanced fixes", satisfy: "Full technical SEO" },
  { label: "Internal Linking", foreplay: "Basic", arousal: "Advanced", satisfy: "Topical authority linking" },
  { label: "Adult-Friendly Backlinks", foreplay: "25/month", arousal: "50/month", satisfy: "155/month" },
  { label: "Digital PR", foreplay: "1/month", arousal: "1/month", satisfy: "2/month" },
  { label: "Anchor Text Strategy", foreplay: "Basic", arousal: "Included", satisfy: "Advanced" },
  { label: "GA4/GSC Review", foreplay: "GSC only", arousal: "GA4 + GSC", satisfy: "GA4 + GSC + rank tracking" },
  { label: "AI Search Optimization", foreplay: "—", arousal: "—", satisfy: "Included" },
  { label: "CRO Suggestions", foreplay: "—", arousal: "Basic", satisfy: "Advanced" },
  { label: "Strategy Call", foreplay: "—", arousal: "1/month", satisfy: "2/month" },
  { label: "Monthly Report", foreplay: "Included", arousal: "Detailed report", satisfy: "Advanced report + roadmap" },
];

function Cell({ value, featured }) {
  const isDash = value === "—";
  return (
    <td className="px-4 py-3.5 text-center">
      <span
        className={`inline-block px-2 py-1 rounded-md text-[12.5px] transition-all duration-150 ease-out
          ${isDash ? "text-slate-600" : featured ? "text-rose-300 font-semibold" : "text-slate-300"}
          group-hover:scale-105 group-hover:text-white
          ${!isDash && "group-hover:bg-white/[0.06]"}
        `}
      >
        {value}
      </span>
    </td>
  );
}

export default function ComparisonTableSection() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-72 bg-fuchsia-800/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            FULL COMPARISON
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="comparison-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Compare Every Adult SEO Package
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
            A side-by-side breakdown of exactly what each adult SEO package
            includes, so you can see precisely what your monthly cost
            delivers.
          </p>
        </Reveal>

        <Reveal delay={300} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse rounded-2xl overflow-hidden text-left">
            <thead>
              <tr>
                <th className="px-4 py-4 bg-white/[0.03] text-xs font-bold text-slate-400 uppercase tracking-wide w-1/4">
                  Services
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 py-4 text-center transition-colors duration-200 ${
                      c.featured
                        ? "bg-gradient-to-br from-rose-600 to-fuchsia-600"
                        : "bg-white/[0.03]"
                    }`}
                  >
                    <div className={`text-sm font-bold ${c.featured ? "text-white" : "text-white"}`}>
                      {c.name}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${c.featured ? "text-rose-100" : "text-rose-400"}`}>
                      {c.price}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.label}
                  className={`group cursor-default transition-colors duration-150 ease-out
                    ${i % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"}
                    hover:bg-fuchsia-500/10
                  `}
                >
                  <td className="px-4 py-3.5 text-[12.5px] font-semibold text-slate-200 border-t border-white/5 transition-colors duration-150 group-hover:text-fuchsia-300">
                    {r.label}
                  </td>
                  <td className="border-t border-white/5">
                    <Cell value={r.foreplay} />
                  </td>
                  <td className="border-t border-white/5 bg-rose-500/[0.04] group-hover:bg-rose-500/[0.08] transition-colors duration-150">
                    <Cell value={r.arousal} featured />
                  </td>
                  <td className="border-t border-white/5">
                    <Cell value={r.satisfy} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}