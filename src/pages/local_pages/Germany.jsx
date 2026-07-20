import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import germanyAdultSeoData from "../../data_local/germanyAdultSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LocationPageLayout data={germanyAdultSeoData} />
      <Footer />
    </>
  );
}