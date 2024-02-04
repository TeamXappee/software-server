import express from "express";
import { addNewItems, getAllItems } from "../controllers/items.controller";
const itemsRouter = express.Router();

itemsRouter.post("/new", addNewItems);
itemsRouter.get("/", getAllItems)
// @Params {from_date, to_date}
export default itemsRouter;
