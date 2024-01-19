import mongoose, { Schema, Document } from "mongoose";
import { TOrderData } from "../types/order";
const orderDataSchema = new Schema({
  SELRO_ORDER_ID: { type: String, required: false },
  ORDER_ID: { type: String, required: false },
  ORDER_DATE: { type: Number, required: false },

  CHANNEL: { type: String, required: false },
  CHANNEL_NAME: { type: String, required: false },

  SITE: { type: String, required: false },
  TITLE: { type: String, required: false },
  VARIATION: { type: String, required: false },
  ASIN: { type: String, required: false },
  SKU: { type: String, required: false },
  UPC: { type: String, required: false },

  ORDER_ITEM_ID: { type: Number, required: false },
  ORDER_STATUS: { type: String, required: false },
  WEIGHT: { type: Number, required: false },

  WEIGHT_KG: { type: Number, required: false },

  ITEM_PRICE: { type: Number, required: false },
  QUANTITY_PURCHASED: { type: Number, required: false },
  SUB_TOTAL: { type: Number, required: false },
  SHIPPING_COST: { type: Number, required: false },
  TOTAL_PRICE: { type: Number, required: false },
  ORDER_TOTAL: { type: Number, required: false },

  BUYER_EMAIL: { type: String, required: false },
  BUYER_NAME: { type: String, required: false },

  SHIP_ADDRESS_1: { type: String, required: false },
  SHIP_ADDRESS_2: { type: String, required: false },
  SHIP_ADDRESS_3: { type: String, required: false },

  SHIP_CITY: { type: String, required: false },
  SHIP_COUNTRY: { type: String, required: false },
  SHIP_STATE: { type: String, required: false },
  SHIP_COUNTRY_CODE: { type: String, required: false },
  SHIPPING_DISCOUNT: { type: Number, required: false },
  SHIPPING_TAX: { type: Number, required: false },

  SHIP_POSTALCODE: { type: String, required: false },

  ITEM_TAX: { type: Number, required: false },
  CURRENCY_CODE: { type: String, required: false },
  PAYMENT_STATUS: { type: String, required: false },
  PAYMENT_DATE: { type: String, required: false },
  PAYMENTS_TRANSACTION_ID: { type: String, required: false },

  SHIPPED_DATE: { type: String, required: false },
  SHIPPING_METHOD: { type: String, required: false },
  SHIPPING_CARRIER: { type: String, required: false },
  TEL_NO: { type: String, required: false },
  TRACKING_ID: { type: String, required: false },
  EAN: { type: String, required: false },

  ORDER_CUSTOMISATION: { type: String, required: false },
  QUANTITY: { type: Number, required: false },
  Items: { type: Number, required: false },
  Total_Item: { type: Number, required: false },
  MinParcelPerSKU: { type: Number, required: false },
  MaxParcels: { type: Number, required: false },
  PARCELS: { type: Number, required: false },
  L: { type: Number, required: false },
  W: { type: Number, required: false },
  H: { type: Number, required: false },
  Girth: { type: Number, required: false },
  Volume: { type: Number, required: false },
  PARCEL_WEIGHT: { type: Number, required: false },

  ITEM_ID: { type: String, required: false },
  POST_CODE: { type: String, required: false },
  TOTAL_WEIGHT: { type: Number, required: false },
  WEIGHT_BAND_POSTAGE: { type: Number, required: false },
  WEIGHT_BAND_HANDLING: { type: Number, required: false },
  CLASS_WEIGHT_BAND: { type: Number, required: false },
  CLASS: { type: String, required: false },
  DITERMIN_CLASS: { type: String, required: false },

  COURIER: { type: String, required: false },
  SERVICE: { type: String, required: false },
  POSTAGE: { type: Schema.Types.Mixed, required: false },
  OFA: { type: String, required: false },
  PF_Surge: { type: String, required: false },
  OFA_CHARGE: { type: Number, required: false },
  POSTAGE_COST: { type: Number, required: false },
  TOTAL_POSTAGE_COST: { type: Number, required: false },
  FUEL_SURGE: { type: Number, required: false },
  LONDON_CON: { type: String, required: false },
  HANDLING_FIRST: { type: Number, required: false },
  ADDI_HANDLING: { type: Number, required: false },

  TOTAL_HANDLING: { type: Number, required: false },
  PACKAGING: { type: Number, required: false },
  SHIPMENTS: { type: Number, required: false },
  CONGESTION: { type: Schema.Types.Mixed, required: false },
  HANDLING: { type: Number, required: false },
  SOLD: { type: Number, required: false }
}, { _id: false });

interface IOrder extends Document {
  file_id: mongoose.Types.ObjectId;
  data: TOrderData;
}

const orderSchema: Schema = new Schema({
  file_id: { type: Schema.Types.ObjectId, ref: "File", required: false },
  data: { type: orderDataSchema, required: false },
});

export const  Order = mongoose.model<IOrder>("Order", orderSchema);
