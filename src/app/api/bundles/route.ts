import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Bundle } from "@/models/Bundle";
export async function GET() {
  await connectToDatabase();
  const bundles = await Bundle.find({ active: true }).sort({ createdAt: -1 });
  return NextResponse.json({ bundles });
}
