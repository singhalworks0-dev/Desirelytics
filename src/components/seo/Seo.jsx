import { Helmet } from "react-helmet-async";

const SITE_NAME = "Desirelytics";
const SITE_URL = "https://desirelytics.com"; // 👈 update if the live domain is different
const DEFAULT_IMAGE = `${SITE_URL}/Desirelytics.png`;

/**
 * Drop this at the top of every page component to control that page's
 * <title>, meta description, canonical URL, and Open Graph / Twitter tags.
 *
 * Usage:
 *   <Seo
 *     title="Affiliate SEO Services"
 *     description="Grow affiliate revenue with SEO built for..."
 *     path="/services/affiliate-seo"
 *   />
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noindex = false,
  type = "website",
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Specialist SEO & Digital Marketing`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}