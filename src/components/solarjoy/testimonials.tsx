"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SOLARJOY } from "./content";

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-b from-amber-50/70 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Trusted By Cape Town Since 2005
          </h2>
          <div className="mt-4 inline-flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm font-semibold text-zinc-700">98% client satisfaction</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SOLARJOY.testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative bg-white rounded-2xl p-7 shadow-md border border-zinc-100 hover:shadow-xl transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-100" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-bold text-zinc-900">{t.title}</h3>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{t.quote}</p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm">
                  {t.author.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-zinc-700">{t.author}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
