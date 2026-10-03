"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1200);
    const t2 = setTimeout(() => setBubble(true), 3500);
    const t3 = setTimeout(() => setBubble(false), 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, x: 24, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.9 }}
                className="relative bg-white text-zinc-800 rounded-2xl rounded-br-sm shadow-2xl px-4 py-3 max-w-[240px] border border-zinc-100"
              >
                <button
                  onClick={() => setBubble(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-zinc-100 hover:bg-zinc-200 rounded-full flex items-center justify-center"
                  aria-label="Dismiss message"
                >
                  <X className="w-3.5 h-3.5 text-zinc-500" />
                </button>
                <p className="text-[13px] leading-snug">
                  👋 <b>Hi!</b> Want an instant solar estimate? Chat with our assistant now.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="#whatsapp"
            onClick={() => setBubble(false)}
            aria-label="Chat with SolarJoy on WhatsApp"
            className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1fb958] rounded-full shadow-xl flex items-center justify-center transition-colors"
          >
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <MessageCircle className="w-7 h-7 text-white relative" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
