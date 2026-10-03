"use client";

import Image from "next/image";
import { SOLARJOY } from "./content";

export default function TrustBar() {
  const logos = [...SOLARJOY.partners, ...SOLARJOY.partners];
  return (
    <section className="bg-zinc-950 border-y border-white/5 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-zinc-500 font-medium">
          Trusted by Industry Leaders & Valued Partners
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-14 items-center px-7">
          {logos.map((p, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center" title={p.name}>
              <Image
                src={p.src}
                alt={`${p.name} — SolarJoy partner logo`}
                width={110}
                height={48}
                className="h-9 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                style={{ filter: "grayscale(0.2)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
