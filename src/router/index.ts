import express from "express";
import ordersRouter from "./orders.route";
import channelsRouter from "./channels.route";

const router = express.Router();

router.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});


router.use("/orders", ordersRouter);
router.use("/channels", channelsRouter);

export default router;
