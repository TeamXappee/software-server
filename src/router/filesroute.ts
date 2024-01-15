import express from "express";
import multer from "multer";
import {
  getAllUploadedFiles,
  uploadFiles,
} from "../controllers/files.controller";

const filesRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

filesRouter.post("/upload", upload.array("files"), uploadFiles);
filesRouter.get("/all", getAllUploadedFiles);

export default filesRouter;
