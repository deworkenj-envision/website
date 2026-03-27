import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
const schema = z.object({ email: z.string().email(), productName: z.string().min(1), cartUrl: z.string().url() });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await sendEmail({ to: parsed.data.email, subject: `You left ${parsed.data.productName} in your cart`, html: `<p>Your ${parsed.data.productName} is still waiting. <a href="${parsed.data.cartUrl}">Return to cart</a></p>` });
  return NextResponse.json({ ok: true });
}
