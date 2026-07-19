import { Routes, Route } from "react-router-dom";

// Core pages
import Home from "../pages/home";
import Pricing from "../pages/Pricing";
import CaseStudies from "../pages/CaseStudies";

// Development pages
import WebDesign from "../pages/development_pages/WebDesign";
import AppDevelopment from "../pages/development_pages/AppDesign";
import AiAgents from "../pages/development_pages/AiAgent";

// Service pages
import Affiliate from "../pages/service_pages/Affiliate";
import AiCompanion from "../pages/service_pages/AiCompanion";
import Category from "../pages/service_pages/Category";
import ContentMarketing from "../pages/service_pages/ContentMarketing";
import Directory from "../pages/service_pages/Directory";
import LinkBuilding from "../pages/service_pages/LinkBuilding";
import LiveContent from "../pages/service_pages/LiveContent";
import LocalReach from "../pages/service_pages/LocalReach";
import Marketplace from "../pages/service_pages/Marketplace";
import NicheEcommerce from "../pages/service_pages/NicheEcommerce";
import PlatformSEO from "../pages/service_pages/PlatformSEO";
import Programmatic from "../pages/service_pages/Programmatic";
import Retail from "../pages/service_pages/Retail";
import StreamingSite from "../pages/service_pages/StreamingSite";

import Contact from "../pages/Contact";
import FreeAudit from "../pages/FreeAudit";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Core */}
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/case-studies" element={<CaseStudies />} />

      {/* Development */}
      <Route path="/development/web-design" element={<WebDesign />} />
      <Route path="/development/app-development" element={<AppDevelopment />} />
      <Route path="/development/ai-agents" element={<AiAgents />} />

      {/* Services */}
      <Route path="/services/affiliate-seo" element={<Affiliate />} />
      <Route path="/services/ai-companion-seo" element={<AiCompanion />} />
      <Route path="/services/category-seo" element={<Category />} />
      <Route path="/services/content-marketing" element={<ContentMarketing />} />
      <Route path="/services/directory-seo" element={<Directory />} />
      <Route path="/services/link-building" element={<LinkBuilding />} />
      <Route path="/services/live-content-seo" element={<LiveContent />} />
      <Route path="/services/local-reach-seo" element={<LocalReach />} />
      <Route path="/services/marketplace-seo" element={<Marketplace />} />
      <Route path="/services/niche-ecommerce-seo" element={<NicheEcommerce />} />
      <Route path="/services/platform-seo" element={<PlatformSEO />} />
      <Route path="/services/programmatic-seo" element={<Programmatic />} />
      <Route path="/services/retail-seo" element={<Retail />} />
      <Route path="/services/streaming-site-seo" element={<StreamingSite />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/free-audit" element={<FreeAudit />} />

    </Routes>
  );
}