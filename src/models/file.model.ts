import mongoose, { Schema, Document } from "mongoose";

export type TFile = {
  fileName: string;
  user_email: string;
  client_id?: string;
  size: number;
  notes?: string;
};
interface IFile extends Document {
  fileName: string;
  user_email: string;
  client_id?: string;
  size: number;
  notes?: string;
}

const fileSchema: Schema = new Schema({
  fileName: { type: String, required: true },
  user_email: { type: String, required: true },
  client_id: { type: String, required: false },
  size: { type: String, required: true },
  notes: { type: String, required: false },
});

export const File = mongoose.model<IFile>("File", fileSchema);
