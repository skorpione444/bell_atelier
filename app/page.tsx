import Hero from "@/components/Hero";
import Header from "@/components/Header";
import VisionSection from "@/components/VisionSection";
import ProductFocusSection from "@/components/ProductFocusSection";
import PhilosophySection from "@/components/PhilosophySection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bone">
      <Header />
      <Hero />
      <VisionSection />
      <ProductFocusSection />
      <PhilosophySection />
      <AboutSection />
      <Footer />
    </main>
  );
}

