import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
  sku: string;
  items: number;
  parcels: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  class: string;
  maxParcels: number;
}

const itemSchema: Schema = new Schema({
  sku: { type: String, required: false},
  items: { type: Number, required: false },
  parcels: { type: Number, required: false },
  length: { type: Number, required: false },
  width: { type: Number, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  class: { type: String, required: false },
  maxParcels: { type: Number, required: false },
});

export const Item = mongoose.model<IItem>("Item", itemSchema);
