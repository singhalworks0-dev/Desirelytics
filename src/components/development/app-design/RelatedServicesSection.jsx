import React, { useEffect, useRef, useState } from "react";

/**
 * RelatedServicesSection.jsx
 * "Related Adult SEO Services" internal-linking block — React + Tailwind CSS
 * Includes: entrance animation, animated underline + color hover on each link,
 * real <a> tags for crawlable internal linking (strong on-page SEO signal).
 *
 * NOTE: Replace `href="#"` with your real internal page URLs — this block's
 * SEO value comes specifically from linking to live, indexable service pages.
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

// ---------- Animated Internal Link ----------
function ServiceLink({ href = "#", children }) {
  return (
    <a
      href={href}
      className="relative inline-block font-semibold text-rose-400 transition-colors duration-300 hover:text-fuchsia-300
        after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0
        after:bg-gradient-to-r after:from-rose-400 after:to-fuchsia-400 after:transition-transform after:duration-300
        hover:after:scale-x-100"
    >
      {children}
    </a>
  );
}

export default function RelatedServicesSection() {
  return (
    <section
      aria-labelledby="related-services-heading"
      className="relative bg-[#0a0612] py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-52 bg-rose-700/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            EXPLORE MORE
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="related-services-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          >
            Related Adult SEO Services
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-slate-400 text-sm sm:text-[15px] leading-relaxed">
            We rank every corner of the adult industry. Explore our{" "}
            <ServiceLink href="/onlyfans-seo">OnlyFans SEO</ServiceLink>,{" "}
            <ServiceLink href="/cam-site-seo">cam site SEO</ServiceLink>,{" "}
            <ServiceLink href="/chaturbate-seo">Chaturbate SEO</ServiceLink>,{" "}
            <ServiceLink href="/porn-site-seo">porn site SEO</ServiceLink>,{" "}
            <ServiceLink href="/adult-entertainment-seo">
              adult entertainment SEO
            </ServiceLink>
            , <ServiceLink href="/adult-dating-seo">adult dating SEO</ServiceLink>,{" "}
            <ServiceLink href="/foot-fetish-seo">foot fetish SEO</ServiceLink>{" "}
            and <ServiceLink href="/erotic-massage-seo">erotic massage SEO</ServiceLink>{" "}
            services.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-5 text-slate-400 text-sm sm:text-[15px] leading-relaxed">
            Building a product? See our{" "}
            <ServiceLink href="/adult-ecommerce-seo">
              adult eCommerce SEO
            </ServiceLink>
            ,{" "}
            <ServiceLink href="/adult-toy-store-seo">
              adult toy store SEO
            </ServiceLink>{" "}
            and{" "}
            <ServiceLink href="/adult-website-development">
              adult website development
            </ServiceLink>{" "}
            services, or compare{" "}
            <ServiceLink href="/pricing">
              adult SEO packages &amp; pricing
            </ServiceLink>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}