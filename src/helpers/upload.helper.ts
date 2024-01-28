import * as xlsx from "xlsx";
import excelToJson from "convert-excel-to-json";
import fs from "fs";

const sheets = ["DETAILS", "CHARGES", "OFA POSTCODE"];

export const parseFileSec = async (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      let result = excelToJson({
        sourceFile: file.path,
        sheets: [{
          name: "DETAILS",
          header: {
            rows: 1
          },
          columnToKey,
        }],
      });

      // Filtering out rows where all cells are null
      if (result.DETAILS) {
        result.DETAILS = result.DETAILS.filter(row => 
          Object.values(row).some(cell => cell !== null)
        );
      }
      const filteredResult = {...result, DETAILS: result.DETAILS.filter(row => row.ORDER_ID && row.SUB_TOTAL > 0)};
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          reject(err); // Reject the promise if file deletion fails
        } else {
          console.log("File deleted successfully");
          resolve(filteredResult); // Resolve the promise after file deletion
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};


const columnToKey = {
  A: "SELRO_ORDER_ID",
  B: "ORDER_ID",
  C: "ORDER_DATE",
  E: "CHANNEL",
  F: "CHANNEL_NAME",
  G: "SITE",
  H: "TITLE",
  I: "VARIATION",
  J: "ASIN",
  K: "SKU",
  L: "UPC",
  M: "ORDER_ITEM_ID",
  N: "ORDER_STATUS",
  O: "WEIGHT",
  Q: "ITEM_PRICE",
  R: "QUANTITY_PURCHASED",
  S: "SUB_TOTAL",
  T: "SHIPPING_COST",
  U: "TOTAL_PRICE",
  V: "ORDER_TOTAL",
  W: "BUYER_EMAIL",
  X: "BUYER_NAME",
  Y: "SHIP_ADDRESS_1",
  Z: "SHIP_ADDRESS_2",
  AA: "SHIP_ADDRESS_3",
  AB: "SHIP_CITY",
  AC: "SHIP_STATE",
  AD: "SHIP_COUNTRY",
  AE: "SHIP_COUNTRY_CODE",
  AF: "SHIP_POSTALCODE",
  AG: "SHIPPING_DISCOUNT",
  AH: "SHIPPING_TAX",
  AI: "ITEM_TAX",
  AJ: "CURRENCY_CODE",
  AK: "PAYMENT_STATUS",
  AL: "PAYMENT_DATE",
  AM: "PAYMENTS_TRANSACTION_ID",
  AN: "SHIPPED_DATE",
  AO: "SHIPPING_METHOD",
  AP: "SHIPPING_CARRIER",
  AQ: "TEL_NO",
  AR: "TRACKING_ID",
  AS: "EAN",
  AT: "ORDER_CUSTOMISATION",
  AU: "WEIGHT",
  AV: "QUANTITY",
  AW: "Items",
  AX: "Total_Item",
  AY: "MinParcelPerSKU",
  AZ: "MaxParcels",
  BA: "PARCELS",
  BB: "L",
  BC: "W",
  BD: "H",
  BE: "Girth",
  BF: "Volume",
  BG: "PARCEL_WEIGHT",
  BH: "SKU",
  BI: "ITEM_ID",
  BJ: "POST_CODE",
  BK: "WEIGHT_BAND_POSTAGE",
  BL: "TOTAL_WEIGHT",
  BM: "WEIGHT_BAND_HANDLING",
  BN: "CLASS_WEIGHT_BAND",
  BO: "CLASS",
  BP: "DITERMIN_CLASS",
  BQ: "COURIER",
  BR: "SERVICE",
  BS: "SERVICE",
  BT: "TRACKING_ID",
  BU: "POSTAGE",
  BV: "OFA",
  BW: "PF_Surge",
  BX: "OFA_CHARGE",
  BY: "POSTAGE_COST",
  BZ: "TOTAL_POSTAGE_COST",
  CA: "FUEL_SURGE",
  CB: "LONDON_CON",
  CC: "HANDLING_FIRST",
  CD: "ADDI_HANDLING",
  CE: "TOTAL_HANDLING",
  CH: "COURIER",
  CI: "SERVICES",
  CJ: "SHIPMENTS",
  CK: "WEIGHT",
  CL: "POSTAGE",
  CM: "FUEL_SURGE",
  CN: "CONGESTION",
  CO: "HANDLING",
  CP: "PACKAGING",
  CR: "SKU",
  CS: "SOLD",
};
