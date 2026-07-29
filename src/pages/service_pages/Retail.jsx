import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import retailSeoData from "../../data_services/retailSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Retail SEO Services"
  description="Retail SEO strategies for adult and niche industry brands selling physical or digital products."
  path="/services/retail-seo"
/>
      <Navbar />
      <ServicePageLayout data={retailSeoData} />
      <Footer />
    </>
  );
}