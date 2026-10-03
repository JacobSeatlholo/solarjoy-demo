import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Force dynamic so the demo always shows fresh leads
export const dynamic = "force-dynamic";

function generateReference(): string {
  const now = new Date();
  const y = now.getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SJ-${y}-${rand}`;
}

// GET /api/leads — list captured leads (used by the live demo dashboard)
export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
    });
    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to load leads" },
      { status: 500 }
    );
  }
}

// POST /api/leads — called by the WhatsApp assistant at the end of the flow
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, suburb, propertyType, interest, billRange, systemSize, estSavings } = body;

    if (!name || !phone || !suburb) {
      return NextResponse.json(
        { ok: false, error: "Name, phone and suburb are required" },
        { status: 400 }
      );
    }

    const reference = generateReference();
    const lead = await db.lead.create({
      data: {
        reference,
        name: String(name).slice(0, 80),
        phone: String(phone).slice(0, 40),
        suburb: String(suburb).slice(0, 80),
        propertyType: String(propertyType || "Home").slice(0, 40),
        interest: String(interest || "Solar PV Quote").slice(0, 80),
        billRange: String(billRange || "Not specified").slice(0, 40),
        systemSize: String(systemSize || "TBC").slice(0, 40),
        estSavings: String(estSavings || "TBC").slice(0, 80),
        source: "whatsapp-assistant",
      },
    });

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
