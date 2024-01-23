import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { fetchOrdersWithFileId } from "../services/orders.service";

export async function getOrdersWithFileId(req: Request, res: Response) {
  try {
    const file_id = req.params.file_id;
    const orders = await fetchOrdersWithFileId(file_id);
    res.status(200).json({ orders });
  } catch (error: any) {
    handleError(error);
  }
}
