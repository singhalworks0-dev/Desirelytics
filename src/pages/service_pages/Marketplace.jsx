import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import marketplaceSeoData from "../../data_services/marketplaceSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={marketplaceSeoData} />
      <Footer />
    </>
  );
}