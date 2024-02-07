import express from "express";
import {
  calculateInvoices,
  fixMissingWeight,
  getSoftDeletedOrders,
  importOrdersWithRange,
  softDeleteOrder,
  restoreOrderFromTrash
} from "../controllers/orders.controller.";

const ordersRouter = express.Router();

// @Params {from_date, to_date}
ordersRouter.post("/import", importOrdersWithRange);
ordersRouter.post("/calculateInvoice", calculateInvoices);
ordersRouter.post("/fix-weight", fixMissingWeight);
ordersRouter.post("/softDelete", softDeleteOrder);
ordersRouter.get("/softDeleted", getSoftDeletedOrders);
ordersRouter.post("/restoreOrder", restoreOrderFromTrash)

export default ordersRouter;
