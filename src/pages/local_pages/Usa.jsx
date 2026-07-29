import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import ukAdultSeoData from "../../data_local/ukAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="SEO Services in the USA"
  description="Specialist SEO and digital marketing for adult and niche industry brands operating in the United States."
  path="/local/usa"
/>
      <Navbar />
      <LocationPageLayout data={ukAdultSeoData} />
      <Footer />
    </>
  );
}