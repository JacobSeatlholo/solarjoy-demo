"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Building2, ArrowRight } from "lucide-react";
import { SOLARJOY } from "./content";

function StatNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString("en-ZA")}
      {suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-amber-500 font-bold text-sm uppercase tracking-[0.2em]">
            Proven Track Record
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Homes & Businesses, Powered By SolarJoy
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Residential */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src="/images/residential-hero.jpg"
              alt="Residential solar panel installation in the Southern Suburbs of Cape Town"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
            <div className="relative p-8 lg:p-10 flex flex-col min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Home className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="mt-5 text-2xl lg:text-3xl font-bold">Residential Solar</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed max-w-md">
                From backup-first systems that beat load shedding tonight, to full hybrid PV
                installations that slash your bill — tailored to your roof, budget and lifestyle.
              </p>
              <div className="mt-auto pt-8 grid grid-cols-3 gap-3">
                {SOLARJOY.stats.residential.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl lg:text-2xl font-extrabold text-amber-400">
                      <StatNumber target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-0.5 text-[11px] lg:text-xs text-zinc-300 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Commercial */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="relative rounded-3xl overflow-hidden group"
          >
            <img
              src="/images/commercial-school.jpg"
              alt="Commercial solar panel installation at a school in Cape Town"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/20" />
            <div className="relative p-8 lg:p-10 flex flex-col min-h-[420px]">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="mt-5 text-2xl lg:text-3xl font-bold">Business Solar</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed max-w-md">
                Eliminate skyrocketing electricity expenses and ensure uninterrupted productivity.
                Enhance your corporate social responsibility while gaining significant long-term
                ROI in the competitive Western Cape market.
              </p>
              <div className="mt-auto pt-8 grid grid-cols-3 gap-3">
                {SOLARJOY.stats.commercial.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.08] backdrop-blur border border-white/10 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl lg:text-2xl font-extrabold text-amber-400">
                      <StatNumber target={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-0.5 text-[11px] lg:text-xs text-zinc-300 leading-tight">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 text-center"
        >
          <a
            href="#whatsapp"
            className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
          >
            Book a free, no-obligation consultation
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
