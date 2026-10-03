"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOLARJOY } from "./content";

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
            Sustainable Home Upgrades
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
            One Partner. Every Solar Solution.
          </h2>
          <p className="mt-5 text-lg text-zinc-600 leading-relaxed">
            Living in the Western Cape means facing rising electricity costs, frequent power
            outages, shifting weather extremes, and ongoing water shortages. For over a decade,
            SolarJoy has helped homeowners create comfort, resilience, and long-term savings
            through smart sustainable upgrades.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLARJOY.services.map((s, i) => (
            <motion.a
              key={s.id}
              href="#whatsapp"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div className="relative h-72 sm:h-80">
                <img
                  src={s.image}
                  alt={s.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/45 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {s.copy}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-amber-400 text-sm font-semibold">
                  {s.cta}
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Smart decision checklist */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 lg:p-10"
        >
          <h3 className="text-2xl font-bold text-zinc-900 text-center">
            Going Solar Is A Smart Decision
          </h3>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLARJOY.smartDecision.map((point, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/80 rounded-xl p-4">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
