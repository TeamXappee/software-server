import { Order } from "../models/order.modal";
import { handleError } from "../utils/handleError";

export const fetchOrdersWithFileId = async (file_id: string) => {
  try {
    return await Order.find({ file_id: String(file_id) });
  } catch (err) {
    handleError(err);
  }
};
