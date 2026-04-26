import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ShowcaseSection />
        <PhilosophySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
