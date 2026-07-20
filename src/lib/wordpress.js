const WP_URL = "https://yourblog.com/wp-json/wp/v2"; // 👈 replace with your WP REST API base

const GRADIENTS = [
  "from-indigo-600 via-blue-600 to-cyan-500",
  "from-fuchsia-600 via-pink-600 to-purple-600",
  "from-rose-600 via-red-600 to-orange-500",
  "from-purple-600 via-fuchsia-600 to-pink-500",
  "from-blue-600 via-cyan-600 to-teal-500",
];

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function mapPost(post, i = 0) {
  const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog";
  return {
    id: post.id,
    slug: post.slug,
    tag: category,
    date: formatDate(post.date),
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered).slice(0, 130) + "…",
    content: post.content?.rendered || "",
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    author: post._embedded?.author?.[0]?.name || "Team",
    gradient: GRADIENTS[i % GRADIENTS.length],
  };
}

export async function getLatestPosts(count = 3) {
  const res = await fetch(
    `${WP_URL}/posts?_embed&per_page=${count}&orderby=date&order=desc`
  );
  if (!res.ok) throw new Error("Failed to fetch WordPress posts");
  const data = await res.json();
  return data.map(mapPost);
}

export async function getPosts({ page = 1, perPage = 9, search = "" } = {}) {
  const params = new URLSearchParams({
    _embed: "true",
    page: String(page),
    per_page: String(perPage),
    orderby: "date",
    order: "desc",
  });
  if (search) params.set("search", search);

  const res = await fetch(`${WP_URL}/posts?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch WordPress posts");

  const data = await res.json();
  return {
    posts: data.map(mapPost),
    totalPages: Number(res.headers.get("X-WP-TotalPages")) || 1,
    total: Number(res.headers.get("X-WP-Total")) || data.length,
  };
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data.length ? mapPost(data[0]) : null;
}

export async function getCategories() {
  const res = await fetch(`${WP_URL}/categories?per_page=20&hide_empty=true`);
  if (!res.ok) return [];
  return res.json();
}