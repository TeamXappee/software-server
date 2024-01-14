import express from "express";
import fileUploadRouter from "./fileUpload.route";

const router = express.Router();

router.use("/file", fileUploadRouter);

export default router;
