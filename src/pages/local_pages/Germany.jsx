import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import germanyAdultSeoData from "../../data_local/germanyAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


export default function Home() {
  return (
    <>
    <Seo
  title="SEO Services in Germany"
  description="Specialist SEO and digital marketing for adult and niche industry brands operating in Germany."
  path="/local/germany"
/>
      <Navbar />
      <LocationPageLayout data={germanyAdultSeoData} />
      <Footer />
    </>
  );
}