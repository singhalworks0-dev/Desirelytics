import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import contentMarketingSeoData from "../../data/contentMarketingSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={contentMarketingSeoData} />
      <Footer />
    </>
  );
}