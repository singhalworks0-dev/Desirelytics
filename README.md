# Desirelytics

Desirelytics is a modern React-based marketing website for an SEO and digital growth agency. The app combines a polished marketing front end with multi-page content for services, local SEO, case studies, pricing, blog content, and a free website audit experience.

## What’s included

- A responsive home page with hero sections, trust signals, service highlights, FAQ, team, and CTA blocks
- Dedicated pages for:
  - SEO services
  - local SEO pages for the UK, Dubai, Portugal, USA, Australia, and Germany
  - web design, app development, and AI agent service pages
  - pricing, case studies, blog, contact, and free audit
- A free audit flow that sends a URL to a serverless API endpoint and returns PageSpeed-based scores and insights
- Client-facing content sections built from reusable React components and structured data modules

## Tech stack

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS v4
- ESLint with React hooks and refresh plugins
- Vercel deployment setup

## Project structure

- src/main.jsx — app entry point and browser router setup
- src/App.jsx — top-level app wrapper and scroll-to-top behavior
- src/routes/AppRoutes.jsx — application routing configuration
- src/pages — page-level components for home, pricing, blog, services, local pages, and more
- src/components — reusable section components for each marketing area
- src/data_services and src/data_local — structured content for service and regional SEO pages
- api/audit.js — serverless endpoint for the audit feature

## Main routes

The project includes routes for:

- /
- /pricing
- /case-studies
- /contact
- /free-audit
- /blog and /blog/:slug
- /development/web-design
- /development/app-development
/development/adult-website-development
- /local/uk, /local/dubai, /local/portugal, /local/usa, /local/australia, /local/germany
- /services/* for SEO service pages such as affiliate, category, content marketing, directory, link building, live content, local reach, marketplace, niche e-commerce, platform SEO, programmatic SEO, retail, and streaming site SEO

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Environment variables

The free audit feature uses PageSpeed data. If you want the API to use Google PageSpeed Insights with an API key, set:

```bash
PAGESPEED_API_KEY=your_key_here
```

This is expected by the serverless function in api/audit.js when deployed to Vercel.

## Deployment

The project is configured for Vercel with SPA rewrites in vercel.json, so client-side routes resolve correctly when deployed.


