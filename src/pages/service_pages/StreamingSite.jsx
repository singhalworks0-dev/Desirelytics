import Navbar from "../../constants/Navbar";
import ServicePageLayout from "../../components/services/ServicePageLayout";
import streamingSiteSeoData from "../../data_services/streamingSiteSeoData";
import Footer from "../../constants/Footer";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders

export default function Home() {
  return (
    <>
    <Seo
  title="Streaming Site SEO Services"
  description="SEO strategies built for streaming platforms in adult and niche industries."
  path="/services/streaming-site-seo"
/>
      <Navbar />
      <ServicePageLayout data={streamingSiteSeoData} />
      <Footer />
    </>
  );
}