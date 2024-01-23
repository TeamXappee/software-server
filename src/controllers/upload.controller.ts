import { Request, Response } from "express";
import { parseXlsxToJson } from "../helpers/upload.helper";
import { fetchAllfiles, saveNewFileData } from "../services/upload.service";
import { handleError } from "../utils/handleError";

export async function uploadFiles(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[]; // Array of files uploaded
    const metadata = JSON.parse(req.body.metadata); // Parse the metadata

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const results = await parseXlsxToJson(files);
    await saveNewFileData(metadata, results[0].rows); // this means I only wanna read the first file uploaded, I only allow one file to get uploaded at a time

    res.status(200).json({
      message: "Files processed successfully.",
      data: JSON.stringify(results),
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error converting excell files to data",
      error: error.message,
    });
  }
}

export async function getAllFiles(req: Request, res: Response) {
  try {
    const user_email = req.params.user_email;
    const files = await fetchAllfiles(user_email);
    res.status(200).json({ files });
  } catch (error: any) {
    handleError(error);
  }
}
