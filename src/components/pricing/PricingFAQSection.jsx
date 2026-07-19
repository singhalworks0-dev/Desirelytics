import React, { useEffect, useState } from "react";

/**
 * PricingFAQSection.jsx
 * "Adult SEO Pricing & Cost FAQs" accordion — React + Tailwind CSS
 * Includes: entrance animation, smooth grid-based accordion expand/collapse,
 * rotating plus/minus icon, hover states, FAQPage JSON-LD for SEO rich snippets.
 */

const faqs = [
  {
    q: "How much does adult SEO cost?",
    a: "Our adult SEO packages start at $1,297/mo for new sites and creators, scaling to $2,997/mo for competitive brands and marketplaces. Final pricing depends on niche competition, current site health, and growth goals.",
  },
  {
    q: "What is included in your adult SEO packages?",
    a: "Every package includes an SEO audit, adult keyword research, competitor analysis, content and page optimization, adult-friendly link building, and monthly reporting — with AI-powered search optimization included on our top-tier plan.",
  },
  {
    q: "Why does adult SEO cost more than mainstream SEO?",
    a: "Adult SEO requires specialist link-building sources, penalty-safe content strategies, and platform-specific technical work that most mainstream agencies can't access or execute safely — which is reflected in the pricing.",
  },
  {
    q: "Is there a long-term contract?",
    a: "We recommend a 3-month minimum commitment since SEO compounds over time, with best results typically showing within 6 months. There's no indefinite lock-in beyond that initial period.",
  },
  {
    q: "Can I add extra blogs or backlinks?",
    a: "Yes — extra blog posts and backlinks can be added to any plan as needed, priced per unit on top of your monthly package.",
  },
  {
    q: "Do you offer custom adult SEO pricing?",
    a: "Yes. If none of our standard packages fit your exact needs, we'll build a custom scope and quote based on your platform, niche and growth targets.",
  },
];

function useReveal(threshold = 0.15) {
  const ref = React.useRef(null);
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

function FAQItem({ q, a, isOpen, onToggle, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group rounded-xl border bg-white/[0.03] overflow-hidden transition-colors duration-200
          ${isOpen ? "border-fuchsia-500/40" : "border-white/10 hover:border-white/20"}
        `}
      >
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left transition-colors duration-200 hover:bg-white/[0.03]"
        >
          <span
            className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
              isOpen ? "text-fuchsia-400" : "text-white group-hover:text-fuchsia-300"
            }`}
          >
            {q}
          </span>
          <span
            className={`relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
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

export function PricingFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    let script = document.getElementById("ld-json-pricing-faq");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json-pricing-faq";
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
      aria-labelledby="pricing-faq-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-96 h-72 bg-fuchsia-800/10 rounded-full blur-3xl" />

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
              id="pricing-faq-heading"
              className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
            >
              Adult SEO Pricing &amp; Cost FAQs
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

export default PricingFAQSection;