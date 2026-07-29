import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import localReachSeoData from "../../data_services/localReachSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Local Reach SEO Services"
  description="Local SEO strategies that help niche and adult industry businesses dominate location-based search."
  path="/services/local-reach-seo"
/>
      <Navbar />
      <ServicePageLayout data={localReachSeoData} />
      <Footer />
    </>
  );
}