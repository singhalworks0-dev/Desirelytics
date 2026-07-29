import Navbar from "../constants/Navbar";
import CaseStudiesHeroSection from "../components/case-studies/CaseStudiesHeroSection";
import CaseStudiesGridSection from "../components/case-studies/CaseStudiesGridSection";
import WhySpecialistSection from "../components/case-studies/WhySpecialistSection";
import CaseStudyCTASection from "../components/case-studies/CaseStudyCTASection";
import Seo from "../components/seo/Seo";   // adjust "../" depth for nested folders



import Footer from "../constants/Footer";

export default function Home() {
  return (
    <>
    <Seo
  title="Case Studies"
  description="Real results from real clients — see how our SEO strategies drove growth for adult and niche industry brands."
  path="/case-studies"
/>
      <Navbar />
      <CaseStudiesHeroSection />
      <CaseStudiesGridSection/>
      <WhySpecialistSection/>
      <CaseStudyCTASection/>
      <Footer />
      

    </>
  );
}