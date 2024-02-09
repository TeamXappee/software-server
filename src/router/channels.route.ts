import express from "express";
import { getAllChannels, getChannelsWithId } from "../controllers/channels.controller";

const channelsRouter = express.Router();

channelsRouter.get("/", getAllChannels);
channelsRouter.post("/with-id", getChannelsWithId)
export default channelsRouter;
