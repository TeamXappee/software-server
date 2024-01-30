import express from "express";
import { getAllChannels } from "../controllers/channels.controller";

const channelsRouter = express.Router();

channelsRouter.get("/", getAllChannels);

export default channelsRouter;
