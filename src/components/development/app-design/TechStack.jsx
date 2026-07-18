import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

// SEO keywords: "AI marketing tech stack", "SEO automation tools",
// "AI content generation stack", "marketing analytics infrastructure"

const stackGroups = [
  {
    label: "AI & Machine Learning",
    tags: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "LangChain",
      "LlamaIndex",
      "GPT-4",
      "Claude",
      "Stable Diffusion",
      "Whisper",
      "RAG & Vector Search",
    ],
  },
  {
    label: "Backend & Infrastructure",
    tags: [
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "Pinecone",
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "Cloudflare",
    ],
  },
  {
    label: "Frontend & Reporting",
    tags: ["React", "Next.js", "Tailwind CSS", "D3.js", "Chart.js"],
  },
  {
    label: "SEO, Analytics & Compliance",
    tags: [
      "Google Search Console",
      "GA4",
      "Ahrefs API",
      "Semrush API",
      "Schema.org",
      "GDPR & CCPA",
    ],
  },
];

export default function TechStack() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0510] px-6 py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-fuchsia-600/15 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Eyebrow */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-fuchsia-300">
            <Sparkles className="h-3 w-3" />
            BUILT WITH
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`mx-auto mt-5 max-w-2xl text-center text-3xl font-bold leading-tight text-white transition-all delay-100 duration-700 sm:text-4xl ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Our{" "}
          <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            AI Marketing
          </span>{" "}
          Tech Stack
        </h2>

        {/* Subcopy */}
        <p
          className={`mx-auto mt-4 max-w-2xl text-center text-sm text-gray-400 transition-all delay-150 duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          Modern, scalable and built for growth. We run on a battle-tested AI
          and engineering stack so your campaigns are fast, reliable and
          ready to scale.
        </p>

        {/* Stack groups */}
        <div className="mt-12 space-y-10">
          {stackGroups.map((group, gi) => (
            <div
              key={group.label}
              style={{ transitionDelay: mounted ? `${150 + gi * 100}ms` : "0ms" }}
              className={`transition-all duration-700 ${
                mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <h3 className="text-sm font-semibold text-white">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {group.tags.map((tag, ti) => (
                  <span
                    key={tag}
                    style={{
                      transitionDelay: mounted
                        ? `${200 + gi * 100 + ti * 30}ms`
                        : "0ms",
                    }}
                    className={`rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-gray-300 transition-all duration-500 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-fuchsia-300 ${
                      mounted
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}