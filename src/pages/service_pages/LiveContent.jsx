import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import liveContentSeoData from "../../data_services/liveContentSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Live Content SEO Services"
  description="SEO strategies for live-streaming and real-time content platforms in adult and niche industries."
  path="/services/live-content-seo"
/>
      <Navbar />
      <ServicePageLayout data={liveContentSeoData} />
      <Footer />
    </>
  );
}