import mongoose, { Schema, Document } from "mongoose";

interface IFile extends Document {
  customer_id: mongoose.Types.ObjectId;
  name: string;
  type: ".xlsx" | ".csv";
}

const fileSchema: Schema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  name: { type: String, required: true },
  type: { type: String, required: false },
});

export const File = mongoose.model<IFile>("File", fileSchema);
