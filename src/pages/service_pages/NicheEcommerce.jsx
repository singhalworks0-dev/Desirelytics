import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import nicheEcommerceSeoData from "../../data/nicheEcommerceSeoData";
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