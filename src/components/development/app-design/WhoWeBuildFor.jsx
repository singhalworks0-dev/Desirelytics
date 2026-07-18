import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

// SEO keywords: "AI marketing for every industry", "AI SEO for eCommerce",
// "AI-powered growth for SaaS", "AI marketing agency clients"

const audiences = [
  {
    title: "SaaS & Startups",
    desc: "Launch AI-driven SEO and content systems that scale organic traffic from day one — with your own dashboards, reporting and brand voice built in.",
  },
  {
    title: "Creators & Personal Brands",
    desc: "Clone your voice into an AI content engine that writes, schedules and optimizes across channels 24/7 — scaling your reach without burning out.",
  },
  {
    title: "eCommerce & Retail Brands",
    desc: "Add AI product content, personalized recommendations and automated ad optimization to lift engagement, retention and average order value.",
  },
  {
    title: "Local & Service Businesses",
    desc: "Deploy AI-powered local SEO and review management that keeps your listings accurate, competitive and converting new customers.",
  },
  {
    title: "Agencies & Studios",
    desc: "White-label AI marketing systems for your roster of clients, billed under your brand — we build and maintain, you sell and scale.",
  },
  {
    title: "Enterprise & Multi-Brand Teams",
    desc: "Add AI-powered content, SEO and analytics agents across multiple brands or regions to guide strategy, answer stakeholders and lift conversions.",
  },
];

export default function WhoWeBuildFor() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-violet-700 via-fuchsia-700 to-rose-600 px-6 py-20 sm:py-24"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
            <Sparkles className="h-3 w-3" />
            WHO WE BUILD FOR
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          AI-Powered SEO &amp; Marketing for Every Brand
        </h2>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              style={{ transitionDelay: mounted ? `${150 + i * 90}ms` : "0ms" }}
              className={`group rounded-2xl border border-white/10 bg-[#131022]/90 p-6 transition-all duration-700 hover:-translate-y-1 hover:border-fuchsia-300/60 hover:bg-[#1c1730] ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <h3 className="text-base font-semibold text-white transition-colors duration-500 group-hover:text-fuchsia-300">
                {a.title}
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed text-gray-300 transition-colors duration-500 group-hover:text-gray-200">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}