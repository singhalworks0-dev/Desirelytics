import Navbar from "../../constants/Navbar";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";

import AdultWebsiteDevelopmentPage from "../../components/development/AdultWebDevPage";
import adultWebsiteDevelopmentData from "../../components/adultWebDevData";

export default function AdultWebsiteDevelopment() {
  return (
    <>
      <Seo
        title="Custom Website Development Services | Desirelytics"
        description="Build fast, responsive, SEO-friendly websites with Desirelytics. We create high-performing websites that generate leads and enhance user experience."
        path="/development/adult-website-development"
      />

      <Navbar />

      <AdultWebsiteDevelopmentPage />

      <Footer />
    </>
  );
}