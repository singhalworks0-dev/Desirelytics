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