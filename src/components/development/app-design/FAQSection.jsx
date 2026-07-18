import React, { useEffect, useRef, useState } from "react";

/**
 * FAQSection.jsx
 * "Adult AI Agent Development FAQs" accordion — React + Tailwind CSS
 * Includes: entrance animation, smooth accordion expand/collapse,
 * rotating plus/minus icon, hover states, FAQPage JSON-LD for SEO rich snippets.
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

const faqs = [
  {
    q: "What is adult AI agent development?",
    a: "It's the process of building a custom AI-powered persona or assistant for an adult platform — handling chat, engagement, and paid messaging with its own personality, voice and monetization logic, tailored to your brand.",
  },
  {
    q: "What is an NSFW AI agent?",
    a: "An NSFW AI agent is an AI persona configured to engage in mature, age-restricted conversation within controlled, compliant boundaries — typically used for companion apps, fan engagement, or paid chat experiences.",
  },
  {
    q: "How much does adult AI agent development cost?",
    a: "Cost depends on scope — model choice, custom training, integrations (billing, chat, voice) and platform complexity. We provide a fixed quote after a short discovery call once we understand your requirements.",
  },
  {
    q: "Do you build AI girlfriend and companion apps?",
    a: "Yes. We build companion and AI girlfriend/boyfriend-style apps with custom personas, memory, voice, and monetized messaging, designed around your brand and audience.",
  },
  {
    q: "Which AI models and LLMs do you use?",
    a: "We work with leading commercial and open-source LLMs, selecting the right model per use case for cost, latency, and content-handling needs, and can fine-tune or fully self-host where required.",
  },
  {
    q: "Can the AI agent handle explicit content safely?",
    a: "We build in age verification, content moderation layers, and configurable guardrails so explicit interactions stay within your platform's compliance and legal requirements across regions.",
  },
  {
    q: "Will I own the AI agent, model and data?",
    a: "Yes — everything we build is delivered fully owned by you, including source code, fine-tuned model assets, and your user data. Nothing is locked to us after handoff.",
  },
  {
    q: "How long does it take to build an adult AI agent?",
    a: "A focused MVP typically takes a few weeks; a full production platform with custom training, billing and compliance usually takes longer, depending on scope. We give you an exact timeline after discovery.",
  },
];

function FAQItem({ q, a, isOpen, onToggle, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group rounded-xl border bg-white/[0.03] overflow-hidden transition-colors duration-300
          ${isOpen ? "border-fuchsia-500/40" : "border-white/10 hover:border-white/20"}
        `}
      >
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03]"
        >
          <span
            className={`text-sm sm:text-base font-bold transition-colors duration-300 ${
              isOpen ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-300"
            }`}
          >
            {q}
          </span>
          <span
            className={`relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
              ${isOpen ? "bg-fuchsia-500/20 rotate-45" : "bg-rose-500/15 group-hover:bg-rose-500/25"}
            `}
          >
            <span className="absolute w-2.5 h-[2px] bg-rose-400 rounded-full" />
            <span className="absolute w-[2px] h-2.5 bg-rose-400 rounded-full" />
          </span>
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <p className="px-5 sm:px-6 pb-5 text-[13px] sm:text-sm leading-relaxed text-slate-400">
              {a}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  // FAQPage structured data for SEO rich snippets
  useEffect(() => {
    let script = document.getElementById("ld-json-faq");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json-faq";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }, []);

  return (
    <section
      aria-labelledby="faq-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-10 left-1/3 w-96 h-96 bg-fuchsia-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              ANSWERS
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2
              id="faq-heading"
              className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
            >
              Adult AI Agent Development
              <br />
              FAQs
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              {...f}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}