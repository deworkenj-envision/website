import { NextResponse } from "next/server";
import { z } from "zod";
import { trackShipment } from "@/lib/easypost";
const schema = z.object({ trackingCode: z.string().min(1), carrier: z.string().min(1) });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try { const tracker = await trackShipment(parsed.data.trackingCode, parsed.data.carrier); return NextResponse.json({ tracker }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Tracking failed" }, { status: 500 }); }
}
