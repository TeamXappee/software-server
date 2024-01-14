import mongoose, { Schema, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  email: string;
  selrouserid: number;
  city?: string;
  firstname?: string;
  lastname?: string;
  state?: string;
}

const customerSchema: Schema = new Schema({
  name: String,
  email: String,
  selrouserid: Number,
  city: { type: String, required: false },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  state: { type: String, required: false },
});

export const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
