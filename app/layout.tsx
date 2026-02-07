import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

// Lazy load GlitchSync - not critical for initial render
const GlitchSync = dynamic(() => import("@/components/GlitchSync"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Reduced font weights to only essential ones for better performance
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700"], // Reduced from 400,500,600,700
  variable: "--font-bodoni-moda",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "500"], // Keep both as they're used
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Bell Atelier",
  description: "Luxury cowboy boots crafted with precision and artistry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${bodoniModa.variable} ${montserrat.variable} font-sans antialiased bg-beige text-charcoal`}
      >
        <GlitchSync />
        {children}
      </body>
    </html>
  );
}

