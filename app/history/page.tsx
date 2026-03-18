import { Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Black Cowboys History - Bell Atelier",
  description:
    "The untold story of Black cowboys in America — from enslaved cattlemen in 1820s Texas to the modern cultural renaissance.",
};

const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal/60 rounded-full animate-spin" />
  </div>
);

const ScrollProgressBar = dynamic(
  () => import("@/components/history/ScrollProgressBar"),
  { ssr: false }
);
const HistoryHero = dynamic(
  () => import("@/components/history/HistoryHero"),
  { ssr: false, loading: () => <div className="h-screen bg-[#1a1a1a]" /> }
);
const OriginsSection = dynamic(
  () => import("@/components/history/OriginsSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const TimelineSection = dynamic(
  () => import("@/components/history/TimelineSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const LegendsSection = dynamic(
  () => import("@/components/history/LegendsSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const ErasureSection = dynamic(
  () => import("@/components/history/ErasureSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const RenaissanceSection = dynamic(
  () => import("@/components/history/RenaissanceSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const ClosingSection = dynamic(
  () => import("@/components/history/ClosingSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);

export default function HistoryPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#f6f4ed" }}>
      <Header />
      <Suspense>
        <ScrollProgressBar />
      </Suspense>
      <Suspense fallback={<div className="h-screen bg-[#1a1a1a]" />}>
        <HistoryHero />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <OriginsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <TimelineSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <LegendsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ErasureSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <RenaissanceSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ClosingSection />
      </Suspense>
      <Footer />
    </main>
  );
}
