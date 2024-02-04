import express, { Request, Response } from "express";
import ordersRouter from "./orders.route";
import channelsRouter from "./channels.route";
import itemsRouter from "./items.router";
const router = express.Router();

router.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.use("/orders", ordersRouter);
router.use("/channels", channelsRouter);
router.use("/items", itemsRouter);

export default router;
