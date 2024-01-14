import express from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/fileUpload.controller";

const fileUploadRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

fileUploadRouter.post("/upload", upload.array("files", 8), uploadFiles);
export default fileUploadRouter;
