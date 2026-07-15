import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const STATS = [
  { value: "120+", label: "Platforms launched" },
  { value: "AI-Native", label: "Content & chat systems" },
  { value: "2257", label: "Compliance built-in" },
];

// Swap these for your own platform screenshots
const GALLERY = [
  { src: "/images/adult-dev/shot-1.jpg", className: "row-span-2" },
  { src: "/images/adult-dev/shot-2.jpg", className: "" },
  { src: "/images/adult-dev/shot-3.jpg", className: "" },
  { src: "/images/adult-dev/shot-4.jpg", className: "" },
  { src: "/images/adult-dev/shot-5.jpg", className: "row-span-2" },
  { src: "/images/adult-dev/shot-6.jpg", className: "" },
];

export default function AdultDevHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-500 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0710] via-[#120c1e] to-[#0a0710] px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-14 sm:pb-16">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-24 left-10 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-purple-700/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        {/* LEFT: Copy */}
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3.5 py-1.5 text-[11px] font-semibold text-gray-300 ${reveal()}`} style={style(0)}>
            <Sparkles className="h-3.5 w-3.5 text-red-400" />
            AI-Powered Adult Platform Development
          </div>

          <h1 className={`mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] ${reveal()}`} style={style(60)}>
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Adult Website
            </span>
            <br />
            <span className="text-white">Development, Built with AI</span>
          </h1>

          <p className={`mt-4 max-w-lg text-sm sm:text-base text-gray-400 leading-relaxed ${reveal()}`} style={style(120)}>
            Custom adult platforms and apps with AI-driven moderation,
            personalization, and companion chat — secure, compliant, and
            built to convert.
          </p>

          <div className={`mt-6 flex flex-col sm:flex-row gap-3 ${reveal()}`} style={style(180)}>
            <Link
              to="/contact"
              className="rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-7 py-3 text-center text-sm font-bold text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)] transition-all hover:shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Start a Project
            </Link>
            <Link
              to="/case-studies"
              className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition-all hover:border-white/30 hover:bg-white/[0.04]"
            >
              View What We Build
            </Link>
          </div>

          {/* Stat row — replaces old checklist */}
          <div className={`mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 ${reveal()}`} style={style(240)}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-lg sm:text-xl font-black text-transparent">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[10px] sm:text-[11px] text-gray-500 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image collage */}
        <div className={`relative ${reveal()}`} style={style(140)}>
          <div className="grid grid-cols-3 auto-rows-[100px] sm:auto-rows-[120px] gap-2.5">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/40 to-purple-950/40 ${img.className}`}
              >
                <img
                  src={img.src}
                  alt="Adult platform built by Desirelyticss"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}