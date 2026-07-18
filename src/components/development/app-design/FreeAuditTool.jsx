import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, ShieldCheck, Zap, Sparkles } from "lucide-react";

// SEO keywords: "free SEO audit tool", "AI search readiness audit",
// "website AI indexing audit", "free website audit tool"

const trustPoints = [
  { icon: Zap, label: "Results in seconds" },
  { icon: ShieldCheck, label: "No credit card required" },
  { icon: Sparkles, label: "AI-indexing insights included" },
];

export default function FreeAuditTool() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-violet-200 via-fuchsia-50 to-rose-100 px-6 py-20 sm:py-28"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-0 top-0 h-[380px] w-[380px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-violet-400/30 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] translate-x-1/4 rounded-full bg-rose-300/30 blur-[110px]" />
      {/* subtle dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-violet-700 backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            FREE AI TOOL
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-3xl font-bold leading-tight text-gray-900 transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Free AI Search Readiness Audit —{" "}
          <span className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
            No Signup Needed
          </span>
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-5 max-w-xl text-sm leading-relaxed text-gray-600 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          See how ready your website is for AI search and AI-driven discovery
          in seconds. Our tool scans your technical SEO, content structure
          and AI-indexing signals, then hands you a prioritized fix list —
          completely free, no paid plan needed.
        </p>

        {/* Input + CTA card */}
        <div
          className={`mx-auto mt-9 max-w-xl transition-all delay-200 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div
            className={`flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl transition-all duration-300 sm:flex-row sm:items-center ${
              focused
                ? "shadow-fuchsia-300/50 ring-2 ring-fuchsia-400/50"
                : "shadow-violet-200/50"
            }`}
          >
            <div className="flex flex-1 items-center gap-2.5 px-4 py-2">
              <Globe className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter your website URL"
                className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-400/50 hover:brightness-110 active:scale-[0.98]">
              Run My Free Audit
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Trust points */}
        <div
          className={`mx-auto mt-7 flex max-w-lg flex-wrap items-center justify-center gap-x-6 gap-y-2 transition-all delay-300 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {trustPoints.map((t) => {
            const Icon = t.icon;
            return (
              <span
                key={t.label}
                className="group flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors duration-300 hover:text-fuchsia-600"
              >
                <Icon className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300 group-hover:text-fuchsia-500" />
                {t.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}