import express from "express";
import clientRouter from "./client.router";
import { uploadFiles } from "../controllers/upload.controller";
import filesRouter from "./upload.router";
import ordersRouter from "./orders.router";

const router = express.Router();

router.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.use("/clients", clientRouter);
router.use("/file", filesRouter);
router.use("/orders", ordersRouter);
export default router;
