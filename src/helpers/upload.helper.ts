import * as xlsx from "xlsx";

const sheetNames = ["DETAILS", "CHARGES", "OFA POSTCODE"];

// Asynchronous function to parse a single file
const parseFile = async (file: Express.Multer.File): Promise<any> => {
  try {
    const workbook = xlsx.read(file.buffer, { type: "buffer" });

    const sheetPromises = sheetNames.map((sheetName) => {
      return new Promise((resolve, reject) => {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
          reject(new Error(`Sheet ${sheetName} not found`));
          return;
        }

        const rowsData = xlsx.utils.sheet_to_json(sheet, {
          defval: null,
        }) as any[];

        const filteredRows = rowsData.filter((row) => {
          const isNotEmpty = Object.values(row).some((val) => val !== null);
          const hasRequiredFields =
            sheetName === "DETAILS" ? row.ORDER_ID && row.SUB_TOTAL > 0 : true;
          return isNotEmpty && hasRequiredFields;
        });

        resolve({ [sheetName]: filteredRows });
      });
    });

    const results = await Promise.all(sheetPromises);
    return Object.assign({}, ...results);
  } catch (error) {
    throw error;
  }
};

export const parseXlsxToJson = async (
  file: Express.Multer.File
): Promise<any> => {
  return parseFile(file);
};
