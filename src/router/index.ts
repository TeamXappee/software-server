import express, { Request, Response } from "express";
import ordersRouter from "./orders.route";
import channelsRouter from "./channels.route";
import itemsRouter from "./items.router";
import carrierRouter from "./carrier.route";
const router = express.Router();

router.get("/check-health", async (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.use("/orders", ordersRouter);
router.use("/channels", channelsRouter);
router.use("/items", itemsRouter);
router.use("/carriers", carrierRouter);

export default router;
