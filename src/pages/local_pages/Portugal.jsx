import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import portugalAdultSeoData from "../../data_local/portugalAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="SEO Services in Portugal"
  description="Specialist SEO and digital marketing for adult and niche industry brands operating in Portugal."
  path="/local/seo-in-portugal"
/>
      <Navbar />
      <LocationPageLayout data={portugalAdultSeoData} />
      <Footer />
    </>
  );
}