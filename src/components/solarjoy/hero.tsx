"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Clock } from "lucide-react";
import { SOLARJOY } from "./content";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
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

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/residential-hero.jpg"
          alt="Solar PV installation on a home in Cape Town's Southern Suburbs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/75 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-sm font-medium">
              Since 2005 · Ottery, Cape Town
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight"
          >
            Power Your Life With The Sun.
            <span className="block gradient-solar-text">Not With Eskom.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl"
          >
            {SOLARJOY.headline}. Solar PV, water heating, heat pumps & battery
            backups — engineered for Cape Town homes and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#whatsapp"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-8 py-4 rounded-full text-base hover:from-amber-400 hover:to-orange-500 transition-all solar-glow"
            >
              Get a Quote in 60 Seconds
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 backdrop-blur text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/15 transition-all"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-400"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> SSEG Compliance Handled
            </span>
            <span className="inline-flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" /> Certified Installation Teams
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" /> Done in 1–2 Days
            </span>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl"
        >
          {SOLARJOY.stats.residential.map((s, i) => (
            <div
              key={i}
              className="bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 text-center"
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-amber-400">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-zinc-300">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
