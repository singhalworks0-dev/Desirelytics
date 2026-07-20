import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogInsights() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  const posts = [
    {
      tag: "Strategy",
      date: "July 2, 2026",
      title: "How Platform Algorithm Updates Impact Industry Rankings",
      excerpt:
        "Learn how algorithm updates, compliance systems, backlinks, and technical fundamentals affect rankings, visibility, and organic recovery.",
      gradient: "from-indigo-600 via-blue-600 to-cyan-500",
    },
    {
      tag: "Strategy",
      date: "July 1, 2026",
      title: "The New Era of Search: GEO, AEO & AI Rankings",
      excerpt:
        "GEO, AEO, and AI search are reshaping how brands get discovered. Learn how to earn AI citations and strengthen trust signals.",
      gradient: "from-fuchsia-600 via-pink-600 to-purple-600",
    },
    {
      tag: "Costing",
      date: "June 9, 2026",
      title: "How Much Does Professional SEO Cost in 2026?",
      excerpt:
        "Costs range widely depending on scope and competition. Here's exactly what each pricing tier includes and what drives the difference.",
      gradient: "from-rose-600 via-red-600 to-orange-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0710] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-16 left-1/3 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-purple-700/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-44 w-44 sm:h-64 sm:w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className={reveal()} style={style(0)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-gradient-to-r from-red-950/60 to-purple-950/60 px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-[10px] sm:text-xs font-medium text-transparent">
                FROM THE BLOG
              </span>
            </div>
          </div>

          <h2
            className={`mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2 ${reveal()}`}
            style={style(120)}
          >
            Latest{" "}
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base text-gray-400 px-4 sm:px-0 ${reveal()}`}
            style={style(220)}
          >
            Strategies, trends, and practical guides to help you grow smarter.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, i) => (
            <article
              key={i}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(225,29,72,0.2)] ${reveal()}`}
              style={style(320 + i * 140)}
            >
              {/* Thumbnail */}
              <div
                className={`relative h-40 sm:h-44 md:h-48 w-full overflow-hidden bg-gradient-to-br ${post.gradient}`}
              >
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
                <Sparkles className="absolute top-4 right-4 h-5 w-5 text-white/70" />
                <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white shadow-[0_10px_40px_rgba(225,29,72,0.3)]">
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="text-[10px] sm:text-[11px] text-gray-500">
                  {post.date}
                </span>

                <h3 className="mt-2 text-base sm:text-lg font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-purple-400">
                  {post.title}
                </h3>

                <p className="mt-2.5 flex-1 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <Link to="/contact" className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-400 transition-all hover:gap-2.5 hover:text-red-300">
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div
          className={`mt-10 sm:mt-14 flex justify-center ${reveal()}`}
          style={style(760)}
        >
          <Link to="/contact" className="rounded-full border border-red-500/40 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-red-400 transition-all hover:bg-red-500/10 hover:scale-[1.02] active:scale-[0.98]">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}