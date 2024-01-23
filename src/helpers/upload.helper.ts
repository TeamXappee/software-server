import * as xlsx from "xlsx";

// Asynchronous function to parse a single file
const parseFile = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const workbook = xlsx.read(file.buffer, { type: "buffer" });
      const worksheet = workbook.Sheets["DETAILS"];

      const rowsData = xlsx.utils.sheet_to_json(worksheet, {
        defval: null,
      }) as any[];

      // Filter rows to include only those that are not empty
      // and have both ORDER_ID and SUB_TOTAL
      const filteredRows = rowsData.filter((row) => {
        // Check if the row is not completely empty
        const isNotEmpty = Object.values(row).some((val) => val !== null);

        // Check if ORDER_ID and SUB_TOTAL are not null
        const hasRequiredFields = row.ORDER_ID && row.SUB_TOTAL > 0;

        return isNotEmpty && hasRequiredFields;
      });

      resolve({
        rows: filteredRows,
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
