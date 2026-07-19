import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import streamingSiteSeoData from "../../data/streamingSiteSeoData";
import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicePageLayout data={streamingSiteSeoData} />
      <Footer />
    </>
  );
}