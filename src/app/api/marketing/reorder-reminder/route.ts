import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
const schema = z.object({ email: z.string().email(), productName: z.string().min(1), reorderUrl: z.string().url() });
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await sendEmail({ to: parsed.data.email, subject: `Time to reorder ${parsed.data.productName}?`, html: `<p>Reorder your ${parsed.data.productName} here: <a href="${parsed.data.reorderUrl}">Reorder now</a></p>` });
  return NextResponse.json({ ok: true });
}
