import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import categorySeoData from "../../data_services/categorySeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="Category SEO Services"
  description="Category-page SEO strategies that help niche and adult industry sites rank across their full catalog."
  path="/services/category-seo"
/>
      <Navbar />
      <ServicePageLayout data={categorySeoData} />
      <Footer />
    </>
  );
}