import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import retailSeoData from "../../data/retailSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={retailSeoData} />
      <Footer />
    </>
  );
}