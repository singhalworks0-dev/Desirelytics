import Layout from "../Layout";

// Core pages
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import CaseStudies from "../pages/CaseStudies";

// Development pages
import WebDesign from "../pages/development_pages/WebDesign";
import AppDevelopment from "../pages/development_pages/AppDesign";
import AdultWebsiteDevelopment from "../pages/development_pages/AdultWebsiteDevelopment";

// Local pages
import Uk from "../pages/local_pages/Uk";
import Dubai from "../pages/local_pages/Dubai";
import Portugal from "../pages/local_pages/Portugal";
import Usa from "../pages/local_pages/Usa";
import Australia from "../pages/local_pages/Australia";
import Germany from "../pages/local_pages/Germany";
import Lucknow from "../pages/local_pages/Lucknow";
import Gurugram from "../pages/local_pages/Gurugram";
import Bangalore from "../pages/local_pages/Bangalore";



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
import BlogPage from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import PpcServices from "../pages/PpcServices";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "pricing", element: <Pricing /> },
      { path: "case-studies", element: <CaseStudies /> },

      { path: "development/web-design", element: <WebDesign /> },
      { path: "development/app-development", element: <AppDevelopment /> },
      { path: "development/adult-website-development", element: <AdultWebsiteDevelopment /> },

      { path: "local/seo-in-uk", element: <Uk /> },
      { path: "local/seo-in-dubai", element: <Dubai /> },
      { path: "local/seo-in-portugal", element: <Portugal /> },
      { path: "local/seo-in-usa", element: <Usa /> },
      { path: "local/seo-in-australia", element: <Australia /> },
      { path: "local/seo-in-germany", element: <Germany /> },      
      { path: "local/seo-in-lucknow", element: <Lucknow /> },
      { path: "local/seo-in-gurugram", element: <Gurugram /> },
      { path: "local/seo-in-bangalore", element: <Bangalore /> },


      { path: "services/affiliate-seo", element: <Affiliate /> },
      { path: "services/ai-companion-seo", element: <AiCompanion /> },
      { path: "services/category-seo", element: <Category /> },
      { path: "services/content-marketing", element: <ContentMarketing /> },
      { path: "services/directory-seo", element: <Directory /> },
      { path: "services/link-building", element: <LinkBuilding /> },
      { path: "services/live-content-seo", element: <LiveContent /> },
      { path: "services/local-reach-seo", element: <LocalReach /> },
      { path: "services/marketplace-seo", element: <Marketplace /> },
      { path: "services/niche-ecommerce-seo", element: <NicheEcommerce /> },
      { path: "services/platform-seo", element: <PlatformSEO /> },
      { path: "services/programmatic-seo", element: <Programmatic /> },
      { path: "services/retail-seo", element: <Retail /> },
      { path: "services/streaming-site-seo", element: <StreamingSite /> },

      { path: "contact", element: <Contact /> },
      { path: "free-audit", element: <FreeAudit /> },
      { path: "ppc-services", element: <PpcServices /> },
      { path: "blog", element: <BlogPage /> },
      {
        path: "blog/:slug",
        element: <BlogPost />,
        getStaticPaths: () => [], // temporary — see note below
      },
    ],
  },
];

export default routes;