import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ error: "Missing webhook config" }, { status: 400 });
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Webhook failed" }, { status: 400 }); }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await connectToDatabase();
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "paid", stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : "", fulfillmentStatus: "review" });
    }
  }
  return NextResponse.json({ received: true });
}
