import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "../lib/wordpress";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPostBySlug(slug)
      .then((data) => {
        if (!data) setError(true);
        else setPost(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0710] px-4 sm:px-6 py-24">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-6 w-32 rounded-full bg-white/[0.03] animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-white/[0.03] animate-pulse" />
          <div className="h-64 w-full rounded-2xl bg-white/[0.03] animate-pulse" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0a0710] px-4 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Article not found</p>
          <Link
            to="/blog"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-[#0a0710] min-h-screen px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-16 left-1/3 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-purple-700/10 blur-3xl" />

      <article
        className={`relative mx-auto max-w-3xl transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-400 hover:text-red-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-3 py-1 text-[10px] sm:text-xs font-semibold text-white">
            {post.tag}
          </span>
          <span className="text-[11px] sm:text-xs text-gray-500">
            {post.date} · By {post.author}
          </span>
        </div>

        <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug tracking-tight">
          {post.title}
        </h1>

        {post.image && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* WordPress HTML content, styled with prose */}
        <div
          className="mt-8 prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-a:text-red-400 prose-a:no-underline hover:prose-a:text-red-300
            prose-strong:text-white
            prose-blockquote:border-red-500/40 prose-blockquote:text-gray-300
            prose-img:rounded-xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}