import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
export async function GET() {
  await connectToDatabase();
  const products = await Product.find({ active: true }).sort({ createdAt: -1 });
  return NextResponse.json({ products });
}
