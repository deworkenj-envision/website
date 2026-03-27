import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import { Bundle } from "../../../models/Bundle";

export async function GET() {
  try {
    await connectToDatabase();

    const bundles = await Bundle.find({ active: true }).lean();

    return NextResponse.json({ bundles });
  } catch (error) {
    console.error("Bundles GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bundles" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectToDatabase();

    const bundle = await Bundle.create({
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      productIds: body.productIds || [],
      discountType: body.discountType || "percent",
      discountValue: body.discountValue || 10,
      active: true,
    });

    return NextResponse.json({ bundle });
  } catch (error) {
    console.error("Bundles POST error:", error);
    return NextResponse.json(
      { error: "Failed to create bundle" },
      { status: 500 }
    );
  }
}