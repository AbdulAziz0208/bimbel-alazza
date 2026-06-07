import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PainPointsSection from "@/components/PainPointsSection";
import AboutSection from "@/components/AboutSection";
import BenefitSection from "@/components/BenefitSection";
import ProgramSection from "@/components/ProgramSection";
import FAQSection from "@/components/FAQSection";
import PartnershipSection from "@/components/PartnershipSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import StickyBottomBar from "@/components/StickyBottomBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar - Fixed Top */}
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Hero Section */}
      <HeroSection />

      {/* Pain Points Section */}
      <PainPointsSection />

      {/* About Section */}
      <AboutSection />

      {/* Benefit Section */}
      <BenefitSection />

      {/* Program Section */}
      <ProgramSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Partnership Section */}
      <PartnershipSection />

      {/* Registration Form */}
      <Suspense fallback={
        <div className="px-4 py-12">
          <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-sm animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-8" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }>
        <RegistrationForm />
      </Suspense>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppFAB />
      <StickyBottomBar />
    </main>
  );
}
