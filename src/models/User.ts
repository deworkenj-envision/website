import mongoose, { InferSchemaType, Model, Schema } from "mongoose";
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer", index: true },
}, { timestamps: true });
export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };
export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
