import { connectToDatabase } from "../../../lib/db";
import { Product } from "../../../models/Product";
import { calculatePrice } from "../../../lib/pricing";
import { rateLimit } from "../../../lib/rate-limit";
import { getUpsells } from "../../../lib/upsells";
export async function GET() {
  await connectToDatabase();
  const bundles = await Bundle.find({ active: true }).sort({ createdAt: -1 });
  return NextResponse.json({ bundles });
}
