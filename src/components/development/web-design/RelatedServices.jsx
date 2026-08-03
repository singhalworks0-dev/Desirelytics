import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

// Internal-linking / SEO section: swap the href values below for your real
// service page URLs. Each link is a keyword-rich anchor for topical SEO.

const serviceLinks = [
  { label: "web app development", href: "/development/app-development" },
  { label: "SaaS platform development", href: "/development/adult-website-development" },
  { label: "marketplace development", href: "/services/marketplace-seo" },
  { label: "subscription platform development", href: "/services/retail-seo" },
  { label: "streaming platform development", href: "/services/streaming-site-seo" },
  { label: "booking platform development", href: "/services/live-content-seo" },
  { label: "custom CMS development", href: "/services/platform-seo" },
  { label: "API integration services", href: "/contact" },
];

const ecommerceLinks = [
  { label: "eCommerce website development", href: "/services/retail-seo" },
  { label: "online store development", href: "/services/marketplace-seo" },
  { label: "web development packages & pricing", href: "/pricing" },
];

export default function RelatedServices() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const renderLinks = (links, endText) => (
    <>
      {links.map((link, i) => (
        <span key={link.label}>
          <Link
            to={link.href}
            className="font-medium text-rose-400 transition-colors duration-300 hover:text-rose-300"
          >
            {link.label}
          </Link>
          {i < links.length - 1 ? ", " : " "}
        </span>
      ))}
      {endText}
    </>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#0F0F14] px-6 py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-rose-300">
            <Sparkles className="h-3 w-3" />
            EXPLORE MORE
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mt-5 text-2xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-3xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Related Web Development Services
        </h2>

        {/* Paragraph 1 */}
        <p
          className={`mt-6 text-sm leading-relaxed text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          We build for every corner of the digital economy. Explore our{" "}
          {renderLinks(serviceLinks, "services.")}
        </p>

        {/* Paragraph 2 */}
        <p
          className={`mt-4 text-sm leading-relaxed text-gray-400 transition-all delay-200 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Selling products? See our {renderLinks(ecommerceLinks, "")}or compare{" "}
          <Link
            to="/pricing"
            className="font-medium text-rose-400 transition-colors duration-300 hover:text-rose-300"
          >
            packages &amp; pricing
          </Link>
          .
        </p>
      </div>
    </section>
  );
}