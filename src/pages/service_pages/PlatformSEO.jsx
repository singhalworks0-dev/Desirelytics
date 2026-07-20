import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import platformSeoData from "../../data_services/platformSeoData";

import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={platformSeoData} />
      <Footer />
    </>
  );
}