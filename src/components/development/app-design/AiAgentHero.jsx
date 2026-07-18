import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";

// SEO keywords: "AI agent development", "custom AI chatbot development",
// "conversational AI for business", "AI customer support automation"

const checklist = [
  "Custom AI agents trained on your brand voice and data",
  "Chat, voice and workflow automation in one agent",
  "Live handoff, ticketing and CRM integrations built in",
  "Secure, compliant and fully white-label",
];

export default function AiAgentHero() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const sectionRef = useRef(null);
  const fullReply = "Sure! I can check your order status right now.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(fullReply.slice(0, i));
      if (i >= fullReply.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0510] px-6 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[420px] -translate-y-1/3 rounded-full bg-fuchsia-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] rounded-full bg-violet-600/10 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left column */}
        <div>
          <div
            className={`transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
              AI AGENT DEVELOPMENT COMPANY
            </span>
          </div>

          <h1
            className={`mt-5 text-4xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-5xl ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              AI Agent Development
            </span>{" "}
            for Modern Businesses
          </h1>

          <p
            className={`mt-6 max-w-md text-sm leading-relaxed text-gray-300 transition-all delay-150 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            We design, build and train custom AI agents — support bots, sales
            assistants and workflow automations that talk, resolve and convert
            around the clock.
          </p>

          <p
            className={`mt-4 max-w-md text-xs leading-relaxed text-gray-500 transition-all delay-200 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            From support chatbots to fully autonomous AI SaaS platforms, we're
            the AI agent development team teams call when they want
            conversational AI that actually understands their customers. You
            own the model, the data and the results.
          </p>

          <ul className="mt-6 space-y-3">
            {checklist.map((item, i) => (
              <li
                key={item}
                style={{ transitionDelay: mounted ? `${250 + i * 80}ms` : "0ms" }}
                className={`flex items-start gap-2.5 text-xs text-gray-300 transition-all duration-700 ${
                  mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-400">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all delay-500 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all duration-300 hover:shadow-fuchsia-500/40 hover:brightness-110">
              Start Building Your AI Agent
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-fuchsia-400/50 hover:text-fuchsia-300">
              Explore AI Agent Services
            </button>
          </div>
        </div>

        {/* Right column — chat mockup */}
        <div
          className={`relative transition-all delay-200 duration-700 ${
            mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
          }`}
        >
          <div className="relative rounded-2xl border-t-2 border-fuchsia-500 bg-[#140A1F] p-5 shadow-2xl shadow-fuchsia-900/20">
            {/* header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
              <div>
                <p className="text-sm font-semibold text-white">Nova AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  online now
                </p>
              </div>
            </div>

            {/* chat bubbles */}
            <div className="mt-4 space-y-3">
              <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white/5 px-3.5 py-2.5 text-xs text-gray-200">
                Hi! Can you help me track my order?
              </div>
              <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-gradient-to-r from-rose-500 to-fuchsia-500 px-3.5 py-2.5 text-xs font-medium text-white">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
            </div>

            {/* input bar */}
            <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
              <span className="flex-1 text-xs text-gray-500">
                Message Nova AI…
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fuchsia-500 text-white transition-transform duration-300 hover:scale-110">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* floating stat badges */}
          <div
            className={`absolute -top-4 -right-4 rounded-xl border border-fuchsia-500/30 bg-[#140A1F] px-4 py-2.5 shadow-lg transition-all delay-700 duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="text-sm font-bold text-rose-400">+340%</p>
            <p className="text-[10px] text-gray-500">query resolution</p>
          </div>

          <div
            className={`absolute -bottom-5 -left-5 rounded-xl border border-fuchsia-500/30 bg-[#140A1F] px-4 py-2.5 shadow-lg transition-all delay-[800ms] duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <p className="text-sm font-bold text-rose-400">24/7</p>
            <p className="text-[10px] text-gray-500">always-on support</p>
          </div>
        </div>
      </div>
    </section>
  );
}