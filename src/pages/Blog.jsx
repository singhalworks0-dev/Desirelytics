import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { getPosts, getCategories } from "../lib/wordpress";

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPosts({ page, perPage: 9, search })
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [page, search]);

  const reveal = () =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const style = (delay) => ({ transitionDelay: mounted ? `${delay}ms` : "0ms" });

  return (
    <main className="relative overflow-hidden bg-[#0a0710] min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28">
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
                THE BLOG
              </span>
            </div>
          </div>

          <h1
            className={`mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight px-2 ${reveal()}`}
            style={style(120)}
          >
            Insights, Strategies &{" "}
            <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Adult SEO Guides
            </span>
          </h1>

          <p
            className={`mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base text-gray-400 px-4 sm:px-0 ${reveal()}`}
            style={style(220)}
          >
            Everything we've learned growing adult brands — rankings,
            compliance, content, and what actually moves the needle.
          </p>
        </div>

        {/* Search + Filters */}
        <div
          className={`mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 ${reveal()}`}
          style={style(300)}
        >
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles…"
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-all focus:border-red-500/40 focus:bg-white/[0.05]"
            />
          </div>

          {/* Category pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-300 ${
                  activeCategory === "All"
                    ? "border-transparent bg-gradient-to-r from-red-500 to-purple-600 text-white"
                    : "border-white/10 text-gray-400 hover:border-red-500/40 hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat.name
                      ? "border-transparent bg-gradient-to-r from-red-500 to-purple-600 text-white"
                      : "border-white/10 text-gray-400 hover:border-red-500/40 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-72 sm:h-80 rounded-2xl border border-white/10 bg-white/[0.02] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="mt-14 text-center text-xs sm:text-sm text-gray-500">
            Couldn't load blog posts right now. Please check back shortly.
          </p>
        )}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <p className="mt-14 text-center text-xs sm:text-sm text-gray-500">
            No articles found. Try a different search.
          </p>
        )}

        {/* Cards */}
        {!loading && !error && posts.length > 0 && (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {posts
              .filter(
                (p) => activeCategory === "All" || p.tag === activeCategory
              )
              .map((post, i) => (
                <article
                  key={post.id}
                  className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-[0_20px_50px_rgba(225,29,72,0.2)] ${reveal()}`}
                  style={style(360 + (i % 9) * 90)}
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative h-40 sm:h-44 md:h-48 w-full overflow-hidden ${
                      !post.image ? `bg-gradient-to-br ${post.gradient}` : ""
                    }`}
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <Sparkles className="absolute top-4 right-4 h-5 w-5 text-white/70" />
                    )}
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/10" />
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

                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-flex w-fit items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-400 transition-all hover:gap-2.5 hover:text-red-300"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div
            className={`mt-12 sm:mt-16 flex items-center justify-center gap-2 ${reveal()}`}
            style={style(400)}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full border border-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-400 transition-all hover:border-red-500/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`h-9 w-9 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  page === num
                    ? "bg-gradient-to-r from-red-500 to-purple-600 text-white"
                    : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-full border border-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-400 transition-all hover:border-red-500/40 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}