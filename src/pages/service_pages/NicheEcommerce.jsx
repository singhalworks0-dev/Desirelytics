import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import nicheEcommerceSeoData from "../../data_services/nicheEcommerceSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Niche Ecommerce SEO Services"
  description="Ecommerce SEO built for niche and adult industry stores — product-page rankings without the risk."
  path="/services/niche-ecommerce-seo"
/>
      <Navbar />
      <ServicePageLayout data={nicheEcommerceSeoData} />
      <Footer />
    </>
  );
}