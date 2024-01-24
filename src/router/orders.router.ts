import express from "express";
import { getOrdersWithFileId } from "../controllers/orders.controller";

const ordersRouter = express.Router();

ordersRouter.get("/all", getOrdersWithFileId);

export default ordersRouter;
