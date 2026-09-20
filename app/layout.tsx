import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurelia-jewellery.com"),
  title: "AURELIA — High Jewellery Maison | Jewels of Eternity",
  description:
    "An immersive luxury high jewellery experience. Handcrafted fine jewellery, solitaire diamonds, emeralds, and rare heirloom masterpieces.",
  keywords: [
    "Aurelia High Jewellery",
    "Luxury Jewellery",
    "Diamond Solitaire",
    "High Jewellery Maison",
    "Heirloom Bridal Jewellery",
    "Modern Indian Luxury",
  ],
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  openGraph: {
    title: "AURELIA — High Jewellery Maison | Jewels of Eternity",
    description:
      "Pieces designed to outlive the moment. Experience the pinnacle of high jewellery craftsmanship.",
    images: ["/images/hero-necklace-portrait.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#0B0A08] text-[#F5F0E8] overflow-x-hidden selection:bg-[#C6A15B] selection:text-[#0B0A08]"
        suppressHydrationWarning
      >
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
