import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";
import GlitchSync from "@/components/GlitchSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-montserrat",
  display: "swap",
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
        className={`${inter.variable} ${bodoniModa.variable} ${montserrat.variable} font-sans antialiased bg-bone text-charcoal`}
      >
        <GlitchSync />
        {children}
      </body>
    </html>
  );
}

