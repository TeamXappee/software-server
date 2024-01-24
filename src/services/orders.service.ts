import { Order } from "../models/order.modal";
import { handleError } from "../utils/handleError";

export const fetchOrdersWithFileId = async (
  file_id: string,
  pageIndex: number
) => {
  const pageSize = 10;
  try {
    const totalCount = await Order.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const orders = await Order.find({ file_id: String(file_id) })
      .sort({ createdAt: "desc" }) // Order by creation date
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
