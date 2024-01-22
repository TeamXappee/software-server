import mongoose, { Schema, Document } from "mongoose";

export type TFile = {
  name: string;
  user_id: string;
  client_id: string;
  size: number;
  sheets: string[];
};
interface IFile extends Document {
  name: string;
  user_id: string;
  client_id: string;
  size: number;
  sheets: string[];
}

const fileSchema: Schema = new Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true },
  client_id: { type: String, required: true },
  size: { type: String, required: true },
  sheets: { type: String, required: true },
});

export const File = mongoose.model<IFile>("File", fileSchema);
