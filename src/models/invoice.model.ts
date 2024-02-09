import mongoose, { Document, Schema } from "mongoose";

export interface IItem {
  sku: string;
  weight: number;
  shippingWeightGroup: number;
  handlingWeightGroup: number;
  itemClass: string;
}
export interface IInvoice extends Document {
  items: IItem[];
  orderWeightGroup: number;
  orderWeight: number;
  carrier: string;
  service: string;
  shippingCharge: number;
  postage: number;
  handling: number;
  addionalHandling: number;
  surge: number;
  packaging: number;
}

const InvoiceSchema: Schema = new Schema({
  items: [{ type: Object, required: false }],
  orderWeightGroup: { type: Number, required: false },
  orderWeight: { type: Number, required: false },
  carrier: { type: String, required: false },
  service: { type: String, required: false },
  shippingCharge: { type: Number, required: false },
  postage: { type: Number, required: false },
  handling: { type: Number, required: false },
  addionalHandling: { type: Number, required: false },
  surge: { type: Number, required: false },
  packaging: { type: Number, required: false },
});

export const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);
