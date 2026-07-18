import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";

// SEO focus keywords woven into copy:
// "web development packages", "custom website pricing", "web app development cost"

const plans = [
  {
    badge: null,
    name: "Starter",
    price: "$2,500",
    period: "/ one-off",
    features: [
      "Custom homepage + 5 inner pages",
      "Responsive CMS-powered UI",
      "Basic SEO setup & security hardening",
      "1 payment gateway integration",
      "~4-6 week delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    badge: "MOST POPULAR",
    name: "Growth",
    price: "$9,000",
    period: "/ project",
    features: [
      "Full custom website or web app",
      "Secure payments & subscriptions",
      "Advanced SEO & performance optimization",
      "Streaming, chat or e-commerce modules",
      "~2-4 month delivery + support",
    ],
    cta: "Get a Quote",
    popular: true,
  },
  {
    badge: null,
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Full-scale platform or marketplace build",
      "High-traffic cloud + CDN architecture",
      "Dedicated team & ongoing roadmap",
      "Advanced AI, analytics & automation",
      "SLA-backed support & scaling",
    ],
    cta: "Talk to Us",
    popular: false,
  },
];

export default function PricingPackages() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0F] px-6 py-20 sm:py-24">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-rose-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-rose-300">
            <Sparkles className="h-3 w-3" />
            PACKAGES
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Web &amp; App Development{" "}
          <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
            Packages
          </span>
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Transparent, indicative pricing based on complexity. Your final fixed
          quote comes after a free scoping call — no surprises.
        </p>

        {/* Plans */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              style={{ transitionDelay: mounted ? `${150 + i * 120}ms` : "0ms" }}
              className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-700 hover:-translate-y-1 ${
                plan.popular
                  ? "border-rose-500/40 bg-white/[0.04] hover:border-rose-400"
                  : "border-white/10 bg-white/[0.02] hover:border-rose-400/50"
              } ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-7 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow-lg shadow-rose-500/30">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-center text-sm font-semibold text-gray-300 transition-colors duration-500 group-hover:text-rose-300">
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
                    <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-400 transition-colors duration-500 group-hover:bg-rose-500/25">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full border py-2.5 text-xs font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "border-transparent bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:brightness-110"
                    : "border-rose-400/40 text-rose-300 hover:bg-rose-500 hover:text-white hover:border-transparent"
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