import Navbar from "../../constants/Navbar";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";

import AdultWebsiteDevelopmentPage from "../../components/development/AdultWebDevPage";
import adultWebsiteDevelopmentData from "../../components/adultWebDevData";

export default function AdultWebsiteDevelopment() {
  return (
    <>
      <Seo
        title={adultWebsiteDevelopmentData.meta.title}
        description={adultWebsiteDevelopmentData.meta.description}
        path="/development/adult-website-development"
      />

      <Navbar />

      <AdultWebsiteDevelopmentPage />

      <Footer />
    </>
  );
}