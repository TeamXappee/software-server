import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { fetchOrdersWithFileId } from "../services/orders.service";

export async function getOrdersWithFileId(req: Request, res: Response) {
  try {
    const { file_id, pageIndex } = req.query;

    if (!file_id) {
      return res
        .status(400)
        .json({ message: "No file_id or client_id provided" });
    }
    const result = await fetchOrdersWithFileId(
      file_id as string,
      Number(pageIndex)
    );
    const totalCount = result?.totalCount || 0;
    const orders = result?.orders || [];
    const totalPages = result?.totalPages || 0;
    const currentPageIndex = result?.currentPageIndex || 0;
    res.status(200).json({ orders, totalCount, totalPages, currentPageIndex });
  } catch (error) {
    handleError(error);
  }
}
