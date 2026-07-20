import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * FreeAIAuditSection.jsx
 * "Try Our Free AI Website Audit Tool" — React + Tailwind CSS
 * Light-background variant. Includes: entrance animation, input focus glow,
 * fast hover on the submit button with shine sweep, basic client-side
 * validation state (UI only — wire up to your real audit API/backend).
 */

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

export function FreeAIAuditSection() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | submitted

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setStatus("error");
      return;
    }
    // Hook this up to your real audit endpoint/backend.
    setStatus("submitted");
  };

  return (
    <section
      aria-labelledby="audit-heading"
      className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-50 py-20 px-6 sm:px-10 overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />

      <div className="relative max-w-2xl mx-auto text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-300 bg-purple-100 text-purple-600 text-[11px] font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            FREE AI TOOL
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="audit-heading"
            className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight"
          >
            Try Our Free AI Website Audit Tool for
            Adult Websites — No Signup or Paid Plan Needed
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            See where your adult site stands before you pick a package. Run
            a free AI-powered SEO audit and get a clear, prioritized fix
            list in seconds. No paid plan needed.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto rounded-full bg-white p-1.5 shadow-lg shadow-purple-200/50 border border-white focus-within:ring-2 focus-within:ring-fuchsia-400/50 transition-all duration-200"
          >
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your website URL"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none rounded-full"
            />
            <Link
              to="/free-audit"
              className="group relative flex-shrink-0 px-6 py-2.5 rounded-full font-bold text-white text-sm overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-fuchsia-500 transition-transform duration-200 group-hover:scale-105" />
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <span className="relative">Get My Free AI Audit</span>
            </Link>
          </form>
        </Reveal>

        {status === "error" && (
          <p className="mt-3 text-xs font-semibold text-rose-500">
            Please enter a website URL to continue.
          </p>
        )}
        {status === "submitted" && (
          <p className="mt-3 text-xs font-semibold text-emerald-600">
            Got it — connect this form to your audit backend to show real
            results here.
          </p>
        )}

        <Reveal delay={400}>
          <p className="mt-4 text-xs text-slate-500">
            100% free. No credit card, no paid plan, no catch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default FreeAIAuditSection;