import { useEffect, useState } from "react";
import { Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    quote:
      "They built our subscription platform in eight weeks, payments and all. We launched on time and hit profitability faster than we dreamed.",
    name: "Founder",
    company: "Creator Subscription Startup",
    highlight: true,
  },
  {
    quote:
      "Other agencies ghosted us on the hard parts. This team solved our high-risk payments and shipped a streaming platform that scales beautifully.",
    name: "CEO",
    company: "Live Streaming Platform",
    highlight: false,
  },
  {
    quote:
      "Fast, professional and genuinely expert. Our online store looks premium, loads instantly and converts far better than the old site.",
    name: "Owner",
    company: "eCommerce Brand",
    highlight: false,
  },
];

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0F] px-6 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-rose-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-rose-300">
            <Sparkles className="h-3 w-3" />
            CLIENT STORIES
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          What Founders Say{" "}
          <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
            About Us
          </span>
        </h2>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name + i}
              style={{ transitionDelay: mounted ? `${150 + i * 120}ms` : "0ms" }}
              className={`group relative rounded-2xl border p-7 transition-all duration-700 hover:-translate-y-1 ${
                t.highlight
                  ? "border-rose-500/50 bg-white/[0.04] shadow-[0_0_30px_-10px_rgba(244,63,94,0.35)]"
                  : "border-white/10 bg-white/[0.02]"
              } hover:border-rose-400/60 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Quote className="h-5 w-5 text-rose-400/60 transition-colors duration-500 group-hover:text-rose-400" />

              <p className="mt-4 text-sm italic leading-relaxed text-gray-300">
                {t.quote}
              </p>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold text-white transition-colors duration-500 group-hover:text-rose-300">
                  {t.name}
                </p>
                <p className="text-xs text-rose-300/70">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}