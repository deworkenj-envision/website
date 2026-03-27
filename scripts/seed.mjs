import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");
const ProductSchema = new mongoose.Schema({
  name: String, slug: { type: String, unique: true }, category: String, description: String, image: String, active: Boolean,
  sizes: [String], materials: [String], finishes: [String], turnarounds: [String],
  variants: [{ size: String, material: String, finish: String, turnaround: String, tiers: [{ quantity: Number, price: Number }] }],
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
await mongoose.connect(MONGODB_URI, { bufferCommands: false });
await Product.updateOne(
  { slug: "premium-business-cards" },
  { $set: {
    name: "Premium Business Cards", slug: "premium-business-cards", category: "Business Cards",
    description: "Luxury business cards with premium stocks and finishes.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    active: true,
    sizes: ["3.5x2", "square", "slim"], materials: ["16pt Matte", "32pt Silk", "Cotton"],
    finishes: ["Matte", "Soft Touch", "Spot UV"], turnarounds: ["Standard", "Rush", "Same Day"],
    variants: [
      { size: "3.5x2", material: "16pt Matte", finish: "Soft Touch", turnaround: "Standard", tiers: [{ quantity: 100, price: 29.99 }, { quantity: 250, price: 54.99 }, { quantity: 500, price: 89.99 }, { quantity: 1000, price: 159.99 }] },
      { size: "3.5x2", material: "32pt Silk", finish: "Soft Touch", turnaround: "Standard", tiers: [{ quantity: 100, price: 49.99 }, { quantity: 250, price: 84.99 }, { quantity: 500, price: 139.99 }, { quantity: 1000, price: 249.99 }] }
    ]
  }},
  { upsert: true }
);
console.log("Seed complete");
await mongoose.disconnect();
