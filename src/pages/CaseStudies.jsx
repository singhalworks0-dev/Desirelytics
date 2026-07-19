import Navbar from "../constants/Navbar";
import CaseStudiesHeroSection from "../components/case-studies/CaseStudiesHeroSection";
import CaseStudiesGridSection from "../components/case-studies/CaseStudiesGridSection";
import WhySpecialistSection from "../components/case-studies/WhySpecialistSection";
import CaseStudyCTASection from "../components/case-studies/CaseStudyCTASection";


import Footer from "../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <CaseStudiesHeroSection />
      <CaseStudiesGridSection/>
      <WhySpecialistSection/>
      <CaseStudyCTASection/>
      <Footer />
      

    </>
  );
}