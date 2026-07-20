import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import aiCompanionSeoData from "../../data_services/aiCompanionSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={aiCompanionSeoData} />
      <Footer />
    </>
  );
}