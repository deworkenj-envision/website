import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productSlug: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  configuration: { size: String, material: String, finish: String, turnaround: String },
  upsells: [{ code: String, label: String, price: Number }],
}, { _id: false });
const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  email: { type: String, required: true, lowercase: true },
  items: { type: [OrderItemSchema], required: true },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
  fulfillmentStatus: { type: String, enum: ["pending", "review", "printing", "shipped", "delivered", "cancelled"], default: "pending" },
  stripeCheckoutSessionId: { type: String, default: "" },
  stripePaymentIntentId: { type: String, default: "" },
  trackingCarrier: { type: String, default: "" },
  trackingNumber: { type: String, default: "" },
}, { timestamps: true });
export type OrderDocument = InferSchemaType<typeof OrderSchema> & { _id: mongoose.Types.ObjectId };
export const Order: Model<OrderDocument> = mongoose.models.Order || mongoose.model<OrderDocument>("Order", OrderSchema);
