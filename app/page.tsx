import Hero from "@/components/Hero";
import PhilosophySection from "@/components/PhilosophySection";
import ProductFocusSection from "@/components/ProductFocusSection";
import AtelierSection from "@/components/AtelierSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PhilosophySection />
      <ProductFocusSection />
      <AtelierSection />
      <Footer />
    </main>
  );
}

