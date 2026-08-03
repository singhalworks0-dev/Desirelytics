import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import adultWebDevData from "../adultWebDevData";

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const colors = {
  bg: "#0A0A0F",
  bgAlt: "#0E0E14",
  card: "#131318",
  cardBorder: "#232329",
  text: "#F5F5F7",
  textMuted: "#8E8E99",
  gradientFrom: "#FF2E93",
  gradientTo: "#B026FF",
};

// Rotating accent palette — every section gets its own opening-animation color
const ACCENTS = ["#FF2E93", "#B026FF", "#FF6B4A", "#6C5CE7", "#00D4FF", "#FFB86B"];
const accentAt = (i) => ACCENTS[i % ACCENTS.length];

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const gradientText = {
  backgroundImage: `linear-gradient(90deg, ${colors.gradientFrom}, ${colors.gradientTo})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const styles = {
  page: {
    background: colors.bg,
    color: colors.text,
    fontFamily: "'Inter', system-ui, sans-serif",
    lineHeight: 1.55,
    overflowX: "hidden",
  },
  display: {
    fontFamily: "'Playfair Display', 'Space Grotesk', serif",
  },
  section: {
    position: "relative",
    padding: "112px 24px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  eyebrow: {
    ...gradientText,
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  h2: {
    fontFamily: "'Playfair Display', 'Space Grotesk', serif",
    fontSize: "clamp(30px, 4vw, 44px)",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    marginBottom: 18,
    maxWidth: 780,
  },
  intro: {
    color: colors.textMuted,
    fontSize: 17.5,
    maxWidth: 720,
    marginBottom: 56,
  },
  card: {
    background: colors.card,
    border: `1px solid ${colors.cardBorder}`,
    borderRadius: 20,
    padding: 32,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: `linear-gradient(90deg, ${colors.gradientFrom}, ${colors.gradientTo})`,
    backgroundSize: "200% 200%",
    color: "#0A0A0F",
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    padding: "15px 30px",
    borderRadius: 999,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
  },
  buttonOutline: {
    display: "inline-block",
    background: "transparent",
    color: colors.text,
    fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    padding: "14px 29px",
    borderRadius: 999,
    border: `1px solid ${colors.cardBorder}`,
    textDecoration: "none",
    cursor: "pointer",
    fontSize: 15,
  },
};

/* ------------------------------------------------------------------ */
/* Global animation / hover CSS                                        */
/* ------------------------------------------------------------------ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

  .wd-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity .7s cubic-bezier(.22,.61,.36,1), transform .7s cubic-bezier(.22,.61,.36,1);
  }
  .wd-reveal.wd-in { opacity: 1; transform: translateY(0); }

  .wd-reveal-scale {
    opacity: 0;
    transform: scale(.9);
    transition: opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1);
  }
  .wd-reveal-scale.wd-in { opacity: 1; transform: scale(1); }

  .wd-card {
    transition: transform .35s cubic-bezier(.22,.61,.36,1), border-color .35s ease, box-shadow .35s ease, background .35s ease;
  }
  .wd-card:hover {
    transform: translateY(-8px);
    border-color: var(--wd-accent, #FF2E93);
    box-shadow: 0 26px 50px -22px var(--wd-glow, rgba(255,46,147,.4));
    background: #17171d;
  }

  .wd-btn-primary { animation: wd-gradient-shift 6s ease infinite; transition: transform .3s ease, box-shadow .3s ease; }
  .wd-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 42px -12px var(--wd-glow, rgba(255,46,147,.55)); }

  .wd-btn-outline { transition: all .3s ease; }
  .wd-btn-outline:hover {
    border-color: var(--wd-accent, #FF2E93);
    background: var(--wd-glow-soft, rgba(255,46,147,.08));
    transform: translateY(-3px);
  }

  .wd-chip { transition: all .3s ease; cursor: default; }
  .wd-chip:hover {
    transform: translateY(-3px);
    background: var(--wd-accent, #FF2E93);
    border-color: transparent;
    color: #0A0A0F;
  }

  .wd-dot { animation: wd-pulse 2.2s ease-in-out infinite; }

  .wd-glow-blob {
    position: absolute;
    border-radius: 9999px;
    filter: blur(100px);
    pointer-events: none;
    animation: wd-float 9s ease-in-out infinite;
    z-index: 0;
  }

  .wd-faq { transition: border-color .3s ease; cursor: pointer; }
  .wd-faq:hover { border-color: var(--wd-accent, #FF2E93); }
  .wd-faq summary { list-style: none; }
  .wd-faq summary::-webkit-details-marker { display: none; }
  .wd-faq-icon { transition: transform .35s cubic-bezier(.22,.61,.36,1), color .35s ease; display: inline-block; }
  .wd-faq[open] .wd-faq-icon { transform: rotate(45deg); color: var(--wd-accent, #FF2E93); }

  .wd-stat-num { transition: transform .3s ease; }
  .wd-card:hover .wd-stat-num { transform: scale(1.06); }

  @keyframes wd-gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes wd-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
  @keyframes wd-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }

  @media (prefers-reduced-motion: reduce) {
    .wd-reveal, .wd-reveal-scale { opacity: 1 !important; transform: none !important; transition: none !important; }
    .wd-btn-primary, .wd-glow-blob, .wd-dot { animation: none !important; }
  }
`;

function GlobalStyles() {
  return <style>{GLOBAL_CSS}</style>;
}

/* ------------------------------------------------------------------ */
/* Scroll-reveal primitives                                            */
/* ------------------------------------------------------------------ */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useReactState(false);

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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// tiny local alias so this file has zero extra imports beyond React hooks used above
import { useState as useReactState } from "react";

function Reveal({ as: Tag = "div", delay = 0, variant = "fade", style = {}, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${variant === "scale" ? "wd-reveal-scale" : "wd-reveal"} ${inView ? "wd-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Glow({ color, size = 460, style = {} }) {
  return (
    <div
      aria-hidden
      className="wd-glow-blob"
      style={{ width: size, height: size, background: color, opacity: 0.22, ...style }}
    />
  );
}

function accentVars(accent) {
  return {
    "--wd-accent": accent,
    "--wd-glow": hexToRgba(accent, 0.4),
    "--wd-glow-soft": hexToRgba(accent, 0.1),
  };
}

/* ------------------------------------------------------------------ */
/* Sections                                                             */
/* ------------------------------------------------------------------ */
function Hero({ data }) {
  // Small floating highlight cards for the right panel.
  // Pulls from data if you want to drive it dynamically, otherwise these are safe defaults.
  const floatCards = data.floatCards || [
    { label: "Secure Payments", value: "PCI-DSS", accent: colors.gradientFrom },
    { label: "Age-Gate & 2257", value: "Compliant", accent: colors.gradientTo },
    { label: "Avg. Build Time", value: "6–10 wks", accent: "#FF6B4A" },
    { label: "Uptime SLA", value: "99.9%", accent: "#00D4FF" },
  ];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        padding: "50px 24px 50px",
        borderBottom: `1px solid ${colors.cardBorder}`,
        boxSizing: "border-box",
      }}
    >
      {/* blueprint grid backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${colors.cardBorder} 1px, transparent 1px), linear-gradient(90deg, ${colors.cardBorder} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 70% at 30% 20%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 30% 20%, black 0%, transparent 75%)",
          opacity: 0.6,
        }}
      />
      <Glow color={colors.gradientFrom} size={560} style={{ top: -180, left: -120, opacity: 0.26 }} />
      <Glow color={colors.gradientTo} size={520} style={{ bottom: -220, right: -140, opacity: 0.22 }} />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 64,
          alignItems: "center",
        }}
        className="wd-hero-grid"
      >
        {/* LEFT — copy */}
        <div>
          <Reveal>
            <div style={{ ...styles.eyebrow, marginBottom: 20 }}>
              <span
                className="wd-dot"
                style={{ width: 6, height: 6, borderRadius: "50%", background: colors.gradientFrom, display: "inline-block" }}
              />
              {data.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1
              style={{
                ...styles.display,
                fontSize: "clamp(34px, 4.6vw, 54px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                marginBottom: 22,
                lineHeight: 1.08,
              }}
            >
              {data.title}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ color: colors.textMuted, fontSize: 18, maxWidth: 560, marginBottom: 32 }}>
              {data.description}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 40px",
                maxWidth: 520,
                display: "grid",
                gap: 12,
              }}
            >
              {data.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: colors.text, fontSize: 15.5 }}>
                  <span style={{ ...gradientText, fontWeight: 700 }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link to="/contact" className="wd-btn-primary" style={{ ...styles.button, ...accentVars(colors.gradientFrom) }}>
                {data.primaryCta} →
              </Link>
              <Link to="/case-studies" className="wd-btn-outline" style={{ ...styles.buttonOutline, ...accentVars(colors.gradientFrom) }}>
                {data.secondaryCta}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — floating gradient stat cards */}
        <div style={{ position: "relative", minHeight: 420 }} className="wd-hero-float-wrap">
          {floatCards.map((c, i) => {
            const positions = [
              { top: "2%", left: "8%" },
              { top: "24%", left: "42%" },
              { top: "52%", left: "0%" },
              { top: "70%", left: "46%" },
            ];
            const pos = positions[i % positions.length];
            return (
              <Reveal key={i} delay={200 + i * 130} variant="scale" style={{ position: "absolute", ...pos }}>
                <div
                  className="wd-float-card"
                  style={{
                    ...accentVars(c.accent),
                    animationDelay: `${i * 0.6}s`,
                    background: `linear-gradient(160deg, ${hexToRgba(c.accent, 0.16)}, rgba(19,19,24,0.9))`,
                    border: `1px solid ${hexToRgba(c.accent, 0.35)}`,
                    borderRadius: 18,
                    padding: "18px 22px",
                    minWidth: 190,
                    backdropFilter: "blur(6px)",
                    boxShadow: `0 20px 50px -20px ${hexToRgba(c.accent, 0.45)}`,
                  }}
                >
                  <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {c.label}
                  </div>
                  <div style={{ ...styles.display, fontSize: 22, fontWeight: 700, marginTop: 6, color: c.accent }}>
                    {c.value}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* soft glow anchor behind the floating cards */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${hexToRgba(colors.gradientTo, 0.14)}, transparent 65%)`,
              filter: "blur(20px)",
              zIndex: -1,
            }}
          />
        </div>
      </div>

      <style>{`
        .wd-float-card {
          animation: wd-card-float 6s ease-in-out infinite;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .wd-float-card:hover {
          transform: translateY(-8px) scale(1.03);
          border-color: var(--wd-accent) !important;
          box-shadow: 0 26px 60px -18px var(--wd-glow) !important;
        }
        @keyframes wd-card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @media (max-width: 900px) {
          .wd-hero-grid { grid-template-columns: 1fr !important; }
          .wd-hero-float-wrap { min-height: 340px !important; margin-top: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wd-float-card { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function Stats({ stats, accent }) {
  return (
    <section style={{ ...styles.section, paddingTop: 64, paddingBottom: 64 }}>
      <div style={styles.grid3}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 80} variant="scale">
            <div className="wd-card" style={{ ...styles.card, ...accentVars(accent), textAlign: "center" }}>
              <div className="wd-stat-num" style={{ ...styles.display, ...gradientText, fontSize: 36, fontWeight: 700, marginBottom: 8 }}>
                {s.value}
              </div>
              <div style={{ color: colors.textMuted, fontSize: 14 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TwoColList({ eyebrow, title, intro, failHeading, failList, fixHeading, fixList, accent }) {
  return (
    <section style={styles.section}>
      <Glow color={accent} size={420} style={{ top: 40, right: -160, opacity: 0.15 }} />
      <div style={{ position: "relative" }}>
        <Reveal><div style={styles.eyebrow}>{eyebrow}</div></Reveal>
        <Reveal delay={80}><h2 style={styles.h2}>{title}</h2></Reveal>
        <Reveal delay={140}><p style={styles.intro}>{intro}</p></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          <Reveal delay={100}>
            <div className="wd-card" style={{ ...styles.card, borderColor: "#3a1f2b", height: "100%" }}>
              <h3 style={{ ...styles.display, fontSize: 19, marginBottom: 18, color: "#FF6BAF" }}>{failHeading}</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
                {failList.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, color: colors.textMuted, fontSize: 14.5 }}>
                    <span style={{ color: "#FF6BAF" }}>✕</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div
              className="wd-card"
              style={{ ...styles.card, ...accentVars(accent), borderColor: "#2a1f3a", height: "100%", background: "#15121e" }}
            >
              <h3 style={{ ...styles.display, ...gradientText, fontSize: 19, marginBottom: 18 }}>{fixHeading}</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
                {fixList.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, color: colors.text, fontSize: 14.5 }}>
                    <span style={gradientText}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardGrid({ eyebrow, title, subtitle, items, ctaLabel, id, accent }) {
  return (
    <section id={id} style={styles.section}>
      <Glow color={accent} size={460} style={{ bottom: -180, left: -160, opacity: 0.14 }} />
      <div style={{ position: "relative" }}>
        <Reveal><div style={styles.eyebrow}>{eyebrow}</div></Reveal>
        <Reveal delay={80}><h2 style={styles.h2}>{title}</h2></Reveal>
        {subtitle && <Reveal delay={140}><p style={styles.intro}>{subtitle}</p></Reveal>}

        <div style={styles.grid3}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="wd-card" style={{ ...styles.card, ...accentVars(accent), height: "100%" }}>
                <h3 style={{ ...styles.display, fontSize: 18, marginBottom: 12 }}>{it.title}</h3>
                <p style={{ color: colors.textMuted, fontSize: 14.5, margin: 0 }}>{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {ctaLabel && (
          <Reveal delay={160}>
            <div style={{ marginTop: 48, textAlign: "center" }}>
              <Link to="/contact" className="wd-btn-primary" style={{ ...styles.button, ...accentVars(accent) }}>
                {ctaLabel}
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function TagList({ eyebrow, title, intro, items, accent }) {
  return (
    <section style={styles.section}>
      <Reveal><div style={styles.eyebrow}>{eyebrow}</div></Reveal>
      <Reveal delay={80}><h2 style={styles.h2}>{title}</h2></Reveal>
      {intro && <Reveal delay={140}><p style={styles.intro}>{intro}</p></Reveal>}
      <Reveal delay={180}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {items.map((tag, i) => (
            <span
              key={i}
              className="wd-chip"
              style={{
                ...styles.card,
                ...accentVars(accent),
                padding: "11px 20px",
                borderRadius: 999,
                fontSize: 14,
                color: colors.text,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Process({ data, accent }) {
  return (
    <section style={styles.section}>
      <Reveal><div style={styles.eyebrow}>{data.eyebrow}</div></Reveal>
      <Reveal delay={80}><h2 style={styles.h2}>{data.title}</h2></Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 40 }}>
        {data.steps.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="wd-card" style={{ ...styles.card, ...accentVars(accent), height: "100%" }}>
              <div style={{ ...styles.display, ...gradientText, fontSize: 30, fontWeight: 700, marginBottom: 16 }}>
                {s.num}
              </div>
              <h3 style={{ ...styles.display, fontSize: 18, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ color: colors.textMuted, fontSize: 14.5, margin: 0 }}>{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Pricing({ data, accent }) {
  return (
    <section style={styles.section}>
      <Glow color={accent} size={520} style={{ top: -180, right: -180, opacity: 0.14 }} />
      <div style={{ position: "relative" }}>
        <Reveal><div style={styles.eyebrow}>{data.eyebrow}</div></Reveal>
        <Reveal delay={80}><h2 style={styles.h2}>{data.title}</h2></Reveal>
        <Reveal delay={140}><p style={styles.intro}>{data.intro}</p></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {data.tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 90} variant="scale">
              <div
                className="wd-card"
                style={{
                  ...styles.card,
                  ...accentVars(accent),
                  border: tier.featured ? `1px solid ${colors.gradientFrom}` : `1px solid ${colors.cardBorder}`,
                  boxShadow: tier.featured ? `0 0 44px ${colors.gradientFrom}22` : "none",
                  position: "relative",
                  height: "100%",
                }}
              >
                {tier.badge && (
                  <div style={{ ...gradientText, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                    {tier.badge}
                  </div>
                )}
                <h3 style={{ ...styles.display, fontSize: 21, marginBottom: 6 }}>{tier.name}</h3>
                <div style={{ ...styles.display, fontSize: 32, fontWeight: 700, marginBottom: 22 }}>
                  {tier.price}
                  {tier.unit && <span style={{ fontSize: 14, color: colors.textMuted, fontWeight: 400 }}> / {tier.unit}</span>}
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12, marginBottom: 26 }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, color: colors.textMuted, fontSize: 14 }}>
                      <span style={gradientText}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={tier.featured ? "wd-btn-primary" : "wd-btn-outline"}
                  style={tier.featured ? { ...styles.button, width: "100%", justifyContent: "center" } : { ...styles.buttonOutline, display: "block", textAlign: "center" }}
                >
                  {tier.ctaLabel}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ data, accent }) {
  return (
    <section style={styles.section}>
      <Reveal><div style={styles.eyebrow}>{data.eyebrow}</div></Reveal>
      <Reveal delay={80}><h2 style={styles.h2}>{data.title}</h2></Reveal>
      <div style={styles.grid3}>
        {data.items.map((t, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="wd-card wd-testimonial" style={{ ...styles.card, ...accentVars(accent), height: "100%" }}>
              <p style={{ fontSize: 15.5, color: colors.text, marginBottom: 22, lineHeight: 1.6 }}>“{t.quote}”</p>
              <div style={{ fontSize: 13, color: colors.textMuted }}>
                <strong style={{ color: colors.text }}>{t.role}</strong> — {t.company}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ({ data, accent }) {
  return (
    <section style={styles.section}>
      <Reveal><div style={styles.eyebrow}>{data.eyebrow}</div></Reveal>
      <Reveal delay={80}><h2 style={styles.h2}>{data.title}</h2></Reveal>
      <div style={{ display: "grid", gap: 16 }}>
        {data.items.map((item, i) => (
          <Reveal key={i} delay={i * 60}>
            <details className="wd-faq" style={{ ...styles.card, ...accentVars(accent) }}>
              <summary style={{ ...styles.display, fontSize: 16, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                {item.q}
                <span className="wd-faq-icon" style={{ fontSize: 20, color: colors.textMuted, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ color: colors.textMuted, fontSize: 14.5, marginTop: 16, marginBottom: 0, lineHeight: 1.65 }}>{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CtaBand({ data, accent }) {
  return (
    <Reveal variant="scale">
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          margin: "0 24px",
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          padding: "72px 40px",
          borderRadius: 28,
          background: `linear-gradient(135deg, ${hexToRgba(accent, 0.14)}, ${hexToRgba(colors.gradientTo, 0.14)})`,
          border: `1px solid ${colors.cardBorder}`,
          textAlign: "center",
        }}
      >
        <Glow color={accent} size={360} style={{ top: -120, left: "20%", opacity: 0.3 }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ ...styles.h2, margin: "0 auto 16px", maxWidth: 600 }}>{data.title}</h2>
          <p style={{ color: colors.textMuted, maxWidth: 560, margin: "0 auto 32px" }}>{data.description}</p>
          <Link to="/contact" className="wd-btn-primary" style={{ ...styles.button, ...accentVars(accent) }}>
            {data.buttonLabel}
          </Link>
        </div>
      </section>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function AdultWebDevPage() {
  const d = adultWebDevData;
  return (
    <div style={styles.page}>
      <GlobalStyles />
      <Hero data={d.hero} />
      <Stats stats={d.stats} accent={accentAt(0)} />
      <TwoColList {...d.problem} accent={accentAt(1)} />
      <CardGrid {...d.services} id="services" accent={accentAt(2)} />
      <TagList {...d.fullService} accent={accentAt(3)} />
      <CardGrid {...d.clones} accent={accentAt(4)} />
      <CtaBand data={d.midCta} accent={accentAt(0)} />
      <CardGrid {...d.features} accent={accentAt(1)} />
      <CardGrid {...d.security} accent={accentAt(2)} />
      <TagList {...d.techStack} accent={accentAt(3)} />
      <Process data={d.process} accent={accentAt(4)} />
      <CardGrid {...d.audiences} accent={accentAt(5)} />
      <CardGrid {...d.engagement} accent={accentAt(0)} />
      <CardGrid {...d.hireDevs} accent={accentAt(1)} />
      <Pricing data={d.pricing} accent={accentAt(2)} />
      <TagList {...d.global} accent={accentAt(3)} />
      <Testimonials data={d.testimonials} accent={accentAt(4)} />
      <FAQ data={d.faq} accent={accentAt(5)} />
      <CtaBand data={d.finalCta} accent={accentAt(0)} />
    </div>
  );
}