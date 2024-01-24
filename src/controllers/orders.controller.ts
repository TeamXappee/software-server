import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { fetchOrdersWithFileId } from "../services/orders.service";

export async function getOrdersWithFileId(req: Request, res: Response) {
  try {
    const { file_id } = req.query;

    if (!file_id) {
      return res
        .status(400)
        .json({ message: "No file_id or client_id provided" });
    }   
    const orders = await fetchOrdersWithFileId(file_id as string);
    res.status(200).json({orders});
  } catch (error) {
    handleError(error);
  }
}
