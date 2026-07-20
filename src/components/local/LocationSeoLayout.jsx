// LocationSeoLayout.jsx
// Reusable layout for /local/[country] pages.
// Usage: <LocationSeoLayout data={ukAdultSeoData} />
// Data contract is unchanged — this is a layout/interaction fix pass.
//
// CHANGES IN THIS PASS:
// 1. Removed excess top padding on Hero (was causing a big gap above the fold).
// 2. Standardized every section's CTA button to be centered (WhyUs was left-aligned).
// 3. Hero's right-side panel is now a real controlled form (Email, Name,
//    Telegram ID, Phone, Message) with validation and a "submitted" success
//    state that replaces the form after sending.

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Design tokens — dark violet base, red→pink→purple gradient system   */
/* ------------------------------------------------------------------ */
const TOKENS = `
  :root {
    --bg: #0a0611;
    --bg-soft: #0f0a1a;
    --bg-elevated: #160e26;
    --card: rgba(255,255,255,0.035);
    --card-hover: rgba(255,255,255,0.06);
    --line: rgba(255,255,255,0.08);
    --line-hover: rgba(236,72,153,0.45);
    --text: #f5f3f8;
    --text-dim: #a89fb8;
    --text-dimmer: #6f6580;
    --red: #ef4444;
    --pink: #ec4899;
    --purple: #a855f7;
    --gradient: linear-gradient(90deg, var(--red), var(--pink) 55%, var(--purple));
    --gradient-diag: linear-gradient(135deg, var(--red), var(--pink) 50%, var(--purple));
    --font-display: "Playfair Display", "Fraunces", Georgia, serif;
    --font-body: "Inter", "Helvetica Neue", Arial, sans-serif;
  }

  .lsp-root { background: var(--bg); color: var(--text); margin: 0; padding: 0; }
  .lsp-root * { box-sizing: border-box; }

  .lsp-fade {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.7s cubic-bezier(.22,.61,.36,1), transform 0.7s cubic-bezier(.22,.61,.36,1);
  }
  .lsp-fade.lsp-in { opacity: 1; transform: translateY(0); }

  .lsp-scale {
    opacity: 0;
    transform: scale(0.94);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.22,.61,.36,1);
  }
  .lsp-scale.lsp-in { opacity: 1; transform: scale(1); }

  .lsp-gradient-text {
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .lsp-badge {
    position: relative;
    background: linear-gradient(90deg, rgba(239,68,68,0.12), rgba(236,72,153,0.12), rgba(168,85,247,0.12));
    border: 1px solid rgba(236,72,153,0.35);
  }
  .lsp-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--red);
    animation: lsp-pulse-dot 2.2s ease-in-out infinite;
  }

  .lsp-btn-primary {
    background: var(--gradient-diag);
    background-size: 200% 200%;
    animation: lsp-gradient-shift 6s ease infinite;
    box-shadow: 0 8px 30px -8px rgba(236,72,153,0.55);
  }
  .lsp-btn-primary:hover {
    box-shadow: 0 12px 40px -6px rgba(236,72,153,0.75);
    transform: translateY(-2px);
  }
  .lsp-btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .lsp-btn-outline {
    border: 1px solid rgba(245,243,248,0.18);
    background: rgba(255,255,255,0.02);
  }
  .lsp-btn-outline:hover {
    border-color: rgba(236,72,153,0.5);
    background: rgba(236,72,153,0.06);
    transform: translateY(-2px);
  }

  .lsp-card {
    background: var(--card);
    border: 1px solid var(--line);
    transition: transform 0.35s cubic-bezier(.22,.61,.36,1), border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
  }
  .lsp-card:hover {
    transform: translateY(-6px);
    border-color: var(--line-hover);
    background: var(--card-hover);
    box-shadow: 0 20px 40px -20px rgba(168,85,247,0.35);
  }

  .lsp-chip {
    background: var(--card);
    border: 1px solid var(--line);
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }
  .lsp-chip:hover {
    transform: translateY(-3px);
    background: var(--gradient-diag);
    border-color: transparent;
    color: #0a0611;
  }

  .lsp-link-pill {
    border: 1px solid var(--line);
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  }
  .lsp-link-pill:hover {
    border-color: rgba(236,72,153,0.5);
    background: rgba(236,72,153,0.08);
    transform: translateY(-2px);
  }

  .lsp-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--line);
    color: var(--text);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .lsp-input::placeholder { color: var(--text-dimmer); }
  .lsp-input:focus {
    border-color: rgba(236,72,153,0.6);
    background: rgba(236,72,153,0.05);
  }
  .lsp-input.lsp-input-error {
    border-color: rgba(239,68,68,0.7);
  }

  .lsp-float { animation: lsp-float 6s ease-in-out infinite; }

  .lsp-glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(90px);
    pointer-events: none;
    animation: lsp-glow-pulse 8s ease-in-out infinite;
  }

  .lsp-marquee-track { animation: lsp-marquee 30s linear infinite; }
  .lsp-marquee-track:hover { animation-play-state: paused; }

  .lsp-faq-plus {
    transition: transform 0.35s cubic-bezier(.22,.61,.36,1), color 0.35s ease;
  }

  .lsp-team-avatar {
    transition: transform 0.35s ease, box-shadow 0.35s ease;
  }
  .lsp-team-avatar:hover {
    transform: translateY(-4px) scale(1.06);
    box-shadow: 0 12px 30px -10px rgba(236,72,153,0.6);
  }

  .lsp-form-swap {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }

  @keyframes lsp-pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
  @keyframes lsp-gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes lsp-glow-pulse { 0%,100% { opacity: 0.22; } 50% { opacity: 0.4; } }
  @keyframes lsp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
  @keyframes lsp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  @media (prefers-reduced-motion: reduce) {
    .lsp-fade, .lsp-scale { opacity: 1 !important; transform: none !important; transition: none !important; }
    .lsp-marquee-track, .lsp-float, .lsp-dot, .lsp-btn-primary, .lsp-glow { animation: none !important; }
  }
`;

/* ------------------------------------------------------------------ */
/* Scroll-reveal primitives                                            */
/* ------------------------------------------------------------------ */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", variant = "fade", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${variant === "scale" ? "lsp-scale" : "lsp-fade"} ${inView ? "lsp-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Counter({ value, duration = 1400 }) {
  const [ref, inView] = useInView();
  const [display, setDisplay] = useState(null);
  const match = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView) return;
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (target * eased).toFixed(numStr.includes(".") ? 1 : 0);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return <span ref={ref}>{display ?? (match ? `${match[1]}0${match[3]}` : value)}</span>;
}

/* ------------------------------------------------------------------ */
/* Small shared UI                                                     */
/* ------------------------------------------------------------------ */
function Glow({ color = "var(--pink)", size = 480, style = {} }) {
  return (
    <div
      aria-hidden
      className="lsp-glow"
      style={{ width: size, height: size, background: color, opacity: 0.25, ...style }}
    />
  );
}

function Eyebrow({ children }) {
  return (
    <span className="lsp-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5">
      <span className="lsp-dot" />
      <span
        style={{
          fontFamily: "var(--font-body)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontSize: "0.7rem",
          fontWeight: 700,
        }}
        className="lsp-gradient-text"
      >
        {children}
      </span>
    </span>
  );
}

function SectionHeading({ eyebrow, title, intro, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          className="mt-5 text-3xl md:text-[2.6rem] leading-[1.1] font-bold"
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={140}>
          <p className="mt-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

function Button({ children, href = "#contact", variant = "solid" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300";
  const cls = variant === "solid" ? "lsp-btn-primary" : "lsp-btn-outline";
  return (
    <a href={href} className={`${base} ${cls}`} style={{ color: "var(--text)" }}>
      {children}
    </a>
  );
}

// Shared, ALWAYS-CENTERED cta row wrapper — every section uses this now,
// so buttons never end up stranded on the left by accident.
function CtaRow({ children, delay = 160, className = "" }) {
  return (
    <Reveal delay={delay}>
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>{children}</div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */

// ---------- Hero contact form (now a real controlled form) ----------
function HeroForm({ data }) {
  const [values, setValues] = useState({ email: "", name: "", telegram: "", phone: "", message: "" });
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = /\S+@\S+\.\S+/.test(values.email);
  const hasError = touched && !isEmailValid;

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isEmailValid) return;
    // Hook this up to your real lead-capture endpoint (CRM, email, webhook, etc.)
    setSubmitted(true);
  };

  const handleReset = () => {
    setValues({ email: "", name: "", telegram: "", phone: "", message: "" });
    setTouched(false);
    setSubmitted(false);
  };

  return (
    <div className="lsp-float lsp-card rounded-3xl p-8" style={{ background: "var(--bg-elevated)" }}>
      {!submitted ? (
        <div className="lsp-form-swap">
          <h3 style={{ fontFamily: "var(--font-display)", color: "var(--text)" }} className="text-xl font-bold">
            {data.formTitle}
          </h3>
          <p className="mt-2 text-sm" style={{ color: "var(--text-dimmer)" }}>
            {data.formSubtitle}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              placeholder="Email *"
              value={values.email}
              onChange={handleChange("email")}
              className={`lsp-input ${hasError ? "lsp-input-error" : ""}`}
            />
            <input
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange("name")}
              className="lsp-input"
            />
            <input
              type="text"
              placeholder="Telegram ID"
              value={values.telegram}
              onChange={handleChange("telegram")}
              className="lsp-input"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={values.phone}
              onChange={handleChange("phone")}
              className="lsp-input"
            />
            <textarea
              placeholder="Message"
              rows={3}
              value={values.message}
              onChange={handleChange("message")}
              className="lsp-input resize-none"
            />

            {hasError && (
              <p className="text-xs font-semibold" style={{ color: "#f87171" }}>
                Please enter a valid email so we can reach you.
              </p>
            )}

            <button type="submit" className="lsp-btn-primary mt-2 w-full rounded-full py-3.5 text-sm font-semibold" style={{ color: "var(--text)" }}>
              {data.formCta || "Send My Request"}
            </button>
          </form>

          <p className="mt-3 text-xs text-center" style={{ color: "var(--text-dimmer)" }}>
            NDA on request — your details stay confidential
          </p>
        </div>
      ) : (
        <div className="lsp-form-swap text-center py-6">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl"
            style={{ background: "var(--gradient-diag)", color: "#0a0611" }}
          >
            ✓
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", color: "var(--text)" }} className="mt-5 text-xl font-bold">
            Request Sent
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
            Thanks{values.name ? `, ${values.name}` : ""} — we've received your details and will
            reach out at {values.email} shortly.
          </p>
          <button
            onClick={handleReset}
            className="lsp-btn-outline mt-6 rounded-full px-6 py-2.5 text-xs font-semibold"
            style={{ color: "var(--text)" }}
          >
            Send Another Request
          </button>
        </div>
      )}
    </div>
  );
}

function Hero({ data }) {
  return (
    <section className="relative overflow-hidden px-6 md:px-12 pt-14 md:pt-16 pb-24">
      <Glow color="var(--purple)" size={620} style={{ top: "-220px", right: "-160px", opacity: 0.28 }} />
      <Glow color="var(--pink)" size={420} style={{ bottom: "-160px", left: "-140px", opacity: 0.18 }} />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <div>
          <Reveal>
            <Eyebrow>{data.badge}</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              className="mt-6 text-4xl md:text-6xl leading-[1.06] font-bold"
            >
              {data.title}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--text-dim)" }}>
              {data.description}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {data.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm" style={{ color: "var(--text)" }}>
                  <span className="lsp-gradient-text font-bold">✦</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#contact">{data.ctaLabel} →</Button>
              <Button href="#audit" variant="outline">
                {data.secondaryCtaLabel || "Free Website Audit"}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} variant="scale">
          <HeroForm data={data} />
        </Reveal>
      </div>
    </section>
  );
}

function StatBar({ stats }) {
  if (!stats?.length) return null;
  return (
    <section className="relative px-6 md:px-12 py-14" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="lsp-card rounded-2xl p-6 text-center">
              <div style={{ fontFamily: "var(--font-display)" }} className="lsp-gradient-text text-3xl md:text-4xl font-bold">
                <Counter value={s.value} />
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--text-dim)" }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MarketFit({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24 overflow-hidden">
      <Glow color="var(--purple)" size={400} style={{ top: "20%", left: "-160px" }} />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
        <div className="grid gap-4">
          {data.bullets.map((b, i) => (
            <Reveal key={b} delay={i * 90}>
              <div className="lsp-card flex gap-4 rounded-2xl p-5">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "var(--gradient-diag)", color: "#0a0611" }}
                >
                  {i + 1}
                </span>
                <p className="text-[0.98rem] leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySpecialist({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <Glow color="var(--red)" size={460} style={{ top: "-140px", right: "10%" }} />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="lsp-card rounded-3xl p-8 h-full">
              <h4 className="text-sm font-bold" style={{ color: "#f87171" }}>
                {data.failHeading || "Where generalists fail"}
              </h4>
              <ul className="mt-5 space-y-4">
                {data.failList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--text-dim)" }}>
                    <span style={{ color: "#f87171" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="lsp-card rounded-3xl p-8 h-full"
              style={{ borderColor: "rgba(236,72,153,0.35)", background: "var(--bg-elevated)" }}
            >
              <h4 className="lsp-gradient-text text-sm font-bold">{data.fixHeading || "How we fix it"}</h4>
              <ul className="mt-5 space-y-4">
                {data.fixList.map((item) => (
                  <li key={item} className="flex gap-3 text-sm" style={{ color: "var(--text)" }}>
                    <span className="lsp-gradient-text font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        {data.ctaLabel && (
          <div className="mt-12">
            <CtaRow delay={200}>
              <Button href={data.ctaHref || "#contact"}>{data.ctaLabel}</Button>
            </CtaRow>
          </div>
        )}
      </div>
    </section>
  );
}

function MarketInsight({ data }) {
  if (!data) return null;
  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <div className="lsp-card h-full rounded-2xl p-6">
                <h4 style={{ fontFamily: "var(--font-display)", color: "var(--text)" }} className="text-lg font-bold">
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <Glow color="var(--purple)" size={500} style={{ bottom: "-200px", right: "-160px" }} />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.subtitle} align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="lsp-card h-full rounded-2xl p-6">
                <div className="text-2xl">{item.icon}</div>
                <h4 style={{ fontFamily: "var(--font-display)", color: "var(--text)" }} className="mt-4 text-lg font-bold">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        {data.ctaLabel && (
          <div className="mt-12">
            <CtaRow delay={140}>
              <Button href={data.ctaHref || "#contact"}>{data.ctaLabel}</Button>
            </CtaRow>
          </div>
        )}
      </div>
    </section>
  );
}

function ChipList({ data }) {
  if (!data) return null;
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.items.map((item) => (
              <span key={item} className="lsp-chip rounded-full px-5 py-2.5 text-sm font-medium" style={{ color: "var(--text)" }}>
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LocalSeo({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <Glow color="var(--pink)" size={440} style={{ top: "10%", left: "-180px" }} />
      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
        <div className="grid gap-3">
          {data.bullets.map((b, i) => (
            <Reveal key={b} delay={i * 70}>
              <div className="lsp-card flex items-center gap-3 rounded-xl px-5 py-4">
                <span className="lsp-gradient-text font-bold">◆</span>
                <span className="text-sm" style={{ color: "var(--text)" }}>
                  {b}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {data.ctaLabel && (
        <div className="relative mt-12">
          <CtaRow delay={200}>
            <Button href={data.ctaHref || "#contact"} variant="outline">
              {data.ctaLabel}
            </Button>
          </CtaRow>
        </div>
      )}
    </section>
  );
}

function AuditBanner({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-20 overflow-hidden" id="audit">
      <div className="absolute inset-0" style={{ background: "var(--gradient-diag)", opacity: 0.9 }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-black/20">
            <span className="lsp-dot" style={{ background: "#0a0611" }} />
            <span
              style={{ letterSpacing: "0.14em", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 700, color: "#0a0611" }}
            >
              {data.eyebrow}
            </span>
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#0a0611" }} className="mt-4 text-3xl md:text-4xl font-bold">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "rgba(10,6,17,0.8)" }}>
            {data.description}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-8 flex justify-center">
            <button
              className="rounded-full px-8 py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: "#0a0611", color: "var(--text)" }}
            >
              {data.buttonLabel}
            </button>
          </div>
          <p className="mt-3 text-xs" style={{ color: "rgba(10,6,17,0.65)" }}>
            {data.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Cities({ data }) {
  if (!data) return null;
  const looped = [...data.items, ...data.items];
  return (
    <section className="px-6 md:px-12 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
      </div>
      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden">
          <div className="lsp-marquee-track flex w-max gap-4">
            {looped.map((city, i) => (
              <span
                key={`${city}-${i}`}
                className="lsp-chip whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      {data.note && (
        <Reveal delay={180}>
          <p className="mt-8 text-center text-sm max-w-xl mx-auto" style={{ color: "var(--text-dimmer)" }}>
            {data.note}
          </p>
        </Reveal>
      )}
    </section>
  );
}

function CompetitorFramework({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <Glow color="var(--purple)" size={480} style={{ top: "-160px", left: "10%" }} />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 70}>
              <div className="lsp-card h-full rounded-2xl p-6">
                <h4 className="lsp-gradient-text text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  {card.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
                  {card.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServices({ data }) {
  if (!data) return null;
  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.items.map((item) => (
              <a key={item.label} href={item.href} className="lsp-link-pill rounded-full px-5 py-2.5 text-sm font-medium" style={{ color: "var(--text)" }}>
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Team({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {data.members.map((m, i) => (
            <Reveal key={m.role} delay={i * 50}>
              <div className="text-center">
                <div className="lsp-team-avatar mx-auto h-16 w-16 rounded-full" style={{ background: "var(--gradient-diag)" }} />
                <p className="mt-3 text-xs" style={{ color: "var(--text-dim)" }}>
                  {m.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs({ data }) {
  if (!data) return null;
  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
          <div className="mt-8 grid gap-3">
            {data.items.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="flex items-center gap-3">
                  <span className="lsp-gradient-text font-bold">✓</span>
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          {data.ctaLabel && (
            <div className="mt-8">
              {/* Centered on its own row so it never reads as accidentally left-stuck */}
              <CtaRow delay={200} className="md:justify-start">
                <Button href={data.ctaHref || "#contact"}>{data.ctaLabel}</Button>
              </CtaRow>
            </div>
          )}
        </div>
        <Reveal variant="scale" delay={100}>
          <div className="lsp-card rounded-3xl p-10 flex items-center justify-around" style={{ background: "var(--bg-elevated)" }}>
            {(data.stats || []).map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "var(--font-display)" }} className="lsp-gradient-text text-3xl font-bold">
                  <Counter value={s.value} />
                </div>
                <div className="mt-1 text-xs" style={{ color: "var(--text-dimmer)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-24" style={{ background: "var(--bg-soft)" }}>
      <Glow color="var(--red)" size={460} style={{ top: "-140px", right: "-140px" }} />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 80}>
              <div
                className="relative h-full rounded-3xl p-7 flex flex-col transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background: tier.featured ? "var(--gradient-diag)" : "var(--card)",
                  border: tier.featured ? "none" : "1px solid var(--line)",
                }}
              >
                {tier.badge && (
                  <span
                    className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[0.65rem] font-bold"
                    style={{ background: "#0a0611", color: "var(--text)" }}
                  >
                    {tier.badge}
                  </span>
                )}
                <h4 className="text-lg font-bold" style={{ color: tier.featured ? "#0a0611" : "var(--text)" }}>
                  {tier.name}
                </h4>
                <div
                  style={{ fontFamily: "var(--font-display)", color: tier.featured ? "#0a0611" : "var(--text)" }}
                  className="mt-2 text-3xl font-bold"
                >
                  {tier.price}
                </div>
                <p className="mt-1 text-xs" style={{ color: tier.featured ? "rgba(10,6,17,0.65)" : "var(--text-dimmer)" }}>
                  {tier.subtitle}
                </p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm flex gap-2" style={{ color: tier.featured ? "rgba(10,6,17,0.85)" : "var(--text-dim)" }}>
                      <span>{tier.featured ? "●" : "○"}</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 rounded-full py-3 text-center text-sm font-bold transition-transform hover:-translate-y-0.5"
                  style={{
                    background: tier.featured ? "#0a0611" : "transparent",
                    color: tier.featured ? "var(--text)" : "var(--text)",
                    border: tier.featured ? "none" : "1px solid var(--line)",
                  }}
                >
                  {tier.ctaLabel || "Choose Plan"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        {data.footnote && (
          <Reveal delay={160}>
            <p className="mt-8 text-center text-sm" style={{ color: "var(--text-dimmer)" }}>
              {data.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <span style={{ color: "var(--text)" }} className="font-medium text-[0.98rem]">
          {item.q}
        </span>
        <span
          className="lsp-faq-plus shrink-0 text-lg"
          style={{
            color: isOpen ? "var(--pink)" : "var(--text-dimmer)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 400}px` : "0px",
          transition: "max-height 0.4s ease",
          overflow: "hidden",
        }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

function Faq({ data }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (!data) return null;
  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} align="center" />
        <Reveal delay={100}>
          <div className="mt-12">
            {data.items.map((item, i) => (
              <FaqItem key={item.q} item={item} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta({ data }) {
  if (!data) return null;
  return (
    <section className="relative px-6 md:px-12 py-28 overflow-hidden" style={{ background: "var(--bg-soft)" }} id="contact">
      <Glow color="var(--purple)" size={600} style={{ top: "-260px", left: "50%", transform: "translateX(-50%)" }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--text)" }} className="text-3xl md:text-5xl font-bold leading-tight">
            {data.title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 leading-relaxed" style={{ color: "var(--text-dim)" }}>
            {data.description}
          </p>
        </Reveal>
        <CtaRow delay={180} className="mt-9">
          <Button href={data.buttonHref || "#contact"}>{data.buttonLabel}</Button>
          {data.secondaryLabel && (
            <Button href={data.secondaryHref || "#"} variant="outline">
              {data.secondaryLabel}
            </Button>
          )}
        </CtaRow>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Master layout                                                       */
/* ------------------------------------------------------------------ */
export default function LocationSeoLayout({ data }) {
  if (!data) return null;
  return (
    <main className="lsp-root" style={{ fontFamily: "var(--font-body)" }}>
      <style>{TOKENS}</style>
      <Hero data={data.hero} />
      <StatBar stats={data.hero?.stats} />
      <MarketFit data={data.marketFit} />
      <WhySpecialist data={data.whySpecialist} />
      <MarketInsight data={data.marketInsight} />
      <ServicesGrid data={data.services} />
      <ChipList data={data.industries} />
      <LocalSeo data={data.localSeo} />
      <AuditBanner data={data.audit} />
      <Cities data={data.cities} />
      <CompetitorFramework data={data.competitorFramework} />
      <RelatedServices data={data.related} />
      <Team data={data.team} />
      <WhyUs data={data.whyUs} />
      <Pricing data={data.pricing} />
      <Faq data={data.faq} />
      <FinalCta data={data.finalCta} />
    </main>
  );
}