import { useEffect, useRef, useState } from "react";

const tags = [
  "Dating Platforms",
  "Cam & Live",
  "OnlyFans & Creators",
  "Tube Sites",
  "Adult eCommerce",
  "Fetish & Kink",
  "AI Companions",
];

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

export default function TrustedWorldwide() {
  const [headerRef, headerInView] = useInView(0.2);
  const [tagsRef, tagsInView] = useInView(0.1);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-700/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-0 right-0 w-[450px] h-[450px] bg-red-600/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-700/10 blur-3xl rounded-full" />

      <div
        ref={headerRef}
        className={`relative max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
          headerInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1 mb-5 shadow-[0_0_20px_rgba(225,29,72,0.15)]">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            Trusted Worldwide
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          Trusted by Hundreds of Adult Businesses Across{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            the Globe
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          From dating platforms and webcam sites to adult eCommerce and
          creator brands, companies in 30+ countries rely on Adult SEO Minds
          to grow their organic traffic and revenue.
        </p>
      </div>

      {/* Tag pills */}
      <div
        ref={tagsRef}
        className="relative mt-10 sm:mt-12 max-w-4xl mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3"
      >
        {tags.map((tag, i) => (
          <span
            key={tag}
            style={{ transitionDelay: tagsInView ? `${i * 80}ms` : "0ms" }}
            className={`rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-2 text-xs sm:text-sm font-semibold text-gray-200 transition-all duration-500 ease-out hover:border-red-500/40 hover:bg-white/[0.06] hover:text-white cursor-default ${
              tagsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}