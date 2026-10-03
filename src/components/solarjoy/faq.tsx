"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";
import { SOLARJOY } from "./content";

export default function Faq() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
              Going Solar FAQs
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Your Journey To Solar, Answered
            </h2>
            <p className="mt-5 text-lg text-zinc-600 leading-relaxed">
              The questions every Cape Town homeowner asks before making the switch — answered
              honestly by the team with 20+ years in the field. Still unsure? Our WhatsApp
              assistant answers these instantly, day or night.
            </p>
            <div className="mt-8 relative rounded-3xl overflow-hidden hidden lg:block">
              <img
                src="/images/faq.jpg"
                alt="SolarJoy technician explaining a solar installation"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
            </div>
            <a
              href="#whatsapp"
              className="mt-8 inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
            >
              <MessageCircleQuestion className="w-5 h-5" />
              Ask our WhatsApp assistant instead
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {SOLARJOY.faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl px-5 data-[state=open]:bg-amber-50/60 data-[state=open]:border-amber-200 transition-colors"
                >
                  <AccordionTrigger className="text-left text-[15px] font-semibold text-zinc-800 hover:no-underline py-4">
                    <span className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-zinc-600 leading-relaxed pl-9 pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
