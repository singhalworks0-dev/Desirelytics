import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = Number(process.env.PORT || 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '1mb' }));

app.post('/api/audit', async (req, res) => {
  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=seo&category=accessibility&category=best-practices&strategy=mobile${apiKey ? `&key=${apiKey}` : ''}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message || 'Failed to analyze URL' });
    }

    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    };

    const metrics = {
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
    };

    const seoAuditKeys = [
      'document-title',
      'meta-description',
      'link-text',
      'image-alt',
      'hreflang',
      'canonical',
      'robots-txt',
      'crawlable-anchors',
    ];

    const issues = seoAuditKeys
      .map((key) => audits[key])
      .filter((audit) => audit && audit.score !== null && audit.score < 1)
      .map((audit) => ({ title: audit.title, description: audit.description }));

    return res.status(200).json({
      url,
      scores,
      metrics,
      issues,
      finalUrl: data.lighthouseResult?.finalUrl,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Audit failed. Please try again.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
