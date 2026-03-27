import { ProductDocument } from "@/models/Product";
export function calculatePrice(product: ProductDocument, input: { size: string; material: string; finish: string; turnaround: string; quantity: number }) {
  const variant = product.variants.find((v) =>
    v.size === input.size && v.material === input.material && v.finish === input.finish && v.turnaround === input.turnaround
  );
  if (!variant) throw new Error("No matching pricing variant found");
  const tiers = [...variant.tiers].sort((a, b) => a.quantity - b.quantity);
  const matched = [...tiers].reverse().find((tier) => input.quantity >= tier.quantity) || tiers[0];
  if (!matched) throw new Error("No pricing tiers configured");
  const unitPrice = matched.price / matched.quantity;
  const totalPrice = Number((unitPrice * input.quantity).toFixed(2));
  return { unitPrice: Number(unitPrice.toFixed(4)), totalPrice, matchedTierQuantity: matched.quantity };
}
