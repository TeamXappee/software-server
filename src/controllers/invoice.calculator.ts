import { Request, Response } from "express";
import { fetchFileByFileId } from "../services/upload.service";
import { fetchAllOrderDetailsByFileId } from "../services/orders.service";
import { calculateOrdersInvoice } from "../helpers/invoice.helper";
import { handleError } from "../utils/handleError";
import { TOrderDetails } from "../models/order.modal";

export async function calculateInvoice(req: Request, res: Response) {
  try {
    const { file_id } = req.query;
    if (!file_id) {
      return res.status(400).json({ message: "No file_id provided" });
    }

    const orderDetails = await fetchAllOrderDetailsByFileId(file_id as string);
    const invoice = await calculateOrdersInvoice(
      orderDetails as TOrderDetails[]
    );
    res.status(200).json({ invoice });
  } catch (error: any) {
    handleError(error);
  }
}
