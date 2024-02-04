import { Request, Response } from "express";
import { retrieveAllChannels } from "../services/channel.service";

export const getAllChannels = async (req: Request, res: Response) => {
  try {
    const channels = await retrieveAllChannels();
    res.status(200).json(channels);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
