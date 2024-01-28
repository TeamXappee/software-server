import { Order } from "../models/order.modal";
import { handleError } from "../utils/handleError";

export const fetchOrdersWithFileId = async (
  file_id: string,
  pageIndex: number
) => {
  const pageSize = 13;
  try {
    const totalCount = await Order.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const orders = await Order.find({ file_id: String(file_id) })
      .skip(pageIndex * pageSize)
      .limit(pageSize);
    return {
      orders,
      totalCount,
      totalPages,
      currentPageIndex: pageIndex,
    };
  } catch (err) {
    handleError(err);
  }
};

export const fetchAllOrderDetailsByFileId = async (file_id: string) => {
  try {
    const orders = await Order.find({ file_id: String(file_id) });
    return orders;
  } catch (err) {
    handleError(err);
  }
};
