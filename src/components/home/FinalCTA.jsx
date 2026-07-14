import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function FinalCTA() {
  const [ref, inView] = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f3e8ff] via-[#fdf2f8] to-white py-16 px-4 sm:py-20 sm:px-6 lg:py-24"
    >
      {/* Soft floating glow accents */}
      <div className="pointer-events-none absolute -top-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 bg-purple-300/40 blur-3xl rounded-full animate-[float_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 sm:w-96 sm:h-96 bg-red-300/40 blur-3xl rounded-full animate-[float_9s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-200/30 blur-3xl rounded-full" />

      <div
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-red-300/50 bg-white/60 backdrop-blur-sm px-3.5 py-1 mb-6 shadow-sm transition-all duration-700 delay-100 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Ready When You Are
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-snug tracking-tight">
          Build Rankings That Compound,{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
            Not Expire
          </span>
        </h2>

        <p className="mt-5 text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
          Our fast, secure infrastructure gets you found across AI search
          tools and traditional engines alike — then keeps you there long
          after competitors fade. Start with a free{" "}
          <span className="text-red-500 font-medium cursor-pointer hover:text-red-600 transition-colors underline decoration-red-300 underline-offset-2">
            adult site SEO audit
          </span>
          .
        </p>

        <div
          className={`mt-9 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-7 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_8px_30px_rgba(225,29,72,0.3)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(147,51,234,0.4)] hover:-translate-y-1 active:translate-y-0 overflow-hidden">
            {/* Shine sweep effect */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
            <span className="relative z-10">Talk to Our SEO Strategists</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>
    </section>
  );
}