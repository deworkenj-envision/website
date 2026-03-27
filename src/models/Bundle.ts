import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
const BundleSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  discountType: { type: String, enum: ["amount", "percent"], default: "percent" },
  discountValue: { type: Number, default: 10 },
  active: { type: Boolean, default: true },
}, { timestamps: true });
export type BundleDocument = InferSchemaType<typeof BundleSchema> & { _id: mongoose.Types.ObjectId };
export const Bundle: Model<BundleDocument> = mongoose.models.Bundle || mongoose.model<BundleDocument>("Bundle", BundleSchema);
