import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Send, MessageCircle } from "lucide-react";

// Inline brand icons (lucide-react no longer ships these)
const Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const Twitter = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-6.9l-5.4-6.6L4.7 22H1.6l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96V21h-4V9Z" />
  </svg>
);

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const linkColumns = [
    {
      title: "Services",
      links: [
        { label: "SEO Strategy", href: "#" }, // TODO: no matching page yet
        { label: "Local SEO", href: "#" }, // TODO: no dedicated page yet
        { label: "Content SEO", href: "#" }, // TODO: no matching page yet
        { label: "Niche SEO", href: "/services/niche-ecommerce-seo" }, // closest match — confirm
        { label: "Platform SEO", href: "/services/platform-seo" },
        { label: "Industry SEO", href: "#" }, // TODO: no matching page yet
        { label: "Reputation SEO", href: "#" }, // TODO: no matching page yet
        { label: "Category SEO", href: "/services/category-seo" },
        { label: "Site Migration SEO", href: "#" }, // TODO: no matching page yet
        { label: "Marketplace SEO", href: "/services/marketplace-seo" },
        { label: "eCommerce SEO", href: "/services/niche-ecommerce-seo" }, // closest match — confirm
        { label: "Retail SEO", href: "/services/retail-seo" },
        { label: "AI Platform SEO", href: "/services/ai-companion-seo" }, // closest match — confirm
        { label: "Affiliate SEO", href: "/services/affiliate-seo" },
        { label: "Programmatic SEO", href: "/services/programmatic-seo" },
      ],
    },
    {
      title: "Growth & Marketing",
      links: [
        { label: "Link Building", href: "/services/link-building" },
        { label: "Media Buying", href: "#" }, // TODO: no matching page yet
        { label: "PPC & Paid Ads", href: "#" }, // TODO: no matching page yet
        { label: "Content Marketing", href: "/services/content-marketing" },
        { label: "Social Marketing", href: "#" }, // TODO: no matching page yet
        { label: "Email Marketing", href: "#" }, // TODO: no matching page yet
        { label: "Conversion (CRO)", href: "#" }, // TODO: no matching page yet
        { label: "Reputation Mgmt", href: "#" }, // TODO: no matching page yet
        { label: "Penalty Recovery", href: "#" }, // TODO: no matching page yet
        { label: "Web Design & Dev", href: "/development/web-design" },
        { label: "AI Agent Development", href: "/development/ai-agents" },
      ],
    },
    {
      title: "Locations",
      // TODO: no location-specific pages exist yet — all placeholders
      links: [
        { label: "United Kingdom", href: "#" },
        { label: "United States", href: "#" },
        { label: "India", href: "#" },
        { label: "Australia", href: "#" },
        { label: "Canada", href: "#" },
        { label: "Europe", href: "#" },
        { label: "Germany", href: "#" },
        { label: "Dubai & UAE", href: "#" },
        { label: "Netherlands", href: "#" },
        { label: "Singapore", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about", anchor: true }, // needs id="about" on MeetTheTeam.jsx
        { label: "Our Process", href: "/#process", anchor: true }, // needs id="process" on FullLifecycleStrategy.jsx
        { label: "Pricing", href: "/#pricing", anchor: true }, // needs id="pricing" on Pricing.jsx (home section)
        { label: "Case Studies", href: "/case-studies" },
        { label: "Testimonials", href: "/#testimonials", anchor: true }, // needs id="testimonials" on ClientStories.jsx
        { label: "Blogs", href: "/#blog", anchor: true }, // needs id="blog" on BlogInsights.jsx
        { label: "Q&A", href: "/#faq", anchor: true }, // needs id="faq" on FAQ.jsx
        { label: "Free SEO Audit", href: "/free-audit" },
        { label: "Free Tools", href: "#" }, // TODO: no matching page yet
        { label: "Careers", href: "#" }, // TODO: no matching page yet
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const badges = ["Specialist Team", "100% Confidential", "NDA on Request", "Risk-Free"];
  const socials = [Facebook, Twitter, Send, Linkedin];

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#1a0b2e] via-[#150a26] to-[#0a0710] px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24"
    >
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-16 left-1/4 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-purple-700/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Top: Company info + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
          {/* Company info */}
          <div className={reveal()} style={style(0)}>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Desirelyticss
            </h3>
            <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Specialist SEO & Digital Marketing for Modern Brands
            </p>
            <p className="mt-4 max-w-md text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
              Risk-safe, fully confidential SEO that wins rankings in
              Google and AI search.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                <MapPin className="h-4 w-4 shrink-0 text-red-500" />
                20900 NE 30th Avenue, 8th Floor, Aventura, FL 33180, Miami, USA
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                <Mail className="h-4 w-4 shrink-0 text-red-500" />
                sales@desirelyticss.com
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                <Phone className="h-4 w-4 shrink-0 text-red-500" />
                +1 929 230 1231
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-gray-300 transition-all hover:border-red-500/40 hover:text-white hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-3 py-1 text-[10px] sm:text-[11px] font-medium text-gray-300"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter / Audit card */}
          <div className={reveal()} style={style(150)}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                Get Your Free 30-Point Audit
              </h4>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-400">
                Actionable wins for your platform — plus monthly SEO
                insights straight to your inbox.
              </p>

              <Link
                to="/free-audit"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)] transition-all hover:shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Free Audit
              </Link>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-red-500/40"
                />
                <button className="shrink-0 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-12 sm:mt-16 border-t border-white/10 ${reveal()}`}
          style={style(250)}
        />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 sm:py-16">
          {linkColumns.map((col, i) => (
            <div key={col.title} className={reveal()} style={style(300 + i * 100)}>
              <h5 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                {col.title}
              </h5>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) =>
                  link.anchor ? (
                    // Same-page section link — needs matching id="" on the target component
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-red-400 hover:to-purple-400 hover:bg-clip-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-xs sm:text-sm text-gray-400 transition-colors hover:text-transparent hover:bg-gradient-to-r hover:from-red-400 hover:to-purple-400 hover:bg-clip-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div
        className={`relative mx-auto max-w-6xl border-t border-white/10 pt-6 sm:pt-8 ${reveal()}`}
        style={style(700)}
      >
        <h2 className="select-none text-center font-sans text-[13vw] sm:text-[10vw] md:text-[8vw] font-black leading-none text-gray-300/90 whitespace-nowrap overflow-hidden">
          Desirelyticss
        </h2>
      </div>

      {/* Bottom bar */}
      <div
        className={`relative mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 py-6 text-[10px] sm:text-[11px] text-gray-500 ${reveal()}`}
        style={style(800)}
      >
        <span>© 2026 Desirelyticss · Est. 2023. All rights reserved.</span>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Disclaimer</a>
          <a href="#" className="hover:text-gray-300 transition-colors">DMCA</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
        </div>

        <span>Global · English</span>
      </div>

      {/* Floating chat buttons */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
        <a
          href="#"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href="#"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110"
        >
          <Send className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}