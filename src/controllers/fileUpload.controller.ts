import { Request, Response } from "express";
import { parseXlsxToJson } from "../helpers/fileUpload.helpers";
import { saveOrdersAndFilesMetadata } from "../services/fileUpload.service";

export async function uploadFiles(req: Request, res: Response) {
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    res.status(400).json({ message: "No files uploaded" });
    return;
  }

  try {
    const results = await parseXlsxToJson(files);
    await saveOrdersAndFilesMetadata(results);
    res.status(200).json({
      message: "Files processed successfully.",
      data: JSON.stringify(results),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error converting excell files to data",
      error: error.message,
    });
  }
}
