import React, { useEffect, useRef, useState } from "react";

/**
 * ReadyToLaunchSection.jsx
 * "Ready-to-Launch Adult Clones & Scripts" section — React + Tailwind CSS
 * Includes: entrance animations, hover-elevate cards with glow border,
 * image zoom on hover, SEO-friendly semantic markup, placeholder mockups.
 *
 * NOTE: Card titles use descriptive platform categories rather than
 * competitors' trademarked brand names, to avoid trademark/legal risk
 * in marketing copy that sells "clone" products. Swap in your own
 * screenshots via the `img` prop when ready.
 */

// ---------- Scroll Reveal Hook ----------
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- Placeholder Preview Graphic ----------
function ClonePreview({ gradient, icon }) {
  return (
    <div
      className={`relative h-44 sm:h-48 rounded-t-xl overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105`}
    >
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_25%_25%,white,transparent_40%)]" />
      <div className="absolute top-3 left-3 flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/50" />
        <span className="w-2 h-2 rounded-full bg-white/50" />
        <span className="w-2 h-2 rounded-full bg-white/50" />
      </div>
      <span className="text-5xl drop-shadow-lg">{icon}</span>
    </div>
  );
}

const clones = [
  {
    icon: "💳",
    gradient: "from-sky-500 to-indigo-600",
    title: "Creator Subscription Platform",
    desc: "A creator subscription platform of your own — profiles, paywalls, PPV messaging, tips and payouts, fully branded and built to scale.",
  },
  {
    icon: "🎬",
    gradient: "from-emerald-600 to-teal-700",
    title: "Tube & Streaming Platform",
    desc: "A full adult tube platform — video hosting, transcoding, categories, channels, ads and memberships, engineered for millions of views with AI-powered content tagging.",
  },
  {
    icon: "👣",
    gradient: "from-pink-400 to-rose-500",
    title: "Niche Content Marketplace",
    desc: "A niche content marketplace with verified sellers, secure payments, chat and ratings — optimized with AI-driven search ranking.",
  },
  {
    icon: "📼",
    gradient: "from-lime-500 to-green-600",
    title: "Large-Scale Tube Site",
    desc: "Massive-scale tube sites with HD streaming, AI-powered recommendations, tagging, global CDNs and ad monetization built in.",
  },
  {
    icon: "🔴",
    gradient: "from-cyan-500 to-blue-600",
    title: "Live Cam Platform",
    desc: "Live cam platforms with WebRTC HD streaming, token tipping, private shows, model dashboards and real-time chat.",
  },
  {
    icon: "❤️",
    gradient: "from-red-600 to-rose-700",
    title: "Dating & Classifieds Platform",
    desc: "Adult dating and classified directories with geo-search, profile verification, secure messaging and AI-optimized lead monetization.",
  },
];

function CloneCard({ icon, gradient, title, desc, delay }) {
  return (
    <Reveal delay={delay}>
      <article className="group relative rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-fuchsia-900/30 hover:border-fuchsia-500/40">
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-gradient-to-r from-fuchsia-500/30 to-rose-500/30" />

        <div className="overflow-hidden">
          <ClonePreview gradient={gradient} icon={icon} />
        </div>

        <div className="p-5">
          <h3 className="text-base sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-fuchsia-400">
            {title}
          </h3>
          <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-slate-400">
            {desc}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export default function ReadyToLaunchSection() {
  return (
    <section
      aria-labelledby="ready-to-launch-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            LAUNCH FASTER
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="ready-to-launch-heading"
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
          >
            Ready-to-Launch Adult
            <br />
            Platform Scripts
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
            Want a proven model without building from scratch? Launch a
            fully custom, scalable platform inspired by what already
            dominates the adult industry — branded as your own, owned 100%
            by you, and optimized with AI-powered SEO to outperform the
            competition.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clones.map((c, i) => (
            <CloneCard key={c.title} {...c} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}