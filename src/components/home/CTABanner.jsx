import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTABanner() {
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

  return (
    <section className="relative overflow-hidden bg-[#0a0710] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-16 left-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-purple-700/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] px-6 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 text-center ${reveal()}`}
          style={style(0)}
        >
          {/* Inner glow accents */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-700/20 blur-3xl" />

          {/* Badge */}
          <div className={reveal()} style={style(100)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-[10px] sm:text-xs font-medium text-transparent">
                LIMITED SPOTS AVAILABLE
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2
            className={`relative mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white ${reveal()}`}
            style={style(200)}
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Outgrow the Competition
            </span>
            ?
          </h2>

          {/* Subtext */}
          <p
            className={`relative mx-auto mt-4 sm:mt-5 max-w-xl text-xs sm:text-sm md:text-base text-gray-400 px-2 sm:px-0 ${reveal()}`}
            style={style(300)}
          >
            Get a free, no-obligation audit of your website and a custom
            growth roadmap from our specialist team. Let's turn your traffic
            into loyal, paying customers.
          </p>

          {/* CTA button */}
          <div
            className={`relative mt-7 sm:mt-9 flex justify-center ${reveal()}`}
            style={style(400)}
          >
            <Link to="/free-audit" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)] transition-all hover:shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98]">
              Get My Free Audit
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Trust row */}
          <div
            className={`relative mt-5 sm:mt-6 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-gray-500 ${reveal()}`}
            style={style(480)}
          >
            <Sparkles className="h-3 w-3 text-red-500" />
            No credit card required · Results in 24-48 hours
          </div>
        </div>
      </div>
    </section>
  );
}