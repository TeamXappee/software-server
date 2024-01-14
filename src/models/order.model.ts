import mongoose, { Schema, Document } from "mongoose";
import { TOrderData } from "../types/order";

const orderDataSchema: Schema = new Schema(
  {
    BUYER_EMAIL: { type: String, required: false },
    BUYER_NAME: { type: String, required: false },
    CHANNEL: { type: String, required: true },
    CHANNEL_NAME: { type: String, required: true },
    CURRENCY_CODE: { type: String, required: false },
    EAN: { type: Number, required: false },
    ITEM_PRICE: { type: Number, required: false },
    ITEM_TAX: { type: Number, required: false },
    ORDER_DATE: { type: Number, required: true },
    ORDER_ID: { type: String, required: true },
    ORDER_ITEM_ID: { type: Number, required: false },
    ORDER_STATUS: { type: String, required: false },
    ORDER_TOTAL: { type: Number, required: true },
    PAYMENT_STATUS: { type: String, required: false },
    QUANTITY_PURCHASED: { type: Number, required: false },
    SELRO_ORDER_ID: { type: Number, required: true },
    SHIPPING_CARRIER: { type: String, required: false },
    SHIPPING_COST: { type: Number, required: false },
    SHIPPING_METHOD: { type: String, required: false },
    SHIP_ADDRESS_1: { type: String, required: false },
    SHIP_ADDRESS_2: { type: String },
    SHIP_CITY: { type: String, required: false },
    SHIP_COUNTRY: { type: String, required: false },
    SHIP_COUNTRY_CODE: { type: String, required: false },
    SHIP_POSTALCODE: { type: String, required: false },
    SHIP_STATE: { type: String, required: false },
    SITE: { type: String, required: false },
    SKU: { type: String, required: false },
    SUB_TOTAL: { type: Number, required: false },
    TITLE: { type: String, required: false },
    TOTAL_PRICE: { type: Number, required: true },
    UPC: { type: Number, required: false },
    WEIGHT_KG: { type: Number, required: false },
  },
  { _id: false }
);

interface IOrder extends Document {
  file_id: mongoose.Types.ObjectId;
  customer_id: mongoose.Types.ObjectId;
  data: TOrderData[];
}

const orderSchema: Schema = new Schema({
  file_id: { type: Schema.Types.ObjectId, ref: "File", required: true },
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  data: { type: orderDataSchema, required: true },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
