import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import lucknowAdultSeoData from "../../data_local/lucknowAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
      <Seo
        title="SEO Services in Lucknow"
        description="Specialist SEO and digital marketing for adult and niche industry brands operating in Lucknow."
        path="/local/lucknow"
      />
      <Navbar />
      <LocationPageLayout data={lucknowAdultSeoData} />
      <Footer />
    </>
  );
}