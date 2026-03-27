import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
export async function GET() {
  try { await connectToDatabase(); return NextResponse.json({ ok: true, database: "connected" }); }
  catch (error) { return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "unknown" }, { status: 500 }); }
}
