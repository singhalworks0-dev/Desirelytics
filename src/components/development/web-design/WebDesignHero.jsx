import React, { useEffect, useRef, useState } from "react";

/**
 * AdultDevLanding.jsx
 * Responsive landing page — React + Tailwind CSS
 * Includes: scroll/entrance animations, basic on-page SEO (title, meta, JSON-LD),
 * and placeholder mockup graphics (swap with your own real screenshots).
 */

// ---------- SEO Hook ----------
function useSEO({ title, description, keywords }) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");

    // Open Graph
    const setOG = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setOG("og:title", title);
    setOG("og:description", description);
    setOG("og:type", "website");

    // JSON-LD structured data for a service business
    let script = document.getElementById("ld-json-seo");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "ld-json-seo";
      document.head.appendChild(script);
    }
    script.innerText = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "SecureLaunch Studio",
      description,
      areaServed: "Worldwide",
      serviceType: "Web & App Development",
    });
  }, [title, description, keywords]);
}

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

// ---------- Placeholder "App Mockup" Graphic ----------
// Stand-in for real screenshots — swap with <img src="/your-image.jpg" /> later.
function AppMockup({ gradient, label, tall = false }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 ${
        tall ? "h-64" : "h-40"
      } bg-gradient-to-br ${gradient} flex flex-col justify-between p-4`}
    >
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-2/3 rounded bg-white/50" />
        <div className="h-2 w-1/2 rounded bg-white/30" />
      </div>
      <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

const mockups = [
  { gradient: "from-rose-600 to-fuchsia-700", label: "Discovery Feed" },
  { gradient: "from-fuchsia-700 to-purple-800", label: "Creator Profile", tall: true },
  { gradient: "from-red-600 to-rose-800", label: "Gallery Grid" },
  { gradient: "from-purple-700 to-pink-600", label: "Subscriptions" },
  { gradient: "from-rose-700 to-red-900", label: "Live Stream", tall: true },
  { gradient: "from-pink-600 to-fuchsia-800", label: "Chat & Messaging" },
];

const features = [
  { title: "Adult web & mobile app development", icon: "💻" },
  { title: "Secure video and content management", icon: "🔒" },
  { title: "Subscription, paywall & token features", icon: "💳" },
  { title: "Privacy, age-gate & 2257 compliance", icon: "🛡️" },
];

export default function AdultDevLanding() {
  useSEO({
    title: "SecureLaunch Studio | Age-Verified Platform Development",
    description:
      "SecureLaunch Studio builds secure, compliant creator-platform websites and apps — custom payments, content protection, and scalable media infrastructure from concept to launch.",
    keywords:
      "platform development agency, creator platform development, subscription app development, secure content management, age verification compliance",
  });

  return (
    <div className="min-h-screen bg-[#0a0612] text-white overflow-x-hidden">
      {/* ---------- HERO ---------- */}
      <section className="relative px-6 sm:px-10 lg:px-20 pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute top-40 right-0 w-72 h-72 bg-rose-600/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
                Creator Platform
              </span>
              <br />
              <span className="text-white">Development Studio</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              SecureLaunch Studio is a specialist agency for creator and
              subscription platforms. We build custom websites and mobile
              apps — secure payments, privacy tooling, and scalable media
              architecture — with full-service delivery from concept to
              launch.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-8 space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-600/20 text-rose-400 text-sm">
                    ✓
                  </span>
                  {f.title}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-fuchsia-600 font-semibold hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-fuchsia-900/40">
                Get a Free Consultation
              </button>
              <button className="px-6 py-3 rounded-full border border-white/20 font-semibold hover:bg-white/5 transition-colors">
                View Our Work
              </button>
            </div>
          </Reveal>
        </div>

        {/* Mockup grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4">
          {mockups.map((m, i) => (
            <Reveal key={i} delay={i * 100} className={i % 3 === 1 ? "row-span-2" : ""}>
              <AppMockup {...m} />
            </Reveal>
          ))}
          <Reveal delay={600} className="col-span-3">
            <div className="mt-2 inline-flex items-center gap-3 bg-black/40 backdrop-blur rounded-xl px-5 py-3 border border-white/10">
              <span className="text-2xl font-extrabold text-rose-500">120+</span>
              <span className="text-sm text-slate-300 leading-tight">
                Platforms
                <br />
                designed, built &amp; launched
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="px-6 sm:px-10 lg:px-20 py-20 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            What We Build
          </h2>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "Custom Platforms", d: "Bespoke web apps tailored to your brand and community." },
            { t: "Secure Payments", d: "PCI-aware billing, subscriptions, and token economies." },
            { t: "Content Protection", d: "Watermarking, DRM-style delivery, and access control." },
            { t: "Compliance & Age Gates", d: "Built-in verification and regulatory-ready workflows." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-fuchsia-500/40 hover:-translate-y-1 transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-600 to-fuchsia-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-6 sm:px-10 lg:px-20 py-20">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-rose-700/30 to-fuchsia-800/30 rounded-3xl border border-white/10 p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to launch your platform?
            </h2>
            <p className="mt-3 text-slate-300">
              Tell us about your project and we'll map out a build plan —
              free, no obligation.
            </p>
            <button className="mt-8 px-8 py-3 rounded-full bg-white text-[#0a0612] font-semibold hover:scale-105 active:scale-95 transition-transform">
              Start Your Project
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 sm:px-10 lg:px-20 py-10 text-center text-slate-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} SecureLaunch Studio. All rights reserved.
      </footer>
    </div>
  );
}