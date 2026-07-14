import { useEffect, useRef, useState } from "react";

const niches = [
  {
    title: "Adult eCommerce SEO",
    color: "from-pink-500/20 to-rose-500/10",
    items: ["Sexual wellness stores", "Adult toy retailers", "Lingerie & apparel shops"],
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Adult Dating SEO",
    color: "from-red-500/20 to-orange-500/10",
    items: ["Local dating apps", "Niche matchmaking sites", "Casual hookup platforms"],
    img: "https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Adult Entertainment SEO",
    color: "from-purple-500/20 to-fuchsia-500/10",
    items: ["Adult video streaming sites", "Cam & live streaming platforms", "Adult blogs & content portals"],
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "OnlyFans & Creator SEO",
    color: "from-fuchsia-500/20 to-pink-500/10",
    items: ["OnlyFans & webcam models", "Fanvue creator platforms", "Private membership & fan sites"],
    img: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Fetish & Kink SEO",
    color: "from-red-600/20 to-purple-600/10",
    items: ["BDSM & fetish communities", "Specialty role-play sites", "Kink-friendly social networks"],
    img: "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "AI Companion SEO",
    color: "from-purple-600/20 to-indigo-500/10",
    items: ["AI girlfriend/boyfriend apps", "Virtual companion chatbots", "Interactive AI roleplay sites"],
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Adult Education SEO",
    color: "from-rose-500/20 to-red-500/10",
    items: ["Sexual health resources", "Adult wellness coaching", "Relationship education portals"],
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Adult Blog & Review Site SEO",
    color: "from-orange-500/20 to-pink-500/10",
    items: ["Adult review & rating sites", "Industry news & magazines", "Performer & studio directories"],
    img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Cam & Live Streaming SEO",
    color: "from-pink-600/20 to-purple-500/10",
    items: ["Live cam platforms", "Interactive streaming sites", "Tipping & token-based sites"],
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
  },
];

function useInView(threshold = 0.1) {
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

export default function NicheExpertise() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);

  return (
    <section className="relative w-full bg-[#0a0710] overflow-hidden py-16 px-4 sm:py-20 sm:px-6 lg:py-24">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/3 w-[500px] h-[500px] bg-red-600/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-[450px] h-[450px] bg-purple-700/10 blur-3xl rounded-full" />

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
            Niche Expertise
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug tracking-tight">
          Drive High-Intent Traffic With{" "}
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Niche-Focused Adult SEO
          </span>{" "}
          Services
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          We strictly follow Google's guidelines to grow your site without
          penalties, indexing issues or bans — backed by Ahrefs, GTmetrix and
          Google Search Console data. Pick your niche and let our adult SEO
          team take it to the top. Explore our dedicated{" "}
          <span className="text-red-400 font-medium">OnlyFans SEO</span>,{" "}
          <span className="text-red-400 font-medium">cam site SEO</span>,{" "}
          <span className="text-red-400 font-medium">Chaturbate SEO</span>,{" "}
          <span className="text-red-400 font-medium">porn site SEO</span> and{" "}
          <span className="text-red-400 font-medium">erotic massage SEO</span>{" "}
          services.
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        className="relative mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {niches.map((niche, i) => (
          <div
            key={niche.title}
            style={{ transitionDelay: gridInView ? `${(i % 3) * 100 + Math.floor(i / 3) * 60}ms` : "0ms" }}
            className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2 hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(225,29,72,0.2)] ${
              gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Image */}
            <div className="relative h-36 sm:h-40 overflow-hidden">
              <img
                src={niche.img}
                alt={niche.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${niche.color} mix-blend-overlay`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-transparent to-transparent" />
            </div>

            {/* Glow ring on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-red-500/30" />

            {/* Content */}
            <div className="relative p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                {niche.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {niche.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                    <span className="mt-0.5 text-red-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}