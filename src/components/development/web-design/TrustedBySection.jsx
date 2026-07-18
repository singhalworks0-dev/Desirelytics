import React, { useEffect, useRef, useState } from "react";

/**
 * TrustedBySection.jsx
 * "Trusted by" social-proof strip — React + Tailwind CSS
 * Includes: staggered entrance animation, infinite marquee scroll,
 * hover glow, and placeholder monogram badges (swap for real client logos).
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
      { threshold: 0.2 }
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
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ---------- Placeholder Logo Badge ----------
// Stand-in for real client logos — replace `initials`/`gradient` props
// with <img src="/logos/client-x.svg" /> when real logos are available.
function LogoBadge({ initials, gradient }) {
  return (
    <div className="group relative flex-shrink-0 w-40 h-16 sm:w-44 sm:h-[70px] rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-fuchsia-500/40 hover:bg-white/[0.06] hover:-translate-y-0.5">
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${gradient}`}
      />
      <span
        className={`relative font-extrabold text-lg tracking-wide bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}
      >
        {initials}
      </span>
    </div>
  );
}

const clientBadges = [
  { initials: "VLR", gradient: "from-rose-400 to-fuchsia-500" },
  { initials: "NYX", gradient: "from-fuchsia-400 to-purple-500" },
  { initials: "LUME", gradient: "from-rose-400 to-pink-500" },
  { initials: "ORCHID", gradient: "from-purple-400 to-rose-500" },
  { initials: "VELVET", gradient: "from-pink-400 to-fuchsia-500" },
  { initials: "AFTR", gradient: "from-rose-500 to-purple-400" },
];

// Duplicate list for seamless marquee loop
const marqueeBadges = [...clientBadges, ...clientBadges];

export default function TrustedBySection() {
  return (
    <section className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-40 bg-fuchsia-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
            Trusted by adult brands, studios and creators
            <br className="hidden sm:block" /> worldwide
          </p>
        </Reveal>

        {/* Marquee row */}
        <Reveal delay={150}>
          <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4 sm:gap-5 w-max animate-marquee">
              {marqueeBadges.map((b, i) => (
                <LogoBadge key={i} {...b} />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-8 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Client logos shown on request — every engagement is NDA-backed
            and confidential.
          </p>
        </Reveal>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}