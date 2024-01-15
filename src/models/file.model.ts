import mongoose, { Schema, Document } from "mongoose";

interface IFile extends Document {
  channelName: String;
  originalname: string;
  type: ".xlsx" | ".csv";
}

const fileSchema: Schema = new Schema({
  channelName: { type: String, required: false },
  originalname: { type: String, required: true },
  type: { type: String, required: false },
});

export const File = mongoose.model<IFile>("File", fileSchema);
