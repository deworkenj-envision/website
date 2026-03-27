import { NextResponse } from "next/server";
import { z } from "zod";
import { createShipmentQuote } from "@/lib/easypost";
const schema = z.object({ shipment: z.any() });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try { const quote = await createShipmentQuote(parsed.data.shipment); return NextResponse.json({ quote }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Quote failed" }, { status: 500 }); }
}
