import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSignedUploadParams } from "@/lib/cloudinary";
import { rateLimit } from "@/lib/rate-limit";
const schema = z.object({ folder: z.string().min(1).max(120) });
export async function POST(req: NextRequest) {
  const limit = await rateLimit(req, { limit: 30, windowSec: 60 });
  if (!limit.ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  return NextResponse.json(createSignedUploadParams(parsed.data.folder));
}
