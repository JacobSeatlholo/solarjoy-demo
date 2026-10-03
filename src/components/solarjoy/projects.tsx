"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { SOLARJOY } from "./content";

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
              Our Work
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Real Installations. Real Results.
            </h2>
          </div>
          <p className="text-zinc-600 max-w-sm text-sm leading-relaxed sm:text-right">
            A snapshot of the 4,500+ projects our teams have engineered across the Western Cape —
            from family homes to schools and businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SOLARJOY.projects.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-72">
                <img
                  src={p.image}
                  alt={`${p.title} — ${p.tag} by SolarJoy`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent" />
              </div>
              <figcaption className="absolute bottom-0 inset-x-0 p-5">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-zinc-950 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                  <Camera className="w-3 h-3" />
                  {p.tag}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
