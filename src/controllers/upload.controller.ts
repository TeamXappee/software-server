import { Request, Response } from "express";
import {
  fetchFilesByClientId,
  fetchfilesByUserEmail,
  saveNewFileData,
} from "../services/upload.service";
import { handleError } from "../utils/handleError";
import { parseFileSec } from "../helpers/upload.helper";

export async function uploadFiles(req: Request, res: Response) {
  try {
    const file = req.file as Express.Multer.File; // Array of files uploaded
    const metadata = JSON.parse(req.body.metadata); // Parse the metadata

    if (!file) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const results = await parseFileSec(file);
    await saveNewFileData(metadata, results);
    res.status(200).json({
      message: "Files processed successfully.",
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
    const { user_email, client_id } = req.query;
    if (!user_email && !client_id) {
      return res.status(400).json({ message: "No user email provided" });
    }

    if (user_email) {
      const files = await fetchfilesByUserEmail(user_email as string);
      res.status(200).json({ files });
    } else if (client_id) {
      const files = await fetchFilesByClientId(client_id as string);
      res.status(200).json({ files });
    }
  } catch (error: any) {
    handleError(error);
  }
}
