import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import linkBuildingSeoData from "../../data_services/linkBuildingSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Link Building Services"
  description="Risk-safe link building for adult and niche industry sites, built to move rankings without penalties."
  path="/services/link-building"
/>
      <Navbar />
      <ServicePageLayout data={linkBuildingSeoData } />
      <Footer />
    </>
  );
}