import mongoose, { Schema, Document } from "mongoose";

export type TCharge = {
  name: string;
  email: string;
};
export interface ICharge extends Document {
  name: string;
  email: string;
}

const chargeSchema: Schema = new Schema({
  name: String,
  email: String,
});

export const    Charge = mongoose.model<ICharge>("Charge", chargeSchema);
