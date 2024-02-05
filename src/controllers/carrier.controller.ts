import { Request, Response } from "express";
import { retrieveAllCarriers } from "../services/carrier.service";

export const getAllCarriers = async (req: Request, res: Response) => {
  try {
    const carriers = await retrieveAllCarriers();
    res.status(200).json({
      message: "Carriers fetched successfully",
      carriers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong while fetching carriers.",
      error: error.message,
    });
  }
};
