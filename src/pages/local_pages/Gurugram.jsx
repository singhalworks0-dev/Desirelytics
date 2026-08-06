import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import gurugramAdultSeoData from "../../data_local/gurugramAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
      <Seo
        title="SEO Services in Gurugram"
        description="Specialist SEO and digital marketing for adult and niche industry brands operating in Gurugram."
        path="/local/seo-in-gurugram"
      />
      <Navbar />
      <LocationPageLayout data={gurugramAdultSeoData} />
      <Footer />
    </>
  );
}