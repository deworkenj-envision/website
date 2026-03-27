import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { rateLimit } from "@/lib/rate-limit";
const schema = z.object({ orderId: z.string().min(1), successUrl: z.string().url(), cancelUrl: z.string().url() });
export async function POST(req: NextRequest) {
  const limit = await rateLimit(req, { limit: 20, windowSec: 60 });
  if (!limit.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await connectToDatabase();
  const order = await Order.findById(parsed.data.orderId);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: parsed.data.successUrl,
    cancel_url: parsed.data.cancelUrl,
    customer_email: order.email,
    line_items: order.items.map((item) => ({
      quantity: item.quantity,
      price_data: { currency: "usd", unit_amount: Math.round(item.unitPrice * 100), product_data: { name: item.productName, metadata: { slug: item.productSlug } } }
    })),
    metadata: { orderId: order._id.toString() }
  });
  order.stripeCheckoutSessionId = session.id;
  await order.save();
  return NextResponse.json({ url: session.url, sessionId: session.id });
}
