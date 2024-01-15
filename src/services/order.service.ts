import { Order } from "../models/order.model";

export const retrieveAllOrdersByChannelName = async (channelName: string) => {
  try {
    const orders = await Order.find().exec();
    console.log(orders);
    return orders;
  } catch (err: any) {
    console.error(err);
    throw err; // or handle the error as per your application's needs
  }
};

export const retrieveAllOrdersByFileId = async (file_id: string) => {
  try {
    const orders = await Order.find({ file_id: file_id }).exec();
    console.log("orders -==> ", orders)
    return orders;
  } catch (err: any) {
    console.log(err);
  }
};
