import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SERIES 1 - Bell Atelier",
  description: "SERIES 1 Collection",
};

export default function Series1Page() {
  return (
    <main className="min-h-screen bg-bone">
      <Header />
      <div className="py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat font-medium text-[0.6125rem] md:text-[0.7rem] uppercase tracking-[0.35em] whitespace-nowrap inline-block relative glitch-flicker text-center w-full mb-16" style={{ color: "#001d4a" }}>
            SERIES 1
          </h1>
          {/* Content for SERIES 1 will go here */}
        </div>
      </div>
      <Footer />
    </main>
  );
}

