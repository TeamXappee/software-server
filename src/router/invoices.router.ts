import express from "express";
import { calculateInvoice } from "../controllers/invoice.calculator";

const invoicesRouter = express.Router();

// @Params
// {file_id}(string)
invoicesRouter.get("/calculate", calculateInvoice);
export default invoicesRouter;
