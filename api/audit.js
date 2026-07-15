// api/audit.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const API_KEY = process.env.PAGESPEED_API_KEY; // set in Vercel env vars
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&category=performance&category=seo&category=accessibility&category=best-practices&strategy=mobile${
    API_KEY ? `&key=${API_KEY}` : ""
  }`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message || "Failed to analyze URL" });
    }

    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories["best-practices"]?.score || 0) * 100),
    };

    // Pull key Core Web Vitals + on-page signals
    const metrics = {
      lcp: audits["largest-contentful-paint"]?.displayValue || "N/A",
      cls: audits["cumulative-layout-shift"]?.displayValue || "N/A",
      fcp: audits["first-contentful-paint"]?.displayValue || "N/A",
      tbt: audits["total-blocking-time"]?.displayValue || "N/A",
    };

    // Flag failing/low-scoring audits as "issues found"
    const seoAuditKeys = [
      "document-title",
      "meta-description",
      "link-text",
      "image-alt",
      "hreflang",
      "canonical",
      "robots-txt",
      "crawlable-anchors",
    ];
    const issues = seoAuditKeys
      .map((key) => audits[key])
      .filter((a) => a && a.score !== null && a.score < 1)
      .map((a) => ({ title: a.title, description: a.description }));

    return res.status(200).json({
      url,
      scores,
      metrics,
      issues,
      finalUrl: data.lighthouseResult?.finalUrl,
    });
  } catch (err) {
    return res.status(500).json({ error: "Audit failed. Please try again." });
  }
}