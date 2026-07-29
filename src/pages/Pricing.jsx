import Seo from "../components/seo/Seo";   // adjust "../" depth for nested folders
import Navbar from "../constants/Navbar";
import PricingHeroSection from "../components/pricing/PricingHeroSection";
import PricingPlansSection from "../components/pricing/PricingPlansSection";
import ComparisonTableSection from "../components/pricing/ComparisonTableSection";
import TermsAddOnsSection from "../components/pricing/TermsAddOnsSection";
import FreeAIAuditSection from "../components/pricing/FreeAIAuditSection";
import WhichPackageSection from "../components/pricing/WhichPackageSection";
import IndustryCostSection from "../components/pricing/IndustryCostSection";
import PricingFAQSection from "../components/pricing/PricingFAQSection";
import CustomQuoteCTASection from "../components/pricing/CustomQuoteCTASection";





import Footer from "../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
  title="Pricing & Packages"
  description="Transparent SEO pricing plans built for adult and niche industry brands. Compare packages and find the right fit for your budget."
  path="/pricing"
/>
      <Navbar />
      <PricingHeroSection />
      <PricingPlansSection/>
      <ComparisonTableSection/>
      <TermsAddOnsSection/>
      <FreeAIAuditSection/>
      <WhichPackageSection/>
      <IndustryCostSection/>
      <PricingFAQSection/>
      <CustomQuoteCTASection/>
      <Footer />
    </>
  );
}