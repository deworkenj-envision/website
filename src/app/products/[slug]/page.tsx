import { cookies } from "next/headers";
import { normalizeVariant } from "@/lib/ab-tests";
import { PremiumOrderExperience } from "@/components/PremiumOrderExperience";
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const variant = normalizeVariant(cookieStore.get("plx_cta_variant")?.value);
  return <main style={{maxWidth: 1200, margin: "0 auto", padding: 24}}><PremiumOrderExperience slug={slug} ctaVariant={variant} /></main>;
}
