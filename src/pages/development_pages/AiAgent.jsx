import Navbar from "../../constants/Navbar";
import HeroSection from "../../components/home/Hero_section";
import Seo from "../../components/seo/Seo";   // adjust "../" depth for nested folders


import Footer from "../../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
  title="AI Agents Development"
  description="Custom AI agent development to automate support, sales, and operations for niche industry brands."
  path="/development/ai-agents"
/>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}