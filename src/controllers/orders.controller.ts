import { Request, Response } from "express";
import {
  retrieveAllOrdersByChannelName,
  retrieveAllOrdersByFileId,
} from "../services/order.service";

export const getAllOrdersForChannel = async (req: Request, res: Response) => {
  const channelName = req.params.channel_name;
  if (!channelName || channelName.length === 0) {
    res.status(400).json({ message: "Channel name not provided" });
    return;
  }

  try {
    const orders = await retrieveAllOrdersByChannelName(channelName);
    res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: orders });
  } catch (error:any) {
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

export const getAllOrdersForFile = async (req: Request, res: Response) => {
  const FileId = req.params.file_id;
  if (!FileId || FileId.length === 0) {
    res.status(400).json({ message: "Fiel id name not provided" });
    return;
  }

  try {
    const orders = await retrieveAllOrdersByFileId(FileId);
    res
      .status(200)
      .json({ message: "Orders retrieved successfully", data: orders });
  } catch (error:any) {
    res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};
