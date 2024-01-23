import express from "express";
import multer from "multer";
import { getAllFiles, uploadFiles } from "../controllers/upload.controller";

const filesRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

filesRouter.post("/upload", upload.array("files"), uploadFiles);
filesRouter.get("/all/:user_email", getAllFiles)

export default filesRouter;
