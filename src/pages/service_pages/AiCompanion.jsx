import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import aiCompanionSeoData from "../../data_services/aiCompanionSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="AI Companion SEO Services"
  description="Specialist SEO for AI companion apps and platforms looking to rank without getting flagged."
  path="/services/ai-companion-seo"
/>
      <Navbar />
      <ServicePageLayout data={aiCompanionSeoData} />
      <Footer />
    </>
  );
}