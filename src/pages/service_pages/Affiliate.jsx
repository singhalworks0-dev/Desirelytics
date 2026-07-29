import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import affiliateSeoData from "../../data_services/affiliateSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="Affiliate SEO Services"
  description="Grow affiliate revenue with SEO strategies built specifically for adult and niche affiliate programs."
  path="/services/affiliate-seo"
/>
      <Navbar />
      <ServicePageLayout data={affiliateSeoData} />
      <Footer />
    </>
  );
}