import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import australiaAdultSeoData from "../../data_local/australiaAdultSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LocationPageLayout data={australiaAdultSeoData} />
      <Footer />
    </>
  );
}