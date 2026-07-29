import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import platformSeoData from "../../data_services/platformSeoData";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
  title="Platform SEO Services"
  description="SEO strategies for large-scale platforms and communities in adult and niche industries."
  path="/services/platform-seo"
/>
      <Navbar />
      <ServicePageLayout data={platformSeoData} />
      <Footer />
    </>
  );
}