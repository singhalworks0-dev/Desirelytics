import React, { useEffect, useRef, useState } from "react";

/**
 * ServicePageLayout.jsx
 * ONE shared layout for every adult-SEO service page (OnlyFans, Cam Site,
 * Chaturbate, Porn Site, Dating, Foot Fetish, Erotic Massage, eCommerce,
 * Sex Toy Store, AI Companion, Affiliate, Link Building, etc).
 *
 * Every section reads from the `data` prop only — never edit this file to
 * change content. To add a new page, create a new data file (see
 * data/onlyfansSeoData.js as the reference shape) and render:
 *   <ServicePageLayout data={yourData} />
 *
 * All animations (scroll-reveal, hover lift/glow, accordion, count-up,
 * shine-sweep buttons) live here once and apply to every page automatically.
 */

// =========================================================
// Shared animation primitives
// =========================================================
function useReveal(threshold = 0.15) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
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

function CountUp({ target, suffix = "", delay = 0 }) {
  const [ref, visible] = useReveal(0.4);
  const [value, setValue] = useState(0);
  const isNumeric = typeof target === "number";

  useEffect(() => {
    if (!visible || !isNumeric) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, isNumeric]);

  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`inline-block transition-all duration-500 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      {isNumeric ? value : target}
      {suffix}
    </span>
  );
}

// ---------- Shared eyebrow badge ----------
function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      {children}
    </span>
  );
}

// ---------- Shared primary button ----------
function PrimaryButton({ children, href = "#", className = "" }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-white text-sm overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-200 group-hover:scale-105" />
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <span className="relative">{children}</span>
    </a>
  );
}

// ---------- Animated internal link ----------
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

// =========================================================
// 1. Hero
// =========================================================
function HeroSection({ hero }) {
  return (
    <section className="relative px-6 sm:px-10 pt-16 pb-14 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute top-40 right-0 w-72 h-72 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal><Eyebrow>{hero.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {hero.description}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8">
            <PrimaryButton href={hero.ctaHref || "#contact"}>{hero.ctaLabel}</PrimaryButton>
          </div>
        </Reveal>

        {hero.bullets?.length > 0 && (
          <Reveal delay={400}>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {hero.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-300">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 text-[9px]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {hero.stats?.length > 0 && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {hero.stats.map((s, i) => (
              <Reveal key={s.label} delay={500 + i * 100}>
                <div className="group relative rounded-xl bg-white/[0.03] border border-white/10 px-4 py-5 text-center transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-rose-500/40 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-rose-900/30">
                  <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r from-rose-500/25 to-fuchsia-500/25" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-500">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-slate-400">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// =========================================================
// 2. Problem section (two-column list)
// =========================================================
function ProblemSection({ problem }) {
  return (
    <section className="relative py-20 px-6 sm:px-10 overflow-hidden bg-gradient-to-br from-rose-600 via-fuchsia-700 to-purple-800">
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{problem.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white leading-tight">{problem.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl mx-auto text-white/85 text-sm sm:text-base leading-relaxed">{problem.intro}</p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {problem.columns.map((col, ci) => (
            <Reveal key={col.heading} delay={300 + ci * 150}>
              <div className="group relative rounded-2xl p-8 bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl">
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm bg-gradient-to-r from-fuchsia-500 to-purple-500" />
                <h3 className="text-lg font-extrabold text-slate-900 mb-5">{col.heading}</h3>
                <ul className="space-y-3.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-slate-700 text-[14px]">
                      <span className="mt-0.5 text-rose-500">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={600}>
          <p className="mt-14 max-w-3xl mx-auto text-white/80 text-sm leading-relaxed">{problem.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}

// =========================================================
// 3. Services / "What We Do" grid
// =========================================================
function ServicesGridSection({ services }) {
  return (
    <section className="bg-[#0a0612] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{services.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{services.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">{services.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group relative rounded-xl bg-white/5 border border-white/10 p-6 h-full transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/25">
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-rose-500/25" />
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-600/30 to-fuchsia-600/30 flex items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110">
                  {item.icon || "✦"}
                </div>
                <h3 className="mt-4 font-bold text-white text-sm sm:text-base transition-colors duration-150 group-hover:text-fuchsia-400">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// 4. Free AI Audit Tool (light bg)
// =========================================================
function FreeAIAuditSection({ audit }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return setStatus("error");
    setStatus("submitted");
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-50 py-20 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-600 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            {audit.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">{audit.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">{audit.description}</p>
        </Reveal>
        <Reveal delay={300}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto rounded-full bg-white p-1.5 shadow-lg shadow-purple-200/50 border border-white focus-within:ring-2 focus-within:ring-fuchsia-400/50 transition-all duration-200"
          >
            <input
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); if (status === "error") setStatus("idle"); }}
              placeholder="Enter your website URL"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none rounded-full"
            />
            <button
              type="submit"
              className="group relative px-6 py-2.5 rounded-full font-bold text-white text-sm overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-200 group-hover:scale-105" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">{audit.buttonLabel || "Get My Free AI Audit"}</span>
            </button>
          </form>
        </Reveal>
        {status === "error" && <p className="mt-3 text-xs font-semibold text-rose-500">Please enter a website URL to continue.</p>}
        {status === "submitted" && <p className="mt-3 text-xs font-semibold text-emerald-600">Connect this form to your real audit backend to show results.</p>}
        <Reveal delay={400}>
          <p className="mt-4 text-xs text-slate-500">{audit.footnote || "100% free. No credit card, no paid plan, no catch."}</p>
        </Reveal>
      </div>
    </section>
  );
}

// =========================================================
// 5/7/11. Generic "Split" section (heading + paragraph + bullets)
// used for "Get Discovered" / "Convert & Retain" / "Built to Scale"
// =========================================================
function SplitSection({ split, alt = false }) {
  return (
    <section className={`py-16 px-6 sm:px-10 ${alt ? "bg-[#0d0a15]" : "bg-[#0a0612]"}`}>
      <div className="max-w-4xl mx-auto text-center">
        <Reveal><Eyebrow>{split.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{split.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">{split.description}</p>
        </Reveal>
        {split.bullets?.length > 0 && (
          <Reveal delay={300}>
            <ul className="mt-7 flex flex-wrap justify-center gap-3">
              {split.bullets.map((b) => (
                <li
                  key={b}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-xs sm:text-[13px] font-semibold text-slate-200 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-white/[0.08] hover:text-fuchsia-300"
                >
                  <span className="text-rose-400">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// =========================================================
// 6. Process (numbered steps)
// =========================================================
function ProcessSection({ process }) {
  return (
    <section className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute top-20 right-1/4 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{process.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{process.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">{process.subtitle}</p>
        </Reveal>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 text-left">
          {process.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 100}>
                <div className="group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-500 transition-colors duration-300 group-hover:text-fuchsia-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-white/10 transition-colors duration-300 group-hover:bg-fuchsia-500/40" />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-300">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// =========================================================
// 8/10/13. Generic feature-card grid ("Why Us" / "Real Growth" / "Privacy")
// =========================================================
function FeatureGridSection({ grid, alt = false }) {
  return (
    <section className={`py-16 px-6 sm:px-10 ${alt ? "bg-[#0d0a15]" : "bg-[#0a0612]"}`}>
      <div className="max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{grid.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{grid.title}</h2>
        </Reveal>
        {grid.subtitle && (
          <Reveal delay={150}>
            <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">{grid.subtitle}</p>
          </Reveal>
        )}

        <div className={`mt-10 grid sm:grid-cols-2 ${grid.items.length >= 3 ? "lg:grid-cols-3" : ""} gap-5 sm:gap-6`}>
          {grid.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.06] hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/30">
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-rose-500/25" />
                {item.icon && (
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-600/20 to-fuchsia-600/20 border border-white/10 flex items-center justify-center text-xl transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>
                )}
                <h3 className="mt-4 text-base font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-400">{item.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// 9/18. Gradient CTA banner
// =========================================================
function CTABannerSection({ cta }) {
  return (
    <section className="relative bg-[#0a0612] py-16 px-6 sm:px-10 overflow-hidden">
      <Reveal className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-rose-600 px-8 sm:px-14 py-14 text-center">
        <div className="pointer-events-none absolute -inset-10 bg-rose-600/30 blur-3xl -z-10" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{cta.title}</h2>
        {cta.description && (
          <p className="relative mt-4 max-w-xl mx-auto text-white/90 text-sm sm:text-base leading-relaxed">{cta.description}</p>
        )}
        <div className="relative mt-8 flex justify-center">
          <a
            href={cta.buttonHref || "#contact"}
            className="group relative px-8 py-3 rounded-full font-bold text-rose-600 bg-white overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-black/20"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-rose-200/60 to-transparent" />
            <span className="relative">{cta.buttonLabel}</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// =========================================================
// 12. Innovative Tools (2-card feature grid, larger cards)
// =========================================================
function ToolsSection({ tools }) {
  return (
    <section className="bg-[#0d0a15] py-16 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal><Eyebrow>{tools.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{tools.title}</h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">{tools.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-6 text-left">
          {tools.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="group relative rounded-2xl bg-gradient-to-br from-fuchsia-950/60 to-purple-950/60 border border-white/10 p-7 h-full transition-all duration-300 ease-out hover:-translate-y-2 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/30">
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/25 to-purple-500/25" />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-600/30 to-purple-600/30 flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-400">{item.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// 14. Testimonials
// =========================================================
function TestimonialsSection({ testimonials }) {
  return (
    <section className="bg-[#0a0612] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{testimonials.eyebrow}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{testimonials.title}</h2>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.role} delay={i * 100}>
              <div className="group relative rounded-2xl bg-white/[0.04] border border-white/10 p-6 h-full text-left transition-all duration-300 ease-out hover:-translate-y-2 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/25">
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20" />
                <span className="text-2xl text-fuchsia-500/50">"</span>
                <p className="text-[13px] leading-relaxed text-slate-300 italic">{t.quote}</p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// 15. FAQ Accordion (+ JSON-LD)
// =========================================================
function FAQSection({ faq }) {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const id = `ld-json-faq-${(faq.title || "faq").replace(/\s+/g, "-").toLowerCase()}`;
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }, [faq]);

  return (
    <section className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-96 h-72 bg-fuchsia-800/10 rounded-full blur-3xl" />
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center">
          <Reveal><Eyebrow>{faq.eyebrow || "Answers"}</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{faq.title}</h2>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3">
          {faq.items.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`group rounded-xl border bg-white/[0.03] overflow-hidden transition-colors duration-200 ${isOpen ? "border-fuchsia-500/40" : "border-white/10 hover:border-white/20"}`}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    <span className={`text-sm sm:text-base font-bold transition-colors duration-200 ${isOpen ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-300"}`}>
                      {f.q}
                    </span>
                    <span className={`relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${isOpen ? "bg-fuchsia-500/20 rotate-45" : "bg-rose-500/15 group-hover:bg-rose-500/25"}`}>
                      <span className="absolute w-2.5 h-[2px] bg-rose-400 rounded-full" />
                      <span className="absolute w-[2px] h-2.5 bg-rose-400 rounded-full" />
                    </span>
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm leading-relaxed text-slate-400">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// 16. Related Services (internal links)
// =========================================================
function RelatedServicesSection({ related }) {
  return (
    <section className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-52 bg-rose-700/10 rounded-full blur-3xl" />
      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal><Eyebrow>{related.eyebrow || "Explore More"}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">{related.title}</h2>
        </Reveal>
        {related.paragraphs.map((p, i) => (
          <Reveal key={i} delay={200 + i * 100}>
            <p className="mt-6 text-slate-400 text-sm sm:text-[15px] leading-relaxed">
              {p.prefix}{" "}
              {p.links.map((l, li) => (
                <React.Fragment key={l.label}>
                  <KeyLink href={l.href}>{l.label}</KeyLink>
                  {li < p.links.length - 1 ? (li === p.links.length - 2 ? " and " : ", ") : ""}
                </React.Fragment>
              ))}
              {p.suffix}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// =========================================================
// 17. Case Studies (compact 3-card teaser + "view all")
// =========================================================
function CaseStudiesTeaserSection({ caseStudies }) {
  return (
    <section className="bg-[#0d0a15] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal><Eyebrow>{caseStudies.eyebrow || "Proven Results"}</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{caseStudies.title}</h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-3 max-w-xl mx-auto text-slate-400 text-sm leading-relaxed">{caseStudies.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {caseStudies.items.map((cs, i) => (
            <Reveal key={cs.name} delay={i * 100}>
              <a
                href={cs.href}
                className="group relative block rounded-xl bg-white/[0.03] border border-white/10 p-5 h-full transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-fuchsia-500/40 hover:shadow-xl hover:shadow-fuchsia-900/25"
              >
                <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20" />
                <span className="inline-block px-2.5 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 text-[10.5px] font-bold">{cs.tag}</span>
                <h3 className="mt-3 text-sm font-bold text-white transition-colors duration-150 group-hover:text-fuchsia-400">{cs.name}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">{cs.desc}</p>
                <span className="mt-3 inline-block text-[12px] font-semibold text-rose-400 group-hover:text-fuchsia-300 transition-colors duration-150">
                  Read case study →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {caseStudies.viewAllHref && (
          <Reveal delay={400}>
            <a href={caseStudies.viewAllHref} className="inline-block mt-9 text-sm font-semibold text-rose-400 hover:text-fuchsia-300 transition-colors duration-150">
              View all case studies →
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// =========================================================
// Master layout — orchestrates every section from `data`
// =========================================================
export default function ServicePageLayout({ data }) {
  return (
    <div className="bg-[#0a0612] text-white overflow-x-hidden">
      <HeroSection hero={data.hero} />
      <ProblemSection problem={data.problem} />
      <ServicesGridSection services={data.services} />
      {data.audit && <FreeAIAuditSection audit={data.audit} />}
      {data.discover && <SplitSection split={data.discover} />}
      {data.process && <ProcessSection process={data.process} />}
      {data.convert && <SplitSection split={data.convert} alt />}
      {data.whyUs && <FeatureGridSection grid={data.whyUs} />}
      {data.midCta && <CTABannerSection cta={data.midCta} />}
      {data.realGrowth && <FeatureGridSection grid={data.realGrowth} alt />}
      {data.scale && <SplitSection split={data.scale} />}
      {data.tools && <ToolsSection tools={data.tools} />}
      {data.privacy && <FeatureGridSection grid={data.privacy} alt />}
      {data.testimonials && <TestimonialsSection testimonials={data.testimonials} />}
      {data.faq && <FAQSection faq={data.faq} />}
      {data.related && <RelatedServicesSection related={data.related} />}
      {data.caseStudies && <CaseStudiesTeaserSection caseStudies={data.caseStudies} />}
      {data.finalCta && <CTABannerSection cta={data.finalCta} />}
    </div>
  );
}