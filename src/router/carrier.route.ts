import express from "express";
import { getAllCarriers } from "../controllers/carrier.controller";

const carrierRouter = express.Router();

carrierRouter.get("/", getAllCarriers);

export default carrierRouter;
