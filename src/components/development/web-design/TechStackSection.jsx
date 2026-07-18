import React, { useEffect, useRef, useState } from "react";

/**
 * TechStackSection.jsx
 * "Tools & Technologies" stack pill cloud — React + Tailwind CSS
 * Includes: staggered pop-in entrance, hover lift + glow on pills,
 * AI-powered tools mixed into the stack, ambient background glow.
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

// Mix of frontend / backend / infra / payments + AI-powered tools
const stack = [
  { label: "React", ai: false },
  { label: "Next.js", ai: false },
  { label: "Vue", ai: false },
  { label: "TailwindCSS", ai: false },
  { label: "Node.js", ai: false },
  { label: "Laravel", ai: false },
  { label: "Django", ai: false },
  { label: "PHP", ai: false },
  { label: "PostgreSQL", ai: false },
  { label: "MongoDB", ai: false },
  { label: "AWS", ai: false },
  { label: "Google Cloud", ai: false },
  { label: "Docker", ai: false },
  { label: "Kubernetes", ai: false },
  { label: "WebRTC", ai: false },
  { label: "HLS / VOD", ai: false },
  { label: "CCBill", ai: false },
  { label: "Segpay", ai: false },
  { label: "Crypto / Bitcoin", ai: false },
  { label: "WordPress / Custom CMS", ai: false },
  { label: "React Native", ai: false },
  { label: "OpenAI / LLM APIs", ai: true },
  { label: "AI Content Moderation", ai: true },
  { label: "AI-Powered SEO Tools", ai: true },
  { label: "Recommendation Engines (ML)", ai: true },
  { label: "AI Chatbot Frameworks", ai: true },
  { label: "Computer Vision / Face Verification", ai: true },
];

// ---------- Pop-in Pill ----------
function StackPill({ label, ai, delay }) {
  const [ref, visible] = useReveal();
  return (
    <span
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-sm font-semibold cursor-default
        transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg
        ${
          ai
            ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/15 hover:shadow-fuchsia-900/40"
            : "border-white/15 bg-white/[0.04] text-slate-200 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-black/30"
        }
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
      `}
    >
      <span
        className={`pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
          ai
            ? "bg-gradient-to-r from-fuchsia-500/40 to-purple-500/40"
            : "bg-gradient-to-r from-white/10 to-white/5"
        }`}
      />
      {ai && <span className="text-[10px]">✨</span>}
      {label}
    </span>
  );
}

export default function TechStackSection() {
  return (
    <section
      aria-labelledby="stack-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-64 bg-fuchsia-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            AI-POWERED TOOLS &amp; TECHNOLOGIES
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="stack-heading"
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          >
            A Modern, Scalable,
            <br />
            AI-Powered Future-Proof Stack
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            We pick the right tools for your build — fast front-ends, robust
            back-ends, secure payments, cloud that scales from MVP to
            millions, and AI-powered tooling for moderation, SEO and
            personalization.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-3.5">
          {stack.map((s, i) => (
            <StackPill key={s.label} {...s} delay={i * 35} />
          ))}
        </div>
      </div>
    </section>
  );
}