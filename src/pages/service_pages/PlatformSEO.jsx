import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import onlyfansSeoData from "../../data/onlyfansSeoData";

import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={onlyfansSeoData} />
      <Footer />
    </>
  );
}