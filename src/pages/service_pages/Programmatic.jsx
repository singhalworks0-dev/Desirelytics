import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import programmaticSeoData from "../../data/programmaticSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={programmaticSeoData} />
      <Footer />
    </>
  );
}