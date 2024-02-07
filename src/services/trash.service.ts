import { Trash } from "../models/trash.model";

export const storeOrderInTrash = async (order: any) => {
  const existingOrder = await retrieveOrderFromTrash(order.id);
  if (!existingOrder) {
    const newOrder = new Trash(order);
    return await newOrder.save();
  } else {
    return existingOrder;
  }
};

export const retrieveOrderFromTrash = async (id: string) => {
  return await Trash.findOne({ id });
};

export const deleteOrderFromTrashAndRestore = async (id: string) => {
  const order = await retrieveOrderFromTrash(id);
  await Trash.deleteOne({ id });
  return order;
};
