import express from "express";
import filesRouter from "./filesroute";
import ordersRouter from "./order.route";

const router = express.Router();

router.get("/check-health", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

router.use("/files", filesRouter);
router.use("/orders", ordersRouter);

export default router;
