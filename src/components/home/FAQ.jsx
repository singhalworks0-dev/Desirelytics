import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

function AccordionItem({ item, isOpen, onClick, delay, mounted }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-500 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${
        isOpen
          ? "border-red-500/30 bg-gradient-to-b from-red-950/20 to-white/[0.02]"
          : "border-white/10 bg-white/[0.02] hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(225,29,72,0.15)]"
      }`}
      style={{ transitionDelay: mounted ? `${delay}ms` : "0ms" }}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
      >
        <span
          className={`text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent"
              : "text-white"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-purple-600 rotate-45"
              : "bg-white/[0.05] text-red-500"
          }`}
        >
          <Plus className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isOpen ? "text-white" : "text-red-500"}`} />
        </span>
      </button>

      <div
        style={{ height }}
        className="transition-[height] duration-400 ease-out"
      >
        <div ref={contentRef} className="px-4 sm:px-6 pb-4 sm:pb-5">
          <p className="text-xs sm:text-sm md:text-base leading-relaxed text-gray-400">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const faqs = [
    {
      question: "How is this different from a standard approach?",
      answer:
        "We work inside stricter rules, tighter timelines, and more competitive conditions. The fundamentals stay the same, but the tactics, partnerships, and risk management are built specifically for your situation so you grow without running into avoidable setbacks.",
    },
    {
      question: "Do you help recover from a setback or penalty?",
      answer:
        "Yes. We start with a full diagnostic to identify exactly what triggered the issue, then build a recovery plan that addresses the root cause first, followed by a longer-term strategy to prevent it from happening again.",
    },
    {
      question: "Do you follow official platform guidelines?",
      answer:
        "Always. Every strategy we build is designed to work with platform rules, not around them. Shortcuts might produce short-term gains, but they put your long-term growth at serious risk.",
    },
    {
      question: "What industries or niches do you work with?",
      answer:
        "We work across a wide range of industries, including several that require extra care around compliance and content policies. If your space has unique constraints, we tailor our approach accordingly.",
    },
    {
      question: "How soon will I start seeing results?",
      answer:
        "Most clients notice measurable movement within 4-8 weeks, with more substantial gains building over 3-6 months. Timelines vary based on your starting point, competition, and the scope of work involved.",
    },
    {
      question: "Is my business and data kept confidential?",
      answer:
        "Absolutely. We treat every engagement as strictly confidential, and we're happy to sign an NDA before any work begins if that gives you extra peace of mind.",
    },
    {
      question: "What does the onboarding process look like?",
      answer:
        "After you choose a plan, we schedule a kickoff call to align on goals, gather access to the relevant accounts, and run an initial audit. You'll get a full strategy document within the first two weeks.",
    },
    {
      question: "Can I switch plans or cancel later?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel at any time. There are no long-term contracts locking you in, and we'll help ensure a smooth transition whenever your needs change.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0710] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-16 right-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-purple-700/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <div className={reveal()} style={style(0)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-[10px] sm:text-xs font-medium text-transparent">
                FAQ
              </span>
            </div>
          </div>

          <h2
            className={`mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2 ${reveal()}`}
            style={style(120)}
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base text-gray-400 px-4 sm:px-0 ${reveal()}`}
            style={style(220)}
          >
            Everything you need to know before getting started. Can't find
            your answer? Reach out and we'll get back to you fast.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-10 sm:mt-14 flex flex-col gap-3 sm:gap-4">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              delay={320 + i * 80}
              mounted={mounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}