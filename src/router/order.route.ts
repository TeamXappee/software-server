import express from "express";
import { getAllOrdersForChannel, getAllOrdersForFile } from "../controllers/orders.controller";

const ordersRouter = express.Router();

ordersRouter.get("/all/:channel_name", getAllOrdersForChannel);
ordersRouter.get("/all/:file_id", getAllOrdersForFile);


export default ordersRouter