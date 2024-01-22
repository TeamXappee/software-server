import mongoose, { Schema, Document } from "mongoose";

export type TClient = {
  name: string;
  email: string;
};
export interface IClient extends Document {
  name: string;
  email: string;
}

const clientSchema: Schema = new Schema({
  name: String,
  email: String,
});

export const Client = mongoose.model<IClient>("Client", clientSchema);
