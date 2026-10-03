"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Zap,
  Clock,
  BellRing,
  ClipboardList,
  CalendarCheck,
  Bot,
  RotateCcw,
  Phone,
  Video,
  ChevronLeft,
  MoreVertical,
  CheckCheck,
  BadgeCheck,
  Battery,
  Droplets,
  Home,
  Building2,
} from "lucide-react";
import { recommendSystem } from "./content";

/* ---------------------------------- types --------------------------------- */

type QuickReply = { label: string; icon?: React.ReactNode };

type Msg = {
  id: number;
  from: "bot" | "user";
  type: "text" | "quote" | "lead-alert" | "system";
  text?: string;
  time: string;
  quick?: QuickReply[];
  rec?: ReturnType<typeof recommendSystem>;
  lead?: {
    reference: string;
    name: string;
    suburb: string;
    billRange: string;
    interest: string;
    systemSize: string;
    estSavings: string;
  };
};

type CapturedLead = {
  id: string;
  reference: string;
  name: string;
  suburb: string;
  billRange: string;
  systemSize: string;
  interest: string;
  createdAt: string;
};

type Step =
  | "intro"
  | "welcome"
  | "property"
  | "bill"
  | "suburb"
  | "name"
  | "phone"
  | "calculating"
  | "saving"
  | "done";

/* --------------------------------- helpers -------------------------------- */

const nowTime = () =>
  new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false });

const BILL_MAP: Record<string, number> = {
  "< R1,500": 1400,
  "R1,500 – R3,000": 2500,
  "R3,000 – R5,000": 4200,
  "R5,000+": 6500,
};

/* ------------------------------- sub pieces ------------------------------- */

function TypingBubble() {
  return (
    <div className="flex items-center gap-1 bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot w-2 h-2 rounded-full bg-zinc-400 inline-block"
        />
      ))}
    </div>
  );
}

function Ticks() {
  return (
    <span className="inline-flex items-center ml-1 align-middle">
      <CheckCheck className="w-4 h-4 text-sky-500" />
    </span>
  );
}

/* ------------------------------ main component ----------------------------- */

export default function WhatsAppShowcase() {
  const [step, setStep] = useState<Step>("intro");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [interest, setInterest] = useState("Solar PV Quote");
  const [billRange, setBillRange] = useState("R1,500 – R3,000");
  const [suburb, setSuburb] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [leads, setLeads] = useState<CapturedLead[]>([]);
  const [humanNotice, setHumanNotice] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // property type tracking (home vs business)
  const propertyTypeRef = useRef("Home");
  const setPropertyType = (v: string) => {
    propertyTypeRef.current = v;
  };

  // Authoritative lead data immune to React state closure staleness
  const leadRef = useRef({
    name: "",
    phone: "",
    suburb: "",
    billRange: "",
    interest: "Solar PV Quote",
  });

  const pushUser = useCallback((msg: Omit<Msg, "id" | "from" | "time">) => {
    setMessages((m) => [...m, { ...msg, id: ++idRef.current, from: "user", time: nowTime() }]);
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.ok) setLeads(data.leads);
    } catch {
      /* demo-safe */
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (!cancelled && data.ok) setLeads(data.leads);
      } catch {
        /* demo-safe */
      }
    })();
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  // auto scroll chat
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const botSay = useCallback(
    (text: string, quick?: QuickReply[], delay = 900) => {
      setTyping(true);
      const t1 = setTimeout(() => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          { id: ++idRef.current, from: "bot", type: quick ? "text" : "text", text, time: nowTime(), quick },
        ]);
      }, delay);
      timersRef.current.push(t1);
    },
    []
  );

  const startDemo = () => {
    clearTimers();
    setMessages([]);
    setStep("welcome");
    setInterest("Solar PV Quote");
    setHumanNotice(false);
    leadRef.current = { name: "", phone: "", suburb: "", billRange: "", interest: "Solar PV Quote" };
    idRef.current = 0;
    botSay(
      "Hi there! 👋 Welcome to SolarJoy — I'm Sunny, your solar assistant. I can give you an instant estimate and book your free site assessment in under a minute. How can I help today?",
      [
        { label: "Get a Quote", icon: <Zap className="w-4 h-4" /> },
        { label: "Beat Load Shedding", icon: <Battery className="w-4 h-4" /> },
        { label: "Water Heating", icon: <Droplets className="w-4 h-4" /> },
        { label: "Talk to a Human", icon: <Phone className="w-4 h-4" /> },
      ],
      1100
    );
  };

  const handleQuick = (label: string) => {
    pushUser({ type: "text", text: label });
    setMessages((m) => m.map((x) => (x.quick ? { ...x, quick: undefined } : x)));

    if (step === "welcome") {
      leadRef.current.interest =
        label === "Get a Quote"
          ? "Solar PV Quote"
          : label === "Beat Load Shedding"
            ? "Backup / Battery System"
            : label === "Water Heating"
              ? "Solar Water Heating / Heat Pump"
              : "Callback Request";
      if (label === "Get a Quote") {
        setInterest("Solar PV Quote");
        botSay("Great choice! ⚡ Is this for your home or your business?", [
          { label: "My Home", icon: <Home className="w-4 h-4" /> },
          { label: "My Business", icon: <Building2 className="w-4 h-4" /> },
        ]);
        setStep("property");
      } else if (label === "Beat Load Shedding") {
        setInterest("Backup / Battery System");
        botSay(
          "No more darkness! 🔋 A backup-first system (hybrid inverter + lithium battery) keeps your essentials running during load shedding — and you can add solar panels later. Home or business?",
          [
            { label: "My Home", icon: <Home className="w-4 h-4" /> },
            { label: "My Business", icon: <Building2 className="w-4 h-4" /> },
          ]
        );
        setStep("property");
      } else if (label === "Water Heating") {
        setInterest("Solar Water Heating / Heat Pump");
        botSay(
          "Hot water from the sun ☀️ — SolarJoy geysers & heat pumps cut water heating costs by up to 75%. Is this for your home or business?",
          [
            { label: "My Home", icon: <Home className="w-4 h-4" /> },
            { label: "My Business", icon: <Building2 className="w-4 h-4" /> },
          ]
        );
        setStep("property");
      } else {
        setInterest("Callback Request");
        setHumanNotice(true);
        botSay(
          "No problem! Our human team is available Mon–Thu 8:00–17:30 and Fri 8:00–12:30 & 14:00–17:30. 📞 Share your details and we'll call you back within one business hour — or I can keep going and prepare an instant estimate while you wait?",
          [
            { label: "Prepare My Estimate", icon: <Zap className="w-4 h-4" /> },
            { label: "Just Call Me Back", icon: <Phone className="w-4 h-4" /> },
          ]
        );
        setStep("property");
      }
      return;
    }

    if (step === "property") {
      if (label === "Just Call Me Back") {
        botSay("Perfect 👍 What's your suburb or area (e.g. Rondebosch, Durbanville)?");
        setStep("suburb");
        return;
      }
      botSay(
        "Awesome. To size your system correctly, roughly what is your average monthly electricity bill?",
        [
          { label: "< R1,500" },
          { label: "R1,500 – R3,000" },
          { label: "R3,000 – R5,000" },
          { label: "R5,000+" },
        ]
      );
      setStep("bill");
      return;
    }

    if (step === "bill") {
      setBillRange(label);
      leadRef.current.billRange = label;
      botSay(`Noted — ${label} per month. 📍 Which suburb or area is the property in?`);
      setStep("suburb");
      return;
    }
  };

  const handleTextSubmit = () => {
    const val = inputVal.trim();
    if (!val) return;
    setInputVal("");

    if (step === "suburb") {
      setSuburb(val);
      leadRef.current.suburb = val;
      pushUser({ type: "text", text: val });
      botSay(`Thanks! And your first name? 🙂`);
      setStep("name");
    } else if (step === "name") {
      setName(val);
      leadRef.current.name = val;
      pushUser({ type: "text", text: val });
      botSay(`Nice to meet you, ${val}! 📱 What's the best cellphone number for your quote?`);
      setStep("phone");
    } else if (step === "phone") {
      setPhone(val);
      leadRef.current.phone = val;
      pushUser({ type: "text", text: val });
      // calculating
      setStep("calculating");
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        const rec = recommendSystem(BILL_MAP[billRange] ?? 2500);
        setMessages((m) => [
          ...m,
          {
            id: ++idRef.current,
            from: "bot",
            type: "quote",
            time: nowTime(),
            rec,
            text: `Here's your instant estimate, ${name}:`,
          },
        ]);
        // saving lead
        setStep("saving");
        saveLead(rec);
      }, 1800);
      timersRef.current.push(t);
    }
  };

  const saveLead = async (rec: ReturnType<typeof recommendSystem>) => {
    const L = leadRef.current;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: L.name,
          phone: L.phone,
          suburb: L.suburb,
          propertyType: propertyTypeRef.current,
          interest: L.interest,
          billRange: L.billRange || "Not specified",
          systemSize: rec.size,
          estSavings: `R${rec.monthlySavings.toLocaleString("en-ZA")}/month`,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setReference(data.lead.reference);
        setTyping(true);
        const t = setTimeout(() => {
          setTyping(false);
          setMessages((m) => [
            ...m,
            {
              id: ++idRef.current,
              from: "bot",
              type: "text",
              text: `✅ You're all set, ${L.name}! Your details & estimate have been sent to the SolarJoy team. A solar expert will WhatsApp you within 1 business hour to confirm your free site assessment. Your reference: ${data.lead.reference}`,
              time: nowTime(),
            },
            {
              id: ++idRef.current,
              from: "bot",
              type: "lead-alert",
              time: nowTime(),
              lead: {
                reference: data.lead.reference,
                name: L.name,
                suburb: L.suburb,
                billRange: L.billRange || "Not specified",
                interest: L.interest,
                systemSize: rec.size,
                estSavings: `R${rec.monthlySavings.toLocaleString("en-ZA")}/mo`,
              },
            },
          ]);
          setStep("done");
          fetchLeads();
        }, 1400);
        timersRef.current.push(t);
      }
    } catch {
      setStep("done");
    }
  };

  const inputPlaceholder =
    step === "suburb"
      ? "Type your suburb…"
      : step === "name"
        ? "Type your first name…"
        : step === "phone"
          ? "e.g. 082 123 4567"
          : "Type a message";

  return (
    <section id="whatsapp" className="py-20 lg:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm uppercase tracking-[0.2em] rounded-full px-4 py-1.5">
            <MessageCircle className="w-4 h-4" />
            WhatsApp Automation Demo
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Every Enquiry Answered In Seconds.
            <span className="block text-emerald-400">Even At 2AM.</span>
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            This is a live, working simulation of the WhatsApp assistant we&apos;ll deploy for
            SolarJoy. Try it — click the quick replies, answer like a customer would, and watch
            yourself become a captured, qualified lead in the team&apos;s inbox on the right.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: explanation */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-emerald-400" />
                How the automation works
              </h3>
              <ol className="mt-5 space-y-4">
                {[
                  {
                    icon: <Clock className="w-4 h-4" />,
                    title: "Instant reply, 24/7",
                    body: "Customer clicks your WhatsApp button — assistant greets and engages in under 5 seconds. No lead waits, no lead lost.",
                  },
                  {
                    icon: <ClipboardList className="w-4 h-4" />,
                    title: "Smart pre-qualification",
                    body: "It captures property type, monthly bill, suburb and contact details — exactly what the SolarJoy team needs to quote accurately.",
                  },
                  {
                    icon: <Zap className="w-4 h-4" />,
                    title: "Instant estimate",
                    body: "The assistant recommends a system size and savings estimate on the spot — the same logic as the calculator above.",
                  },
                  {
                    icon: <BellRing className="w-4 h-4" />,
                    title: "Team alert + CRM entry",
                    body: "The qualified lead lands in SolarJoy's inbox instantly with a reference number — ready for follow-up and site booking.",
                  },
                ].map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      {s.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{s.title}</p>
                      <p className="text-sm text-zinc-400 leading-relaxed mt-0.5">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "<5s", l: "Response time" },
                { v: "24/7", l: "Always on" },
                { v: "100%", l: "Leads captured" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/[0.05] border border-white/10 rounded-xl p-3 text-center"
                >
                  <div className="text-xl font-extrabold text-emerald-400">{s.v}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-500/[0.07] border border-emerald-500/25 rounded-2xl p-5">
              <p className="text-sm text-zinc-300 leading-relaxed">
                <span className="font-bold text-emerald-400">Why this matters:</span> most solar
                websites bury a contact form and reply the next day. With WhatsApp automation,
                Mahmood&apos;s team wakes up to qualified, referenced leads instead of missed calls
                and half-filled forms.
              </p>
            </div>
          </motion.div>

          {/* CENTER: phone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-[400px]">
              <div className="rounded-[2.6rem] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
                {/* status bar */}
                <div className="bg-[#008069] px-5 pt-3 pb-1 flex justify-between items-center text-[11px] text-white/90">
                  <span className="font-semibold">
                    {new Date().toLocaleTimeString("en-ZA", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="tracking-tighter">▂▄▆</span>
                    <span className="font-semibold">86%</span>
                  </span>
                </div>
                {/* wa header */}
                <div className="bg-[#008069] px-3 pb-3 pt-1 flex items-center gap-3">
                  <ChevronLeft className="w-5 h-5 text-white/90" />
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <img
                      src="/images/solarjoy-logo.jpg"
                      alt="SolarJoy"
                      className="w-8 h-8 object-contain rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold text-[15px] leading-tight flex items-center gap-1">
                      SolarJoy
                      <BadgeCheck className="w-3.5 h-3.5 text-sky-300" />
                    </p>
                    <p className="text-emerald-100/90 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                      online · replies instantly
                    </p>
                  </div>
                  <Video className="w-5 h-5 text-white/90" />
                  <Phone className="w-4 h-4 text-white/90" />
                  <MoreVertical className="w-5 h-5 text-white/90" />
                </div>

                {/* chat area */}
                <div
                  ref={scrollRef}
                  className="wa-chat-bg wa-scroll h-[460px] overflow-y-auto px-3 py-4 space-y-2.5"
                >
                  {step === "intro" ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4">
                        <img
                          src="/images/solarjoy-logo.jpg"
                          alt="SolarJoy logo"
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        Imagine a customer opening WhatsApp with SolarJoy…
                      </p>
                      <button
                        onClick={startDemo}
                        className="mt-5 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Start the Conversation
                      </button>
                      <p className="mt-3 text-xs text-zinc-400">
                        (This simulates the real experience)
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-3">
                        <span className="bg-[#e2f3ea] text-zinc-500 text-[11px] px-3 py-1 rounded-lg shadow-sm">
                          TODAY
                        </span>
                      </div>
                      {messages.map((m) =>
                        m.type === "quote" && m.rec ? (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="flex"
                          >
                            <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm p-4 w-[92%]">
                              <p className="text-[13.5px] text-zinc-800 leading-relaxed">
                                {m.text}
                              </p>
                              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                                <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600">
                                  Recommended System
                                </p>
                                <div className="mt-1.5 flex items-baseline gap-2">
                                  <span className="text-2xl font-extrabold text-zinc-900">
                                    {m.rec.size}
                                  </span>
                                  <span className="text-xs text-zinc-500">
                                    {m.rec.panels} panels · {m.rec.battery}
                                  </span>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <p className="text-zinc-500">Est. savings</p>
                                    <p className="font-bold text-emerald-600">
                                      R{m.rec.monthlySavings.toLocaleString("en-ZA")}/mo
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-zinc-500">Payback</p>
                                    <p className="font-bold text-zinc-800">{m.rec.payback}</p>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2 text-[10.5px] text-zinc-400">
                                Indicative only — final quote after free site assessment.
                              </p>
                              <p className="text-right text-[10.5px] text-zinc-400 mt-1">
                                {m.time}
                              </p>
                            </div>
                          </motion.div>
                        ) : m.type === "lead-alert" && m.lead ? (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="flex justify-end"
                          >
                            <div className="w-[92%] bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl rounded-br-sm shadow-md p-4 text-white">
                              <div className="flex items-center gap-2">
                                <BellRing className="w-4 h-4 text-amber-300" />
                                <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-100">
                                  Team Notification · New Lead
                                </p>
                              </div>
                              <div className="mt-2.5 space-y-1 text-[13px]">
                                <p>
                                  <span className="text-emerald-200">Name:</span>{" "}
                                  <b>{m.lead.name}</b>
                                </p>
                                <p>
                                  <span className="text-emerald-200">Area:</span>{" "}
                                  <b>{m.lead.suburb}</b>
                                </p>
                                <p>
                                  <span className="text-emerald-200">Bill:</span>{" "}
                                  <b>{m.lead.billRange}</b>
                                </p>
                                <p>
                                  <span className="text-emerald-200">Interest:</span>{" "}
                                  <b>{m.lead.interest}</b>
                                </p>
                                <p>
                                  <span className="text-emerald-200">System:</span>{" "}
                                  <b>{m.lead.systemSize}</b> ·{" "}
                                  <b>{m.lead.estSavings}</b>
                                </p>
                                <p className="pt-1 border-t border-white/20 mt-1.5 text-[11px] text-emerald-100">
                                  Ref <b>{m.lead.reference}</b> · saved to CRM ✅
                                </p>
                              </div>
                              <p className="text-right text-[10.5px] text-emerald-100/80 mt-1">
                                {m.time}
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`relative max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${
                                m.from === "user"
                                  ? "bg-[#d9fdd3] rounded-br-sm wa-tail-out"
                                  : "bg-white rounded-tl-sm wa-tail-in"
                              }`}
                            >
                              <p className="text-[13.5px] text-zinc-800 leading-relaxed whitespace-pre-wrap">
                                {m.text}
                              </p>
                              {m.quick && (
                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                  {m.quick.map((q, qi) => (
                                    <button
                                      key={qi}
                                      onClick={() => {
                                        if (q.label === "My Home") setPropertyType("Home");
                                        if (q.label === "My Business") setPropertyType("Business");
                                        handleQuick(q.label);
                                      }}
                                      className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                                    >
                                      {q.icon}
                                      {q.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                              <div
                                className={`text-right text-[10px] text-zinc-400 flex items-center justify-end gap-0.5 ${
                                  m.quick ? "mt-1.5" : "mt-0.5"
                                }`}
                              >
                                {m.time}
                                {m.from === "user" && <Ticks />}
                              </div>
                            </div>
                          </motion.div>
                        )
                      )}
                      {typing && (
                        <div className="flex">
                          <TypingBubble />
                        </div>
                      )}
                      {step === "done" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-center pt-1"
                        >
                          <button
                            onClick={startDemo}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-white/80 border border-emerald-200 px-4 py-2 rounded-full hover:bg-white transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Replay the demo
                          </button>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                {/* input bar */}
                <div className="bg-[#f0f2f5] px-3 py-2.5 flex items-center gap-2">
                  {step === "intro" ? (
                    <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-zinc-400">
                      Type a message
                    </div>
                  ) : step === "suburb" || step === "name" || step === "phone" ? (
                    <>
                      <input
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                        placeholder={inputPlaceholder}
                        className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-zinc-800 outline-none border border-transparent focus:border-emerald-400"
                        aria-label="Chat message input"
                      />
                      <button
                        onClick={handleTextSubmit}
                        className="w-10 h-10 rounded-full bg-[#008069] hover:bg-[#017561] text-white flex items-center justify-center shrink-0 transition-colors"
                        aria-label="Send message"
                      >
                        <Send className="w-4.5 h-4.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 bg-white rounded-full px-4 py-2.5 text-sm text-zinc-400">
                      {step === "done" ? "Conversation complete ✅" : "Tap a quick reply above ↑"}
                    </div>
                  )}
                </div>
              </div>
              {/* phone caption */}
              <p className="text-center text-xs text-zinc-500 mt-4">
                {humanNotice
                  ? "Human handoff built-in — the assistant still captures every detail."
                  : "Live simulation — every answer below is stored as a real lead in this demo."}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: team inbox */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-emerald-500/10 border-b border-white/10 px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-emerald-400" />
                    SolarJoy Team Inbox
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Leads captured by the assistant
                  </p>
                </div>
                <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full tabular-nums">
                  {leads.length}
                </span>
              </div>
              <div className="max-h-[420px] overflow-y-auto divide-y divide-white/5 wa-scroll">
                {leads.length === 0 ? (
                  <div className="px-5 py-10 text-center text-sm text-zinc-500">
                    <CalendarCheck className="w-8 h-8 mx-auto text-zinc-600 mb-3" />
                    No leads yet.
                    <br />
                    Complete the chat to watch one appear here — instantly.
                  </div>
                ) : (
                  leads.map((l) => (
                    <div key={l.id} className="px-4 py-3.5 hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm text-white truncate">{l.name}</p>
                        <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                          {l.reference}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {l.suburb} · {l.billRange}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/25 px-2 py-0.5 rounded-full">
                          {l.systemSize}
                        </span>
                        <span className="text-[10px] bg-white/[0.06] text-zinc-300 border border-white/10 px-2 py-0.5 rounded-full truncate max-w-[150px]">
                          {l.interest}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  In production this syncs to email, Google Sheets or your CRM — plus an instant
                  WhatsApp alert to Mahmood&apos;s phone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
