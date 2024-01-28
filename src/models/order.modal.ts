import mongoose, { Schema, Document } from "mongoose";

export type TOrderDetails = {
  SELRO_ORDER_ID: number;
  ORDER_ID: string;
  ORDER_DATE: number;

  CHANNEL: string;
  CHANNEL_NAME: string;

  SITE: string;
  TITLE: string;
  VARIATION: string;
  ASIN: string;
  SKU: string;
  UPC: number;

  ORDER_ITEM_ID: number;
  ORDER_STATUS: string;
  WEIGTHT: number;

  WEIGHT_KG: number;

  ITEM_PRICE: number;
  QUANTITY_PURCHASED: number;
  SUB_TOTAL: number;
  SHIPPING_COST: number;
  TOTAL_PRICE: number;
  ORDER_TOTAL: number;

  BUYER_EMAIL: string;
  BUYER_NAME: string;

  SHIP_ADDRESS_1: string;
  SHIP_ADDRESS_2: string;
  SHIP_ADDRESS_3: string;

  SHIP_CITY: string;
  SHIP_COUNTRY: string;
  SHIP_STATE: string;
  SHIP_COUNTRY_CODE: string;
  SHIPPING_DISCOUNT: number;
  SHIPPING_TAX: number;

  SHIP_POSTALCODE: string;

  ITEM_TAX: number;
  CURRENCY_CODE: string;
  PAYMENT_STATUS: string;
  PAYMENT_DATE: string;
  PAYMENTS_TRANSACTION_ID: string;

  SHIPPED_DATE: string;
  SHIPPING_METHOD: string;
  SHIPPING_CARRIER: string;
  TEL_NO: string;
  TRACKING_ID: string;
  EAN: string;

  ORDER_CUSTOMISATION: string;
  WEIGHT: number;
  QUANTITY: number;
  Items: number;
  Total_Item: number;
  MinParcelPerSKU: number;
  MaxParcels: number;
  PARCELS: number;
  L: number;
  W: number;
  H: number;
  Girth: number;
  Volume: number;
  PARCEL_WEIGHT: number;

  ITEM_ID: string;
  POST_CODE: string;
  TOTAL_WEIGHT: number;
  WEIGHT_BAND_POSTAGE: number;
  WEIGHT_BAND_HANDLING: number;
  CLASS_WEIGHT_BAND: number;
  CLASS: string;
  DITERMIN_CLASS: string;

  COURIER: string;
  SERVICE: string;
  POSTAGE: number | string;
  OFA: string;
  PF_Surge: string;
  OFA_CHARGE: number;
  POSTAGE_COST: number;
  TOTAL_POSTAGE_COST: number;
  FUEL_SURGE: number;
  LONDON_CON: string;
  HANDLING_FIRST: number;
  ADDI_HANDLING: number;

  TOTAL_HANDLING: number;
  PACKAGING: number;
  SHIPMENTS: number;
  CONGESTION: any;
  HANDLING: number;
  SOLD: number;
};
interface IOrder extends Document, TOrderDetails {
  file_id: mongoose.Types.ObjectId;
  sheet_name: string;
}
const orderSchema: Schema = new Schema(
  {
    file_id: { type: Schema.Types.ObjectId, ref: "File", required: false },
    sheet_name: { type: Schema.Types.Mixed, required: false },

    // order data
    SELRO_ORDER_ID: { type: Schema.Types.Mixed, required: false },
    ORDER_ID: { type: Schema.Types.Mixed, required: false },
    ORDER_DATE: { type: Schema.Types.Mixed, required: false },

    CHANNEL: { type: Schema.Types.Mixed, required: false },
    CHANNEL_NAME: { type: Schema.Types.Mixed, required: false },

    SITE: { type: Schema.Types.Mixed, required: false },
    TITLE: { type: Schema.Types.Mixed, required: false },
    VARIATION: { type: Schema.Types.Mixed, required: false },
    ASIN: { type: Schema.Types.Mixed, required: false },
    SKU: { type: Schema.Types.Mixed, required: false },
    UPC: { type: Schema.Types.Mixed, required: false },

    ORDER_ITEM_ID: { type: Schema.Types.Mixed, required: false },
    ORDER_STATUS: { type: Schema.Types.Mixed, required: false },
    WEIGHT: { type: Schema.Types.Mixed, required: false },

    WEIGHT_KG: { type: Schema.Types.Mixed, required: false },

    ITEM_PRICE: { type: Schema.Types.Mixed, required: false },
    QUANTITY_PURCHASED: { type: Schema.Types.Mixed, required: false },
    SUB_TOTAL: { type: Schema.Types.Mixed, required: false },
    SHIPPING_COST: { type: Schema.Types.Mixed, required: false },
    TOTAL_PRICE: { type: Schema.Types.Mixed, required: false },
    ORDER_TOTAL: { type: Schema.Types.Mixed, required: false },

    BUYER_EMAIL: { type: Schema.Types.Mixed, required: false },
    BUYER_NAME: { type: Schema.Types.Mixed, required: false },

    SHIP_ADDRESS_1: { type: Schema.Types.Mixed, required: false },
    SHIP_ADDRESS_2: { type: Schema.Types.Mixed, required: false },
    SHIP_ADDRESS_3: { type: Schema.Types.Mixed, required: false },

    SHIP_CITY: { type: Schema.Types.Mixed, required: false },
    SHIP_COUNTRY: { type: Schema.Types.Mixed, required: false },
    SHIP_STATE: { type: Schema.Types.Mixed, required: false },
    SHIP_COUNTRY_CODE: { type: Schema.Types.Mixed, required: false },
    SHIPPING_DISCOUNT: { type: Schema.Types.Mixed, required: false },
    SHIPPING_TAX: { type: Schema.Types.Mixed, required: false },

    SHIP_POSTALCODE: { type: Schema.Types.Mixed, required: false },

    ITEM_TAX: { type: Schema.Types.Mixed, required: false },
    CURRENCY_CODE: { type: Schema.Types.Mixed, required: false },
    PAYMENT_STATUS: { type: Schema.Types.Mixed, required: false },
    PAYMENT_DATE: { type: Schema.Types.Mixed, required: false },
    PAYMENTS_TRANSACTION_ID: { type: Schema.Types.Mixed, required: false },

    SHIPPED_DATE: { type: Schema.Types.Mixed, required: false },
    SHIPPING_METHOD: { type: Schema.Types.Mixed, required: false },
    SHIPPING_CARRIER: { type: Schema.Types.Mixed, required: false },
    TEL_NO: { type: Schema.Types.Mixed, required: false },
    TRACKING_ID: { type: Schema.Types.Mixed, required: false },
    EAN: { type: Schema.Types.Mixed, required: false },

    ORDER_CUSTOMISATION: { type: Schema.Types.Mixed, required: false },
    QUANTITY: { type: Schema.Types.Mixed, required: false },
    Items: { type: Schema.Types.Mixed, required: false },
    Total_Item: { type: Schema.Types.Mixed, required: false },
    MinParcelPerSKU: { type: Schema.Types.Mixed, required: false },
    MaxParcels: { type: Schema.Types.Mixed, required: false },
    PARCELS: { type: Schema.Types.Mixed, required: false },
    L: { type: Schema.Types.Mixed, required: false },
    W: { type: Schema.Types.Mixed, required: false },
    H: { type: Schema.Types.Mixed, required: false },
    Girth: { type: Schema.Types.Mixed, required: false },
    Volume: { type: Schema.Types.Mixed, required: false },
    PARCEL_WEIGHT: { type: Schema.Types.Mixed, required: false },

    ITEM_ID: { type: Schema.Types.Mixed, required: false },
    POST_CODE: { type: Schema.Types.Mixed, required: false },
    TOTAL_WEIGHT: { type: Schema.Types.Mixed, required: false },
    WEIGHT_BAND_POSTAGE: { type: Schema.Types.Mixed, required: false },
    WEIGHT_BAND_HANDLING: { type: Schema.Types.Mixed, required: false },
    CLASS_WEIGHT_BAND: { type: Schema.Types.Mixed, required: false },
    CLASS: { type: Schema.Types.Mixed, required: false },
    DITERMIN_CLASS: { type: Schema.Types.Mixed, required: false },

    COURIER: { type: Schema.Types.Mixed, required: false },
    SERVICE: { type: Schema.Types.Mixed, required: false },
    POSTAGE: { type: Schema.Types.Mixed, required: false },
    OFA: { type: Schema.Types.Mixed, required: false },
    PF_Surge: { type: Schema.Types.Mixed, required: false },
    OFA_CHARGE: { type: Schema.Types.Mixed, required: false },
    POSTAGE_COST: { type: Schema.Types.Mixed, required: false },
    TOTAL_POSTAGE_COST: { type: Schema.Types.Mixed, required: false },
    FUEL_SURGE: { type: Schema.Types.Mixed, required: false },
    LONDON_CON: { type: Schema.Types.Mixed, required: false },
    HANDLING_FIRST: { type: Schema.Types.Mixed, required: false },
    ADDI_HANDLING: { type: Schema.Types.Mixed, required: false },

    TOTAL_HANDLING: { type: Schema.Types.Mixed, required: false },
    PACKAGING: { type: Schema.Types.Mixed, required: false },
    SHIPMENTS: { type: Schema.Types.Mixed, required: false },
    CONGESTION: { type: Schema.Types.Mixed, required: false },
    HANDLING: { type: Schema.Types.Mixed, required: false },
    SOLD: { type: Schema.Types.Mixed, required: false },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
