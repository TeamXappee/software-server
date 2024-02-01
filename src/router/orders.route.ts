import express from "express";
import {
  calculateInvoices,
  importOrdersWithRange,
} from "../controllers/orders.controller.";

const ordersRouter = express.Router();

// @Params {from_date, to_date}
ordersRouter.post("/import", importOrdersWithRange);
ordersRouter.post("/calculateInvoice", calculateInvoices);
export default ordersRouter;
