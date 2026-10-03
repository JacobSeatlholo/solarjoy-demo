"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { SOLARJOY } from "./content";

const links = [
  { label: "Services", href: "#services" },
  { label: "Why SolarJoy", href: "#why" },
  { label: "Savings", href: "#calculator" },
  { label: "WhatsApp Demo", href: "#whatsapp" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <div className="bg-white rounded-lg p-1.5 shadow-md">
              <Image
                src="/images/solarjoy-logo.jpg"
                alt="SolarJoy logo — Design, Build, Connect"
                width={130}
                height={44}
                className="h-8 md:h-9 w-auto"
                priority
              />
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-amber-400 rounded-md hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SOLARJOY.contact.phoneHref}
              className="flex items-center gap-2 text-sm text-zinc-200 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              {SOLARJOY.contact.phone}
            </a>
            <a
              href="#whatsapp"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:from-amber-400 hover:to-orange-500 transition-all solar-glow"
            >
              <MessageCircle className="w-4 h-4" />
              Instant Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white rounded-md hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/98 backdrop-blur-md border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-zinc-200 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#whatsapp"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-5 py-3 rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                Get Instant Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
