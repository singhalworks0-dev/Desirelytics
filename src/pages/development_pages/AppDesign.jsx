import Navbar from "../../constants/Navbar";
import AiAgentHero from "../../components/development/app-design/AiAgentHero";
import TrustStats from "../../components/development/app-design/TrustStats";
import ProblemSolution from "../../components/development/app-design/ProblemSolution";
import ServicesGrid from "../../components/development/app-design/ServicesGrid";
import FreeAuditTool from "../../components/development/app-design/FreeAuditTool";
import AgentCapabilities from "../../components/development/app-design/AgentCapabilities";
import LlmAgentFeatures from "../../components/development/app-design/LlmAgentFeatures";
import TechStack from "../../components/development/app-design/TechStack";
import WhoWeBuildFor from "../../components/development/app-design/WhoWeBuildFor";
import PricingPackages from "../../components/development/app-design/PricingPackages";
import FinalCTASection from "../../components/development/app-design/FinalCTASection";
import FAQSection from "../../components/development/app-design/FAQSection";
import RelatedServicesSection from "../../components/development/app-design/RelatedServicesSection";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders




import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
  title="App Development Services"
  description="Custom app development for adult and niche industry businesses looking to expand beyond the web."
  path="/development/app-development"
/>
      <Navbar />
      <AiAgentHero />
      <TrustStats />
      <ProblemSolution />
      <ServicesGrid />
      <FreeAuditTool />
      <AgentCapabilities/>
      <LlmAgentFeatures/>
      <TechStack/>
      <WhoWeBuildFor/>
      <PricingPackages/>
      <FinalCTASection/>
      <FAQSection/>
      <RelatedServicesSection/>
      <Footer />
    </>
  );
}