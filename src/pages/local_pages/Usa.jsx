import Navbar from "../../constants/Navbar";
import LocationPageLayout from "../../components/local/LocationSeoLayout";
import ukAdultSeoData from "../../data_local/ukAdultSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LocationPageLayout data={ukAdultSeoData} />
      <Footer />
    </>
  );
}