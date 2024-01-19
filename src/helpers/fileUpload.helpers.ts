import * as xlsx from "xlsx";
import { TOrderData } from "../types/order";

// Asynchronous function to parse a single file
const parseFile = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      // Read the uploaded file
      const workbook = xlsx.read(file.buffer, { type: "buffer" });

      // Read the first sheet
      const worksheet = workbook.Sheets["DETAILS"];

      // Convert sheet to JSON
      const rowsData = xlsx.utils.sheet_to_json(worksheet) as TOrderData[];

      resolve({
        metadata: {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          channelName: rowsData[0].CHANNEL_NAME,
          channel: rowsData[0].CHANNEL,
        },
        rows: rowsData,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const parseXlsxToJson = async (
  files: Express.Multer.File[]
): Promise<any[]> => {
  const promises = files.map(parseFile);
  return await Promise.all(promises);
};
