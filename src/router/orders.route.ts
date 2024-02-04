import express from "express";
import {
  calculateInvoices,
  fixMissingWeight,
  importOrdersWithRange,
} from "../controllers/orders.controller.";

const ordersRouter = express.Router();

// @Params {from_date, to_date}
ordersRouter.post("/import", importOrdersWithRange);
ordersRouter.post("/calculateInvoice", calculateInvoices);
ordersRouter.post("/fix-weight", fixMissingWeight)

export default ordersRouter;
