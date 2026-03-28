import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import OrderModal from "@/components/OrderModal";
import { ModalProvider } from "@/context/ModalContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Printfinity — Premium 3D Printing in India",
  description:
    "Premium FDM 3D printing services in India. Custom designs, gallery models, and fast delivery nationwide. Quality guaranteed.",
  openGraph: {
    title: "Printfinity — Premium 3D Printing in India",
    description: "Turn your ideas into reality with premium FDM 3D printing.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="bg-[#0A1628] text-[#E8ECF2] font-[DM_Sans] antialiased">
        <ModalProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <OrderModal />
        </ModalProvider>
      </body>
    </html>
  );
}
