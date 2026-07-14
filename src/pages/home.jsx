import Navbar from "../constants/Navbar";
import HeroSection from "../components/home/Hero_section";
import TechnicalExcellence from "../components/home/TechnicalExcellence";
import TrustedWorldwide from "../components/home/TrustedWorldwide";
import NicheExpertise from "../components/home/NicheExpertise";
import MeetTheTeam from "../components/home/MeetTheTeam";
import CustomStrategyCTA from "../components/home/CustomStrategyCTA";
import RoadblocksToEdge from "../components/home/RoadblocksToEdge";
import CompleteSEOServices from "../components/home/CompleteSEOServices";
import FinalCTA from "../components/home/FinalCTA";
import FullLifecycleStrategy from "../components/home/FullLifecycleStrategy";
import ClientStories from "../components/home/ClientStories";
import Pricing from "../components/home/Pricing";
import FAQ from "../components/home/FAQ";
import BlogInsights from "../components/home/BlogInsights";
import CTABanner from "../components/home/CTABanner";
import Footer from "../constants/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TechnicalExcellence />
      <TrustedWorldwide />
      <NicheExpertise />
      <MeetTheTeam/>
      <CustomStrategyCTA/>
      <RoadblocksToEdge/>
      <CompleteSEOServices/>
      <FinalCTA/>
      <FullLifecycleStrategy/>
      <ClientStories/>
      <Pricing/>
      <FAQ/>
      <BlogInsights/>
      <CTABanner/>
      <Footer />
    </>
  );
}