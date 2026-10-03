"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Zap } from "lucide-react";
import { SOLARJOY } from "./content";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", suburb: "", need: "Solar PV", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          suburb: form.suburb || "Not provided",
          propertyType: form.need.includes("Business") ? "Business" : "Home",
          interest: form.need,
          billRange: "Website form",
          systemSize: "TBC",
          estSavings: "TBC",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSent(true);
      } else {
        setError("Something went wrong — please try again or WhatsApp us directly.");
      }
    } catch {
      setError("Something went wrong — please try again or WhatsApp us directly.");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-500 font-bold text-sm uppercase tracking-[0.2em]">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Ready To Go Solar? Let&apos;s Connect!
            </h2>
            <p className="mt-5 text-lg text-zinc-400 leading-relaxed max-w-lg">
              Whether you need expert guidance for your home or business, or reliable product
              supply for your installations, SolarJoy is your trusted partner for a brighter,
              sustainable future.
            </p>

            <div className="mt-10 space-y-5">
              <a href="#contact" className="flex items-start gap-4 group">
                <span className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">Address</p>
                  <p className="text-white group-hover:text-amber-300 transition-colors">
                    {SOLARJOY.contact.address}
                  </p>
                </div>
              </a>
              <a href={SOLARJOY.contact.phoneHref} className="flex items-start gap-4 group">
                <span className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">Phone</p>
                  <p className="text-white group-hover:text-amber-300 transition-colors">
                    {SOLARJOY.contact.phone}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">Email</p>
                  <p className="text-white">{SOLARJOY.contact.email}</p>
                </div>
              </div>
              <a
                href={`https://wa.me/${SOLARJOY.contact.whatsappIntl}?text=${encodeURIComponent(
                  "Hi SolarJoy! I'd like a quote for solar at my home."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <span className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">WhatsApp</p>
                  <p className="text-white group-hover:text-emerald-300 transition-colors">
                    {SOLARJOY.contact.whatsapp}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <span className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-400">Opening Times</p>
                  {SOLARJOY.contact.hours.map((h, i) => (
                    <p key={i} className="text-white">
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick form — feeds the same lead pipeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-8 backdrop-blur">
              {sent ? (
                <div className="text-center py-14">
                  <span className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-emerald-400" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold">Lead Captured!</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    In the automated setup, this enquiry would already be in SolarJoy&apos;s
                    WhatsApp inbox with a reference number — and you&apos;d get an instant
                    confirmation message. That&apos;s the power of the demo you just saw.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold">Request a Consultation</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Drop your details — they go straight into the same automated pipeline the
                    WhatsApp assistant uses.
                  </p>
                  <form onSubmit={submit} className="mt-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name *"
                        className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400 transition-colors"
                        aria-label="Your name"
                        required
                      />
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Phone number *"
                        type="tel"
                        className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400 transition-colors"
                        aria-label="Phone number"
                        required
                      />
                    </div>
                    <input
                      value={form.suburb}
                      onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                      placeholder="Suburb / area (e.g. Rondebosch)"
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400 transition-colors"
                      aria-label="Suburb"
                    />
                    <select
                      value={form.need}
                      onChange={(e) => setForm({ ...form, need: e.target.value })}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-400 transition-colors [&>option]:text-zinc-900"
                      aria-label="What do you need?"
                    >
                      <option>Solar PV + Battery Backup</option>
                      <option>Solar Water Heating</option>
                      <option>Heat Pump</option>
                      <option>Water Harvesting</option>
                      <option>Business Solar Solution</option>
                      <option>Product Supply Enquiry</option>
                    </select>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project (optional)"
                      rows={3}
                      className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400 transition-colors resize-none"
                      aria-label="Message"
                    />
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-6 py-3.5 rounded-xl hover:from-amber-400 hover:to-orange-500 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send My Enquiry
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
