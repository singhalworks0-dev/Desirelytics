import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

// SEO keywords: "AI marketing pricing", "AI SEO packages", "AI content
// automation cost", "AI-powered digital marketing packages"

const plans = [
  {
    badge: null,
    name: "Starter Growth",
    price: "$1,500",
    period: "/ month",
    features: [
      "AI-optimized SEO for up to 20 pages",
      "Monthly AI content & keyword strategy",
      "Technical SEO audit & fixes",
      "Core analytics dashboard",
      "~2-3 week onboarding",
    ],
    bestFor: "startups and small brands validating organic growth fast.",
    cta: "Get Started",
    popular: false,
  },
  {
    badge: "MOST POPULAR",
    name: "Growth Engine",
    price: "$5,000",
    period: "/ month",
    features: [
      "Full AI content & SEO system (site + blog)",
      "AI-powered ad campaign management",
      "Multilingual content & local SEO",
      "Custom analytics & reporting dashboard",
      "~4-6 week ramp-up + ongoing support",
    ],
    bestFor: "brands ready to scale organic and paid growth together.",
    cta: "Get a Quote",
    popular: true,
  },
  {
    badge: null,
    name: "Enterprise Platform",
    price: "Custom",
    period: "",
    features: [
      "Multi-brand AI marketing platform",
      "Dedicated AI models & full data ownership",
      "Multi-agent orchestration & API integrations",
      "Scalable infra for high-volume campaigns",
      "Dedicated team & SLA-backed support",
    ],
    bestFor: "agencies and enterprises scaling AI marketing across brands.",
    cta: "Talk to Us",
    popular: false,
  },
];

export default function PricingPackages() {
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

      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            PRICING
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          AI Marketing &amp;{" "}
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            SEO Pricing
          </span>
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Transparent, indicative pricing based on scope. Your final fixed
          quote comes after a free strategy call — no surprises, and you own
          everything we build.
        </p>

        {/* Plans */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{ transitionDelay: mounted ? `${150 + i * 120}ms` : "0ms" }}
              className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-200 ease-out hover:-translate-y-1 ${
                plan.popular
                  ? "border-fuchsia-500/40 bg-white/[0.04] hover:border-fuchsia-400"
                  : "border-white/10 bg-white/[0.02] hover:border-fuchsia-400/50"
              } ${
                mounted
                  ? "translate-y-0 opacity-100 duration-700"
                  : "translate-y-4 opacity-0 duration-700"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-7 rounded-full bg-fuchsia-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg shadow-fuchsia-500/30">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-center text-sm font-semibold text-gray-300 transition-colors duration-200 group-hover:text-fuchsia-300">
                {plan.name}
              </h3>

              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-xs text-gray-500">{plan.period}</span>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-400 transition-colors duration-200 group-hover:bg-fuchsia-500/25">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-400">
                <span className="font-semibold text-white">Best for:</span>{" "}
                {plan.bestFor}
              </p>

              <button
                className={`mt-6 w-full rounded-full border py-2.5 text-xs font-semibold transition-all duration-150 ease-out active:scale-[0.97] ${
                  plan.popular
                    ? "border-transparent bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 hover:brightness-110"
                    : "border-fuchsia-400/40 text-fuchsia-300 hover:bg-fuchsia-500 hover:text-white hover:border-transparent"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}