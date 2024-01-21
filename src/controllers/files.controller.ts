import { Request, Response } from "express";
import { parseXlsxToJson } from "../helpers/fileUpload.helpers";
import {
  retrieveAllFiles,
  saveOrdersAndFilesMetadata,
} from "../services/files.service";

export async function uploadFiles(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[]; // Array of files uploaded
    const metadata = JSON.parse(req.body.metadata); // Parse the metadata

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    
    const results = await parseXlsxToJson(files);
    await saveOrdersAndFilesMetadata(results);
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

export async function getAllUploadedFiles(_req: Request, res: Response) {
  try {
    const files = await retrieveAllFiles();
    res.status(200).json({
      message: "Files retrieved successfully",
      data: files,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error retrieving files",
      error: error.message,
    });
  }
}
