import { SOLARJOY } from "./content";

export default function Footer() {
  return (
    <footer className="mt-auto bg-black border-t border-white/10 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="bg-white rounded-lg p-2 inline-block">
              <img
                src="/images/solarjoy-logo.jpg"
                alt="SolarJoy logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              20+ years of solar consulting excellence, quality installations & trusted product
              supply. Since 2005 — Ottery, Cape Town.
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Demo experience crafted for SolarJoy — original site:{" "}
              <a
                href="https://solarjoy.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-500 hover:text-amber-400"
              >
                solarjoy.co.za
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {SOLARJOY.servicesList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              {SOLARJOY.products.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>{SOLARJOY.contact.address}</li>
              <li>
                <a
                  href={SOLARJOY.contact.phoneHref}
                  className="hover:text-amber-400 transition-colors"
                >
                  {SOLARJOY.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOLARJOY.contact.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {SOLARJOY.contact.email}
                </a>
              </li>
              <li>WhatsApp: {SOLARJOY.contact.whatsapp}</li>
            </ul>
            <div className="mt-4 text-xs">
              <p className="font-semibold text-zinc-300">Opening times</p>
              {SOLARJOY.contact.hours.map((h, i) => (
                <p key={i}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>Copyright © {new Date().getFullYear()} SOLARJOY. All rights reserved.</p>
          <p>
            Design · Build · Connect — <span className="text-amber-500">Solar Cape Town</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
