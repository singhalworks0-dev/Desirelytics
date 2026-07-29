import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import contentMarketingSeoData from "../../data_services/contentMarketingSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Content Marketing Services"
  description="Content marketing built for adult and niche brands — rank, engage, and convert without compliance risk."
  path="/services/content-marketing"
/>
      <Navbar />
      <ServicePageLayout data={contentMarketingSeoData} />
      <Footer />
    </>
  );
}