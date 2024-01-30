import express from "express";
import { importOrdersWithRange } from "../controllers/orders.controller.";

const ordersRouter = express.Router();

// @Params {from_date, to_date}
ordersRouter.post("/import", importOrdersWithRange);

export default ordersRouter;
