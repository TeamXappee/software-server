import mongoose, { Schema, Document } from "mongoose";
import { TOrderDetails } from "../types";

interface IOrder extends Document, TOrderDetails {}

const orderSchema: Schema = new Schema(
  {
    selroOrderId: { type: String, required: false, unique: true  },
    id: { type: String, required: false, unique: true },
    date: { type: Number, required: false },

    channel: { type: String, required: false },
    selroChannelName: { type: String, required: false },

    site: { type: String, required: false },
    totalPrice: { type: Number, required: false },
    trackingNumber: { type: String, required: false },
    carrierName: { type: String, required: false },
    shippingMethod: { type: String, required: false },
    shipmentServiceLevelCategory: { type: String, required: false },
    shipServiceLevel: { type: String, required: false },
    shipCountry: { type: String, required: false },
    channelSales: { type: Array, required: false },
    channelSalesLength: { type: Number, required: false },
    currencyName: { type: String, required: false },
    shipPostalCode: { type: String, required: false },
    totalWeight: { type: Number, required: false },
    currencyCode: { type: String, required: false },
    fulfillmentChannel: { type: String, required: false },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
