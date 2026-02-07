import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components
// VisionSectionWrapper must run on server (uses fs to read images)
const VisionSectionWrapper = dynamic(() => import("@/components/VisionSectionWrapper"), {
  ssr: true,
});

const ProductFocusSection = dynamic(() => import("@/components/ProductFocusSection"), {
  ssr: false,
});

const PhilosophySection = dynamic(() => import("@/components/PhilosophySection"), {
  ssr: false,
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: false,
});

// Loading component for Suspense boundaries
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal/60 rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-beige" style={{ backgroundColor: '#f6f4ed' }}>
      <Header />
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <VisionSectionWrapper />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProductFocusSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PhilosophySection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      <Footer />
    </main>
  );
}

