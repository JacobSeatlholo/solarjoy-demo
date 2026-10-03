import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolarJoy | Solar Cape Town — 20+ Years of Solar Excellence",
  description:
    "Expert solar panel installations, water heating, heat pumps and battery backups in Cape Town. SolarJoy brings 20+ years of trusted, sustainable energy solutions to Ottery and beyond. Get an instant WhatsApp quote in 60 seconds.",
  keywords: [
    "Solar installations Cape Town",
    "Solar PV Ottery",
    "Solar water heating Western Cape",
    "Heat pumps",
    "Battery backup",
    "Load shedding solutions",
    "Commercial solar",
    "SolarJoy",
  ],
  openGraph: {
    title: "SolarJoy | Solar Cape Town",
    description:
      "20+ Years of Solar Consulting Excellence, Quality Installations & Trusted Product Supply. Instant WhatsApp quotes in under 60 seconds.",
    siteName: "SolarJoy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
