import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import affiliateSeoData from "../../data_services/affiliateSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={affiliateSeoData} />
      <Footer />
    </>
  );
}