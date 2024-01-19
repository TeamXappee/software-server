export type TOrder = {
  file_id: string;
  data: TOrderData;
};
export type TOrderData = {
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
