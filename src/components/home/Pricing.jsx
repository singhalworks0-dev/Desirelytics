import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

// Detects touch/coarse-pointer devices so we don't apply tilt where it doesn't make sense
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

// Tilt wrapper: tracks mouse position and rotates the card in 3D (desktop only)
function TiltCard({ children, className = "", style = {} }) {
  const cardRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });

  const handleMouseMove = (e) => {
    if (isTouch) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 10;
    const rx = py * maxTilt;
    const ry = -px * maxTilt;

    setTilt({ rx, ry, scale: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, scale: 1 });
  };

  return (
    <div className="[perspective:1000px]" style={style}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={
          isTouch
            ? {}
            : {
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})`,
                transformStyle: "preserve-3d",
                transition: "transform 300ms ease-out",
              }
        }
      >
        {children}
      </div>
    </div>
  );
}

export default function Pricing() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const plans = [
    {
      name: "Starter",
      price: "$149",
      period: "/month",
      features: [
        "Keyword research (10-15 niche keywords)",
        "On-page SEO (metadata, structure, images)",
        "Monthly technical audit",
        "Weekly progress updates",
      ],
      bestFor: "Small blogs, indie creators, or startups prioritizing foundational SEO.",
      popular: false,
    },
    {
      name: "Pro",
      price: "$349",
      period: "/month",
      features: [
        "Everything in Starter",
        "Off-page strategy (10 premium backlinks/mo)",
        "Competitor gap analysis",
        "Custom content strategy (articles + video SEO)",
        "Priority support (4-hour response)",
      ],
      bestFor: "Growing platforms and subscription brands scaling traffic.",
      popular: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Pricing",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "PPC + SEO synergy",
        "Global geo-targeting (50+ countries)",
        "Crisis management & 24/7 support",
      ],
      bestFor: "High-traffic networks, multinational platforms, and enterprise brands.",
      popular: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0710] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
      {/* Glow blobs - smaller/repositioned on mobile to avoid overflow issues */}
      <div className="pointer-events-none absolute -top-16 left-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-purple-700/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-4 h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className={reveal()} style={style(0)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-[10px] sm:text-xs font-medium text-transparent">
                PRICING
              </span>
            </div>
          </div>

          <h2
            className={`mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2 ${reveal()}`}
            style={style(120)}
          >
            Transparent, Straightforward Pricing
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base text-gray-400 px-4 sm:px-0 ${reveal()}`}
            style={style(220)}
          >
            No hidden fees. No empty promises. Just results. See our full{" "}
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent font-medium cursor-pointer hover:opacity-80">
              plans and packages
            </span>
            .
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {plans.map((plan, i) => (
            <TiltCard
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-5 sm:p-6 md:p-8 ${
                plan.popular
                  ? "border-red-500/30 bg-gradient-to-b from-red-950/20 to-white/[0.02] md:hover:shadow-[0_20px_50px_rgba(225,29,72,0.3)]"
                  : "border-white/10 bg-white/[0.02] md:hover:border-red-500/40 md:hover:shadow-[0_20px_50px_rgba(225,29,72,0.2)]"
              } ${plan.popular ? "mt-4 md:mt-0" : ""} ${reveal()}`}
              style={style(320 + i * 120)}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white shadow-[0_10px_40px_rgba(225,29,72,0.3)]">
                  POPULAR
                </span>
              )}

              <h3 className="text-center text-base sm:text-lg font-semibold text-white">
                {plan.name}
              </h3>

              <div className="mt-3 text-center">
                <span
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="ml-1 text-xs sm:text-sm text-gray-500">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-6 sm:mt-7 flex-1 space-y-2.5 sm:space-y-3">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-7 sm:mt-8 w-full rounded-full py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] md:hover:scale-[1.02] ${
                  plan.popular
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)]"
                    : "border border-red-500/40 text-red-400 md:hover:bg-red-500/10"
                }`}
              >
                Choose Plan
              </Link>

              <p className="mt-4 sm:mt-5 border-t border-white/10 pt-4 text-center text-[10px] sm:text-[11px] text-gray-500">
                <span className="font-semibold text-gray-400">Best for:</span>{" "}
                {plan.bestFor}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}