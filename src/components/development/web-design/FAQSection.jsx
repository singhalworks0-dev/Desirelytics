import { useEffect, useState } from "react";
import { Plus, Sparkles } from "lucide-react";

// SEO keywords: "web development FAQs", "website development cost",
// "custom web app development", "payment gateway integration"

const faqs = [
  {
    q: "What does a web development company do?",
    a: "We design, build and maintain custom websites and web applications — from UI/UX design and frontend engineering to backend architecture, payments, hosting and ongoing support.",
  },
  {
    q: "How much does web development cost?",
    a: "Pricing depends on scope and complexity. Simple sites start around $2,500, while full custom platforms typically range from $9,000 upward. You'll get a fixed quote after a free scoping call.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most standard sites take 4-6 weeks. Full custom platforms or apps with advanced features usually take 2-4 months, depending on scope and integrations.",
  },
  {
    q: "Which payment gateways can you integrate?",
    a: "We integrate Stripe, PayPal, Braintree and other major gateways, along with subscription billing, invoicing and multi-currency support where needed.",
  },
  {
    q: "Can you build a mobile app alongside my website?",
    a: "Yes — we build cross-platform apps with React Native or native iOS/Android apps, sharing your backend and design system with your web product.",
  },
  {
    q: "Do you build platforms similar to existing marketplaces?",
    a: "Yes, we build custom marketplace, subscription and streaming platforms modeled on proven business patterns, tailored to your brand and features.",
  },
  {
    q: "How do you handle security and privacy?",
    a: "We implement encryption, secure authentication, regular audits and role-based access control, following industry best practices for data protection.",
  },
  {
    q: "Will my site be GDPR and CCPA compliant?",
    a: "Yes — we build in consent management, data handling policies and user rights workflows to help meet GDPR, CCPA and other regional compliance requirements.",
  },
];

export default function FAQSection() {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0F] px-6 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-rose-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-3xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-rose-300">
            <Sparkles className="h-3 w-3" />
            ANSWERS
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Web Development{" "}
          <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
            FAQs
          </span>
        </h2>

        {/* Accordion */}
        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                style={{ transitionDelay: mounted ? `${100 + i * 60}ms` : "0ms" }}
                className={`overflow-hidden rounded-xl border transition-all duration-700 ${
                  isOpen
                    ? "border-rose-400/50 bg-white/[0.04]"
                    : "border-white/10 bg-white/[0.02] hover:border-rose-400/40"
                } ${mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isOpen ? "text-rose-300" : "text-white group-hover:text-rose-300"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-rose-400 bg-rose-500/20 text-rose-300"
                        : "border-white/20 text-gray-400 hover:border-rose-400 hover:text-rose-300"
                    }`}
                  >
                    <Plus className="h-3 w-3" />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-xs leading-relaxed text-gray-400">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}