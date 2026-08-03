import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import bangaloreAdultSeoData from "../../data_local/bangaloreAdultSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
      <Seo
        title="SEO Services in Bangalore"
        description="Specialist SEO and digital marketing for adult and niche industry brands operating in Bangalore."
        path="/local/bangalore"
      />
      <Navbar />
      <LocationPageLayout data={bangaloreAdultSeoData} />
      <Footer />
    </>
  );
}