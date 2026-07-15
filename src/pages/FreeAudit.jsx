import { useEffect, useState } from "react";
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Gauge } from "lucide-react";

const TRUST_TAGS = ["No signup needed", "No paid plan", "Real PageSpeed data", "Instant report"];

const SCORE_META = [
  { key: "performance", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best Practices" },
];

function scoreColor(score) {
  if (score >= 90) return { ring: "#22c55e", text: "text-emerald-400" };
  if (score >= 50) return { ring: "#f59e0b", text: "text-amber-400" };
  return { ring: "#ef4444", text: "text-red-400" };
}

function ScoreRing({ score, label }) {
  const { ring, text } = scoreColor(score);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={ring}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-black ${text}`}>
          {score}
        </div>
      </div>
      <span className="text-[11px] sm:text-xs font-semibold text-gray-300 text-center">{label}</span>
    </div>
  );
}

export default function FreeAuditTool() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-500 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    let target = url.trim();
    if (!/^https?:\/\//i.test(target)) target = `https://${target}`;
    try {
      new URL(target);
    } catch {
      setError("Please enter a valid website URL.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong running the audit.");
        return;
      }

      setResult(data);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong running the audit. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,#fff_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white ${reveal()}`} style={style(0)}>
          <Sparkles className="h-3.5 w-3.5" />
          Free AI Tool
        </div>

        <h2 className={`mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-white ${reveal()}`} style={style(60)}>
          Free Adult Website SEO Audit
        </h2>

        <p className={`mt-4 text-sm sm:text-base text-white/85 leading-relaxed ${reveal()}`} style={style(120)}>
          Run a free, instant SEO audit powered by Google PageSpeed Insights.
          Get real performance, SEO, and accessibility scores — plus a
          prioritized list of fixes — in seconds.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`mt-8 flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl sm:rounded-full bg-white p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${reveal()}`}
          style={style(180)}
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your website URL"
            className="flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Gauge className="h-4 w-4" />
                Run My Free Audit
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-red-100">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className={`mt-6 flex flex-wrap items-center justify-center gap-2.5 ${reveal()}`} style={style(240)}>
          {TRUST_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* RESULTS */}
        {status === "success" && result && (
          <div className="mt-10 animate-[fadeIn_0.5s_ease-out] rounded-2xl border border-white/20 bg-[#120c1e]/95 p-6 sm:p-8 text-left shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <p className="truncate text-xs text-gray-500">
              Results for <span className="text-gray-300">{result.finalUrl || result.url}</span>
            </p>

            {/* Score rings */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-b border-white/10 pb-6">
              {SCORE_META.map((s) => (
                <ScoreRing key={s.key} score={result.scores[s.key]} label={s.label} />
              ))}
            </div>

            {/* Core Web Vitals */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "LCP", value: result.metrics.lcp },
                { label: "CLS", value: result.metrics.cls },
                { label: "FCP", value: result.metrics.fcp },
                { label: "Total Blocking Time", value: result.metrics.tbt },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                    {m.label}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-200">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Issues found */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-white">
                {result.issues.length > 0
                  ? `${result.issues.length} issue${result.issues.length > 1 ? "s" : ""} found`
                  : "No major SEO issues found"}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {result.issues.length > 0 ? (
                  result.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span>
                        <span className="font-semibold text-gray-200">{issue.title}</span>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    Your core SEO fundamentals look solid.
                  </li>
                )}
              </ul>
            </div>

            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-500">
              Want the full 176-point breakdown with a prioritized action
              plan?{" "}
              <a href="/contact" className="font-semibold text-red-400 hover:text-red-300">
                Talk to our team →
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}