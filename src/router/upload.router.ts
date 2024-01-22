import express from "express";
import multer from "multer";
import { uploadFiles } from "../controllers/upload.controller";

const filesRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

filesRouter.post("/upload", upload.array("files"), uploadFiles);

export default filesRouter;
