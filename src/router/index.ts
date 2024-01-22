import express from "express";
import clientRouter from "./client.router";

const router = express.Router();

router.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.use("/clients", clientRouter);

export default router;
