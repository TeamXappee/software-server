import express from "express";
import { getOrdersWithFileId } from "../controllers/orders.controller";

const ordersRouter = express.Router();

ordersRouter.get("/all/:file_id", getOrdersWithFileId);

export default ordersRouter;
