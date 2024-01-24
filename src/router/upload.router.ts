import express from "express";
import multer from "multer";
import { getAllFiles, uploadFiles } from "../controllers/upload.controller";

const filesRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

filesRouter.post("/upload", upload.single("file"), uploadFiles);
filesRouter.get("/all", getAllFiles);


export default filesRouter;
