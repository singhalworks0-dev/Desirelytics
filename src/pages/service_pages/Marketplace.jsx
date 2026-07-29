import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import marketplaceSeoData from "../../data_services/marketplaceSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Marketplace SEO Services"
  description="SEO strategies for marketplace and multi-vendor platforms in adult and niche industries."
  path="/services/marketplace-seo"
/>
      <Navbar />
      <ServicePageLayout data={marketplaceSeoData} />
      <Footer />
    </>
  );
}