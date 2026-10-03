"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sun, BatteryCharging, PiggyBank, CalendarClock, Leaf, Info } from "lucide-react";
import { recommendSystem } from "./content";

export default function Calculator() {
  const [bill, setBill] = useState(3200);
  const rec = useMemo(() => recommendSystem(bill), [bill]);
  const lifetime = rec.monthlySavings * 12 * 25;

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-gradient-to-b from-white to-amber-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-600 font-bold text-sm uppercase tracking-[0.2em]">
              Savings Estimator
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight">
              How Much Could You <span className="gradient-solar-text">Save?</span>
            </h2>
            <p className="mt-5 text-lg text-zinc-600 leading-relaxed">
              Drag the slider to your average monthly electricity bill and see what a SolarJoy
              system could do for you. Based on Cape Town tariffs and ~5.5 peak sun hours — the
              same logic our WhatsApp assistant uses to pre-qualify your quote instantly.
            </p>

            <div className="mt-10">
              <div className="flex items-end justify-between mb-3">
                <label htmlFor="bill-slider" className="text-sm font-semibold text-zinc-700">
                  Monthly electricity bill
                </label>
                <span className="text-3xl font-extrabold text-zinc-900 tabular-nums">
                  R{bill.toLocaleString("en-ZA")}
                </span>
              </div>
              <input
                id="bill-slider"
                type="range"
                min={800}
                max={15000}
                step={100}
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
                className="w-full h-3 rounded-full appearance-none cursor-pointer accent-amber-500 bg-zinc-200"
                aria-valuetext={`R${bill} per month`}
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-2">
                <span>R800</span>
                <span>R15,000</span>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-2 text-xs text-zinc-500 bg-white border border-zinc-200 rounded-xl p-4">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Indicative estimate only. Your final quote follows a free site assessment covering
                roof size, angle, shading and consumption patterns — as covered in our FAQs below.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-zinc-950 rounded-3xl p-8 lg:p-10 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-zinc-300">Your Estimated System</h3>
                <span className="bg-amber-500/15 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                  LIVE PREVIEW
                </span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <Sun className="w-8 h-8 text-amber-400 mb-1" />
                <span className="text-5xl font-extrabold gradient-solar-text tabular-nums">
                  {rec.size}
                </span>
                <span className="text-zinc-400 mb-1.5">hybrid system</span>
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                {rec.panels} panels · {rec.battery} backup
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                  <PiggyBank className="w-5 h-5 text-emerald-400" />
                  <div className="mt-2 text-2xl font-extrabold text-emerald-400 tabular-nums">
                    R{rec.monthlySavings.toLocaleString("en-ZA")}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">Saved per month</div>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                  <CalendarClock className="w-5 h-5 text-amber-400" />
                  <div className="mt-2 text-2xl font-extrabold text-amber-400 tabular-nums">
                    {rec.payback}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">Payback period</div>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                  <BatteryCharging className="w-5 h-5 text-orange-400" />
                  <div className="mt-2 text-2xl font-extrabold text-orange-300 tabular-nums">
                    {Math.round(bill * 0.78).toLocaleString("en-ZA")} kWh+
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">Backup during load shedding</div>
                </div>
                <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                  <div className="mt-2 text-2xl font-extrabold text-emerald-300">{rec.co2}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">CO₂ offset</div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 rounded-2xl p-4 text-center">
                <p className="text-sm text-zinc-300">
                  Over 25 years that&apos;s roughly{" "}
                  <span className="font-bold text-amber-400">
                    R{lifetime.toLocaleString("en-ZA")}
                  </span>{" "}
                  back in your pocket.
                </p>
              </div>

              <a
                href="#whatsapp"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3.5 rounded-full hover:from-amber-400 hover:to-orange-500 transition-all"
              >
                Get This Quote via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
