import Navbar from "../../constants/Navbar";
import HeroSection from "../../components/development/web-design/WebDesignHero";
import TrustedBySection from "../../components/development/web-design/TrustedBySection";
import ProblemSection from "../../components/development/web-design/ProblemSection";
import ServicesSection from "../../components/development/web-design/ServicesSection";
import FullServiceSection from "../../components/development/web-design/FullServiceSection";
import ReadyToLaunchSection from "../../components/development/web-design/ReadyToLaunchSection";
import SecuritySection from "../../components/development/web-design/SecuritySection";
import TechStackSection from "../../components/development/web-design/TechStackSection";
import ProcessSection from "../../components/development/web-design/ProcessSection";
import AudienceSection from "../../components/development/web-design/AudienceSection";
import HireDedicated from "../../components/development/web-design/HireDedicated";
import PricingPackages from "../../components/development/web-design/PricingPackages";
import Testimonials from "../../components/development/web-design/Testimonials";
import FAQSection from "../../components/development/web-design/FAQSection";
import RelatedServices from "../../components/development/web-design/RelatedServices";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders





import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
      title="Professional Adult Web Design Services | Responsive Website Design | Desirelytics"
      description="Create stunning, responsive, and SEO-friendly websites with Desirelytics. Our custom web design services help businesses enhance user experience, boost conversions, and grow online."
      path="/development/web-design"
    />
      <Navbar />
      <HeroSection />
      <TrustedBySection/>
      <ProblemSection/>
      <ServicesSection/>
      <FullServiceSection/>
      <ReadyToLaunchSection/>
      <SecuritySection/>
      <TechStackSection/>
      <ProcessSection/>
      <AudienceSection/>
      <HireDedicated/>
      <PricingPackages/>
      <Testimonials/>
      <FAQSection/>
      <RelatedServices/>
      <Footer />
    </>
  );
}