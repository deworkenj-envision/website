export function getUpsells(input: { finish: string; quantity: number; material: string }) {
  const upsells: { code: string; label: string; price: number }[] = [];
  if (input.finish === "Soft Touch") upsells.push({ code: "foil", label: "Add Gold Foil", price: 24 });
  if (input.quantity < 500) upsells.push({ code: "bulk", label: "Upgrade to 500 for better value", price: 18 });
  if (input.material === "16pt Matte") upsells.push({ code: "thick-stock", label: "Upgrade to 32pt Silk", price: 20 });
  return upsells;
}
