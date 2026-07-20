import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import linkBuildingSeoData from "../../data_services/linkBuildingSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={linkBuildingSeoData } />
      <Footer />
    </>
  );
}