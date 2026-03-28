import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "../../../lib/stripe";
import { connectToDatabase } from "../../../lib/db";
import { Order } from "../../../models/Order";
import { rateLimit } from "../../../lib/rate-limit";

const CheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      price: z.number(),
    })
  ),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const rl = await rateLimit(req);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = CheckoutSchema.parse(body);

    await connectToDatabase();

    const total = parsed.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      email: parsed.email,
      items: parsed.items,
      total,
      status: "pending",
    });

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: parsed.email,
      line_items: parsed.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productId,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}