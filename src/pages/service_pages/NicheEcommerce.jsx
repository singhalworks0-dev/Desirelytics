import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import nicheEcommerceSeoData from "../../data_services/nicheEcommerceSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={nicheEcommerceSeoData} />
      <Footer />
    </>
  );
}