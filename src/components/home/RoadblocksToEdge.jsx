import { useEffect, useRef, useState } from "react";

const challenges = [
  {
    title: "Fierce Search Competition",
    desc: "We uncover the keyword gaps your competitors overlook and target exactly what your audience is typing — so you climb faster and stay ranked longer.",
  },
  {
    title: "Compliance & Age Verification",
    desc: "Our team builds age-gating and compliance flows that satisfy legal requirements and search engine policies, without breaking the user experience.",
  },
  {
    title: "Negative SEO & Link Attacks",
    desc: "We keep a constant watch on your backlink profile, disavow toxic links fast, and shield your rankings from sabotage before it does damage.",
  },
  {
    title: "Site Speed & Core Web Vitals",
    desc: "We fine-tune every load time, image, and script so your platform passes Google's speed benchmarks and feels instant on any device.",
  },
  {
    title: "Earning Real Authority Links",
    desc: "Quality backlinks are scarce in this space — our vetted outreach network secures placements from sites that actually move the needle.",
  },
  {
    title: "Constantly Shifting Algorithms",
    desc: "We track every Google core update the moment it lands and adapt your technical SEO in real time, so your foundation never falls behind.",
  },
];

function useInView(threshold = 0.15) {
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

export default function RoadblocksToEdge() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-700/10 blur-3xl rounded-full" />

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Challenges We Solve
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          Turning Adult-Industry Roadblocks Into{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Your Competitive Edge
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          This industry throws up obstacles most agencies won't touch. We
          treat every one of them as an opportunity to outrank your
          competitors and build a foundation that lasts.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="relative mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {challenges.map((item, i) => (
          <div
            key={item.title}
            style={{
              transitionDelay: gridInView
                ? `${(i % 3) * 100 + Math.floor(i / 3) * 80}ms`
                : "0ms",
            }}
            className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-7 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-transparent hover:bg-gradient-to-br hover:from-red-950/40 hover:to-purple-950/40 hover:shadow-[0_10px_40px_rgba(225,29,72,0.2)] ${
              gridInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Glow ring on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-red-500/30" />

            <h3 className="relative text-base sm:text-lg font-bold text-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
              {item.title}
            </h3>
            <p className="relative mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}