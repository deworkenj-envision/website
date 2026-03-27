import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Proof } from "@/models/Proof";
import { Order } from "@/models/Order";
const schema = z.object({ proofId: z.string().min(1) });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const proof = await Proof.findById(parsed.data.proofId);
  if (!proof) return NextResponse.json({ error: "Proof not found" }, { status: 404 });
  proof.approvalStatus = "approved"; proof.approvedAt = new Date(); await proof.save();
  await Order.findByIdAndUpdate(proof.orderId, { fulfillmentStatus: "printing" });
  return NextResponse.json({ ok: true, proof });
}
