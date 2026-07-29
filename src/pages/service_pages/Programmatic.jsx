import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import programmaticSeoData from "../../data_services/programmaticSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Programmatic SEO Services"
  description="Programmatic SEO strategies that scale rankings across thousands of pages for niche industry sites."
  path="/services/programmatic-seo"
/>
      <Navbar />
      <ServicePageLayout data={programmaticSeoData} />
      <Footer />
    </>
  );
}