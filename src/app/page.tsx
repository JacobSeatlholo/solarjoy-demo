"use client";

import Navbar from "@/components/solarjoy/navbar";
import Hero from "@/components/solarjoy/hero";
import TrustBar from "@/components/solarjoy/trust-bar";
import Services from "@/components/solarjoy/services";
import Impact from "@/components/solarjoy/impact";
import Calculator from "@/components/solarjoy/calculator";
import WhatsAppShowcase from "@/components/solarjoy/whatsapp-showcase";
import Projects from "@/components/solarjoy/projects";
import Testimonials from "@/components/solarjoy/testimonials";
import Faq from "@/components/solarjoy/faq";
import Contact from "@/components/solarjoy/contact";
import Footer from "@/components/solarjoy/footer";
import WhatsAppFloat from "@/components/solarjoy/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Services />
        <Impact />
        <Calculator />
        <WhatsAppShowcase />
        <Projects />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
