import Navbar from "../constants/Navbar";
import Footer from "../constants/Footer";
import Seo from "../components/seo/Seo";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, Target, DollarSign, BarChart3 } from "lucide-react";

export default function PpcServices() {
  const features = [
    {
      icon: Target,
      title: "Targeted Audience Reach",
      desc: "Precision audience targeting designed for high-converting customer segments across search and display channels.",
    },
    {
      icon: DollarSign,
      title: "Maximized Ad Spend ROI",
      desc: "Bid management and campaign optimization focused on lowering customer acquisition costs and boosting profitability.",
    },
    {
      icon: BarChart3,
      title: "Data-Driven Performance",
      desc: "Continuous A/B testing, landing page optimization, and real-time conversion tracking for maximum scale.",
    },
    {
      icon: TrendingUp,
      title: "Compliant Ad Campaigns",
      desc: "Specialized policy knowledge to navigate complex ad policies and maintain uninterrupted campaign delivery.",
    },
  ];

  return (
    <>
      <Seo
        title="PPC Management Services for Maximum ROI | Desirelytics"
        description="Increase conversions with data-driven PPC campaigns managed by Desirelytics. Google Ads, Meta Ads, and performance marketing tailored to your business."
        path="/ppc-services"
      />
      <Navbar />
      <main className="bg-[#0a0710] pt-8 sm:pt-12 pb-16 sm:pb-20 text-white min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
              High-Performance Paid Ads
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              PPC Management Services for{" "}
              <span className="bg-gradient-to-r from-red-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Maximum ROI
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed">
              Increase conversions with data-driven PPC campaigns managed by Desirelytics. High-converting Google Ads, Meta Ads, and performance marketing tailored specifically to your business growth.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/free-audit"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                Get Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-red-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-red-950/40 via-purple-950/40 to-slate-900/60 p-8 text-center sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Scale Your Conversion Rates?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
              Our PPC specialists build and optimize data-backed ad campaigns engineered for immediate return on ad spend.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
              >
                Launch Your Campaign <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
