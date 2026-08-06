import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import australiaAdultSeoData from "../../data_local/australiaAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="SEO Services in Australia"
  description="Specialist SEO and digital marketing for adult and niche industry brands operating in Australia."
  path="/local/seo-in-australia"
/>
      <Navbar />
      <LocationPageLayout data={australiaAdultSeoData} />
      <Footer />
    </>
  );
}