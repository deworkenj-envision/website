import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { calculatePrice } from "@/lib/pricing";
import { rateLimit } from "@/lib/rate-limit";
import { getUpsells } from "@/lib/upsells";
const schema = z.object({ slug: z.string().min(1), size: z.string().min(1), material: z.string().min(1), finish: z.string().min(1), turnaround: z.string().min(1), quantity: z.number().int().positive() });
export async function POST(req: NextRequest) {
  const limit = await rateLimit(req, { limit: 80, windowSec: 60 });
  if (!limit.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const { slug, ...input } = parsed.data;
  const product = await Product.findOne({ slug, active: true });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  const pricing = calculatePrice(product, input);
  const upsells = getUpsells({ finish: input.finish, quantity: input.quantity, material: input.material });
  return NextResponse.json({ product: { id: product._id, name: product.name, slug: product.slug }, pricing, upsells });
}
