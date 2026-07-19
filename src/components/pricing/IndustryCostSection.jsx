import React, { useEffect, useRef, useState } from "react";

/**
 * IndustryCostSection.jsx
 * "Adult SEO Cost by Industry" — React + Tailwind CSS
 * Includes: entrance animation, hover-elevate cards with glow border,
 * inline highlighted keyword links with animated underline.
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

// ---------- Animated Internal Link ----------
function KeyLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="relative inline-block font-semibold text-rose-400 transition-colors duration-150 hover:text-fuchsia-300
        after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0
        after:bg-gradient-to-r after:from-rose-400 after:to-fuchsia-400 after:transition-transform after:duration-200
        hover:after:scale-x-100"
    >
      {children}
    </a>
  );
}

const industries = [
  {
    title: "Cam Site SEO Cost",
    body: (
      <>
        Cam and live-streaming niches are competitive, so most{" "}
        <KeyLink href="/cam-site-seo">cam site SEO</KeyLink> campaigns start
        at $1,997/mo (Arousal) and scale to Satisfy as traffic compounds.
      </>
    ),
  },
  {
    title: "Adult eCommerce SEO Cost",
    body: "Adult stores and toy retailers usually run on Arousal ($1,997/mo) for AI-driven product, category and content optimization at scale.",
  },
  {
    title: "OnlyFans & Creator SEO Cost",
    body: (
      <>
        Creators often start on Foreplay ($1,297/mo); growing{" "}
        <KeyLink href="/onlyfans-seo">OnlyFans SEO</KeyLink> programs move
        up to Arousal for AI-powered content velocity.
      </>
    ),
  },
  {
    title: "Dating Site SEO Cost",
    body: "Dating and hookup sites are competitive; budget from $1,997/mo (Arousal) upward depending on your target markets and AI-matched keyword strategy.",
  },
  {
    title: "Tube & Porn Site SEO Cost",
    body: (
      <>
        High-competition tube and{" "}
        <KeyLink href="/porn-site-seo">porn site SEO</KeyLink> usually needs
        the Satisfy package ($2,997/mo) for full technical and AI search
        optimization.
      </>
    ),
  },
  {
    title: "Erotic Massage SEO Cost",
    body: (
      <>
        Local{" "}
        <KeyLink href="/erotic-massage-seo">erotic massage SEO</KeyLink>{" "}
        often starts on Foreplay ($1,297/mo) with a local and Map Pack
        focus.
      </>
    ),
  },
];

function IndustryCard({ title, body, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative rounded-xl bg-white/[0.03] border border-white/10 p-6 h-full transition-all duration-200 ease-out hover:-translate-y-2 hover:border-fuchsia-500/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-fuchsia-900/25">
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20" />
        <h3 className="text-sm sm:text-base font-bold text-white transition-colors duration-150 group-hover:text-fuchsia-400">
          {title}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">
          {body}
        </p>
      </div>
    </Reveal>
  );
}

export function IndustryCostSection() {
  return (
    <section
      aria-labelledby="industry-cost-heading"
      className="relative bg-[#0d0a15] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-96 h-72 bg-rose-800/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            BY INDUSTRY
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="industry-cost-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Adult SEO Cost by Industry
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">
            Adult SEO cost varies by niche and competition. Here's roughly
            what each industry should budget with AI-powered strategy, and
            which package usually fits best.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 text-left">
          {industries.map((ind, i) => (
            <IndustryCard key={ind.title} {...ind} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustryCostSection;