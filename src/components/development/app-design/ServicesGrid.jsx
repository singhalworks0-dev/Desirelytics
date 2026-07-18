import { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

// SEO keywords: "AI-powered SEO services", "AI content generation for SEO",
// "AI digital marketing agency", "AI-driven technical SEO"

const services = [
  {
    title: "AI Content & Copy Generation",
    desc: "AI-trained content engines that write on-brand, SEO-optimized articles, landing pages and product copy at scale — built to rank and convert, not just fill pages.",
    gradient: "from-violet-600 to-fuchsia-600",
  },
  {
    title: "AI Technical SEO Audits",
    desc: "Automated crawlers and AI models that surface indexing issues, Core Web Vitals problems and content gaps in minutes — with a prioritized fix list, not a wall of jargon.",
    gradient: "from-rose-600 to-orange-500",
  },
  {
    title: "AI Search & LLM Visibility",
    desc: "Optimization for how AI search engines and LLM answer boxes actually surface content — structured data, entity clarity and citation-ready formatting.",
    gradient: "from-fuchsia-600 to-violet-700",
  },
  {
    title: "AI-Powered Ad Campaign Management",
    desc: "Machine-learning bid optimization, audience modeling and creative testing that continuously improves ad spend efficiency across search and social.",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "AI Analytics & Reporting Dashboards",
    desc: "Real-time dashboards that use AI to flag traffic anomalies, forecast growth and translate raw analytics into plain-language, actionable insights.",
    gradient: "from-amber-500 to-rose-500",
  },
  {
    title: "Custom AI Marketing Agents & Integrations",
    desc: "Bespoke AI agents and LLM integrations wired into your CRM, CMS or ad stack — automating reporting, outreach, keyword research and campaign optimization.",
    gradient: "from-emerald-600 to-teal-600",
  },
];

export default function ServicesGrid() {
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
      className="relative w-full overflow-hidden bg-[#0A0510] px-6 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-fuchsia-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
            <Sparkles className="h-3 w-3" />
            WHAT WE BUILD
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          AI-Powered SEO &amp;{" "}
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            Digital Marketing
          </span>{" "}
          Services
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-2xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Custom-built, conversion-focused AI marketing systems — designed,
          trained and managed by a team that builds AI-driven growth every
          single day.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: mounted ? `${150 + i * 90}ms` : "0ms" }}
              className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-700 hover:-translate-y-1 hover:border-fuchsia-400/50 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {/* thumbnail */}
              <div
                className={`h-40 w-full bg-gradient-to-br ${s.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="p-6">
                <h3 className="text-base font-semibold text-white transition-colors duration-500 group-hover:text-fuchsia-300">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-12 flex justify-center transition-all delay-500 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all duration-300 hover:shadow-fuchsia-500/40 hover:brightness-110">
            Get a Free AI Marketing Quote
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}