import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const SEO_SERVICES = [
  { label: "Platform SEO", href: "/services/platform-seo" },
  { label: "Streaming Site SEO", href: "/services/streaming-site-seo" },
  { label: "Live Content SEO", href: "/services/live-content-seo" },
  { label: "Marketplace SEO", href: "/services/marketplace-seo" },
  { label: "Category SEO", href: "/services/category-seo" },
  { label: "Directory SEO", href: "/services/directory-seo" },
  { label: "Local Reach SEO", href: "/services/local-reach-seo" },
  { label: "Niche eCommerce SEO", href: "/services/niche-ecommerce-seo" },
  { label: "Retail SEO", href: "/services/retail-seo" },
  { label: "AI Companion SEO", href: "/services/ai-companion-seo" },
  { label: "Affiliate SEO", href: "/services/affiliate-seo" },
  { label: "Link Building", href: "/services/link-building" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Programmatic SEO", href: "/services/programmatic-seo" },
];

// TODO: these local pages don't have routes/components yet — update hrefs once created
const LOCAL_SEO = [
  { label: "SEO in UK", href: "#" },
  { label: "SEO in Dubai", href: "#" },
  { label: "SEO in Portugal", href: "#" },
  { label: "SEO in USA", href: "#" },
  { label: "SEO in Australia", href: "#" },
  { label: "SEO in Germany", href: "#" },
];

const DEVELOPMENT = [
  { label: "Website Development", href: "/development/web-design" },
  { label: "App Development", href: "/development/app-development" },
  { label: "Adult Website Development", href: "/development/ai-agents" },
];

const NAV_LINKS = [
  { label: "SEO Services", type: "mega", items: SEO_SERVICES },
  { label: "Local SEO", type: "list", items: LOCAL_SEO },
  { label: "Development", type: "simple", items: DEVELOPMENT },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
  };

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
    }`;

  const dropdownLinkClass =
    "block rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-gray-300 transition-colors hover:bg-white/[0.05] hover:text-transparent hover:bg-gradient-to-r hover:from-red-400 hover:to-purple-400 hover:bg-clip-text";

  return (
    <header className={`sticky top-0 z-[100] w-full ${reveal()}`}>
      <div className="h-[3px] w-full bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500" />

      <nav
        ref={navRef}
        className="relative flex items-center justify-between gap-6 bg-[#0a0710]/95 backdrop-blur-md border-b border-white/10 px-5 py-3.5 md:px-8"
      >
        <div className="pointer-events-none absolute -top-8 left-10 h-24 w-24 rounded-full bg-red-600/10 blur-3xl" />

        <Link
          to="/"
          className="relative flex items-center gap-1 whitespace-nowrap text-lg sm:text-xl font-extrabold tracking-tight text-white"
        >
          Desire
          <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            lytics
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="relative flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-0.5 w-full rounded bg-white transition-transform duration-200 ${
              mobileOpen ? "translate-y-[7px] rotate-45 !bg-red-400" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full rounded bg-white transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full rounded bg-white transition-transform duration-200 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45 !bg-purple-400" : ""
            }`}
          />
        </button>

        <div
          className={`
            flex-1 flex-col items-start gap-0 overflow-hidden bg-[#0a0710] border-b border-white/10
            transition-[max-height] duration-300 ease-in-out
            md:static md:flex md:max-h-none md:flex-row md:items-center md:justify-end md:gap-7 md:overflow-visible md:border-none md:bg-transparent
            fixed left-0 right-0 top-[63px]
            ${mobileOpen ? "flex max-h-[80vh] overflow-y-auto px-6 pb-6 pt-3" : "hidden max-h-0"}
          `}
        >
          <ul className="flex w-full list-none flex-col gap-1 md:w-auto md:flex-row md:items-center md:gap-7">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className="relative w-full md:w-auto"
                onMouseEnter={() => link.items && handleEnter(link.label)}
                onMouseLeave={() => link.items && handleLeave()}
              >
                {link.items ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      className={`flex w-full items-center justify-between gap-1.5 py-3 text-xs sm:text-sm font-semibold transition-colors md:w-auto md:justify-start md:py-2 ${
                        openDropdown === link.label
                          ? "text-transparent bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`h-1.5 w-2.5 text-red-500 transition-transform duration-200 ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* MEGA MENU */}
                    {link.type === "mega" && (
                      <div
                        className={`
                          md:absolute md:left-1/2 md:top-full md:-translate-x-1/2 md:pt-3 md:w-[560px]
                          md:transition-all md:duration-250
                          ${
                            openDropdown === link.label
                              ? "block md:visible md:opacity-100"
                              : "hidden md:invisible md:opacity-0"
                          }
                          mb-2 w-full md:mb-0
                        `}
                      >
                        <div className="md:rounded-2xl md:border md:border-white/10 md:bg-[#120c1e] md:p-6 md:shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 md:gap-y-1.5 list-none">
                            {link.items.map((item) => (
                              <li key={item.label}>
                                <Link to={item.href} className={dropdownLinkClass}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 hidden md:block border-t border-white/10 pt-3">
                            <Link
                              to="/seo-services"
                              className="text-xs font-semibold text-red-400 hover:text-red-300"
                            >
                              View all services →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* LIST MENU */}
                    {link.type === "list" && (
                      <div
                        className={`
                          md:absolute md:left-0 md:top-full md:pt-3 md:min-w-[220px]
                          md:transition-all md:duration-250
                          ${
                            openDropdown === link.label
                              ? "block md:visible md:opacity-100"
                              : "hidden md:invisible md:opacity-0"
                          }
                          mb-2 w-full md:mb-0 md:w-auto
                        `}
                      >
                        <div className="md:rounded-xl md:border md:border-white/10 md:bg-[#120c1e] md:p-2 md:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                          <ul className="list-none">
                            {link.items.map((item) => (
                              <li key={item.label}>
                                <Link to={item.href} className={dropdownLinkClass}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* SIMPLE MENU */}
                    {link.type === "simple" && (
                      <div
                        className={`
                          md:absolute md:left-0 md:top-full md:pt-3 md:min-w-[240px]
                          md:transition-all md:duration-250
                          ${
                            openDropdown === link.label
                              ? "block md:visible md:opacity-100"
                              : "hidden md:invisible md:opacity-0"
                          }
                          mb-2 w-full md:mb-0 md:w-auto
                        `}
                      >
                        <div className="md:rounded-xl md:border md:border-white/10 md:bg-[#120c1e] md:p-2 md:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                          <ul className="list-none">
                            {link.items.map((item) => (
                              <li key={item.label}>
                                <Link to={item.href} className={dropdownLinkClass}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className="block w-full py-3 text-xs sm:text-sm font-semibold text-gray-300 transition-colors hover:text-white md:w-auto md:py-2"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex w-full flex-col items-stretch gap-2.5 md:mt-0 md:w-auto md:flex-row md:items-center">
            <Link
              to="/free-audit"
              className="flex flex-col items-center justify-center rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-5 py-2 font-bold text-white transition-all hover:border-red-500/50 hover:scale-[1.02]"
            >
              <span className="text-xs sm:text-sm leading-tight bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                Get Free Audit
              </span>
              <span className="text-[9px] font-bold tracking-wide text-gray-500">
                NO SIGNUP NEEDED
              </span>
            </Link>
            <Link
              to="/contact"
              className="rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_10px_40px_rgba(225,29,72,0.25)] transition-all hover:shadow-[0_10px_40px_rgba(225,29,72,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}