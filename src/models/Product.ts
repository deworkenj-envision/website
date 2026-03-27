import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
const PricingTierSchema = new Schema({ quantity: { type: Number, required: true }, price: { type: Number, required: true } }, { _id: false });
const ProductVariantSchema = new Schema({
  size: { type: String, required: true },
  material: { type: String, required: true },
  finish: { type: String, required: true },
  turnaround: { type: String, required: true },
  tiers: { type: [PricingTierSchema], default: [] },
}, { _id: false });
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  active: { type: Boolean, default: true },
  sizes: { type: [String], default: [] },
  materials: { type: [String], default: [] },
  finishes: { type: [String], default: [] },
  turnarounds: { type: [String], default: [] },
  variants: { type: [ProductVariantSchema], default: [] },
}, { timestamps: true });
export type ProductDocument = InferSchemaType<typeof ProductSchema> & { _id: mongoose.Types.ObjectId };
export const Product: Model<ProductDocument> = mongoose.models.Product || mongoose.model<ProductDocument>("Product", ProductSchema);
