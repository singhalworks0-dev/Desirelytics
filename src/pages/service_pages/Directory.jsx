import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import directorySeoData from "../../data_services/directorySeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Directory SEO Services"
  description="SEO strategies for directory and listing sites in adult and niche industries."
  path="/services/directory-seo"
/>
      <Navbar />
      <ServicePageLayout data={directorySeoData} />
      <Footer />
    </>
  );
}