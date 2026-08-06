import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import dubaiAdultSeoData from "../../data_local/dubaiAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="SEO Services in Dubai"
  description="Specialist SEO and digital marketing for adult and niche industry brands operating in Dubai and the UAE."
  path="/local/seo-in-dubai"
/>
      <Navbar />
      <LocationPageLayout data={dubaiAdultSeoData} />
      <Footer />
    </>
  );
}