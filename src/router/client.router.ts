import express from "express";
import { addNewClient, getAllExternalClients } from "../controllers/client.controller";

const clientRouter = express.Router();
clientRouter.post("/new", addNewClient);
clientRouter.get("/all", getAllExternalClients);

export default clientRouter;
