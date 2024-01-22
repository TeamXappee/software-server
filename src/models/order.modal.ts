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
const orderDataSchema = new Schema(
  {
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
    SOLD: { type: Number, required: false },
  },
  { _id: false }
);

interface IOrder extends Document {
  file_id: mongoose.Types.ObjectId;
  sheet_name: string;
  data: any;
}

const orderSchema: Schema = new Schema({
  file_id: { type: Schema.Types.ObjectId, ref: "File", required: false },
  sheet_name: { type: String, required: false },
  data: { type: orderDataSchema, required: false },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
