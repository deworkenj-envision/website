import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
const ProofSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true, index: true },
  designId: { type: String, default: "" },
  pdfUrl: { type: String, required: true },
  previewImage: { type: String, default: "" },
  approvalStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
  approvedAt: { type: Date },
}, { timestamps: true });
export type ProofDocument = InferSchemaType<typeof ProofSchema> & { _id: mongoose.Types.ObjectId };
export const Proof: Model<ProofDocument> = mongoose.models.Proof || mongoose.model<ProofDocument>("Proof", ProofSchema);
