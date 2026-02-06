import Hero from "@/components/Hero";
import Header from "@/components/Header";
import VisionSectionWrapper from "@/components/VisionSectionWrapper";
import ProductFocusSection from "@/components/ProductFocusSection";
import PhilosophySection from "@/components/PhilosophySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-beige" style={{ backgroundColor: '#f6f4ed' }}>
      <Header />
      <Hero />
      <VisionSectionWrapper />
      <ProductFocusSection />
      <PhilosophySection />
      <AboutSection />
      <Footer />
    </main>
  );
}

