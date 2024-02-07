import { Order } from "../models/order.model";
import { Trash } from "../models/trash.model";

export const storeImportedOrders = async (orders: any[]) => {
  const operations = orders.map((order) => {
    return Order.findOne({ id: order.id }).then((existingOrder) => {
      if (!existingOrder) {
        return new Order(order)
          .save()
          .then((savedOrder) => ({ isNew: true, order: savedOrder }));
      } else {
        return Promise.resolve({ isNew: false, order: existingOrder });
      }
    });
  });

  // Execute all operations and handle both resolved and rejected promises
  const results = await Promise.allSettled(operations);

  // Separate newly added orders and existing orders
  let addedOrders: any = [];
  let duplicateCount = 0;
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const { isNew, order } = result.value;
      addedOrders.push(order);

      if (!isNew) {
        duplicateCount++;
      }
    }
  });

  return {
    addedOrders, // Return only newly added orders
    duplicateCount, // Count of existing (duplicate) orders
  };
};

export const updateOrders = async (orders: any) => {
  orders.forEach(async (order: any) => {
    const existingOrder = await Order.findOne({ id: order.id });
    if (existingOrder) {
      await Order.updateOne({ id: order.id }, order);
    } else {
      await new Order(order).save();
    }
  });
};

export const retrieveOrdersWithOrderId = async (ids: string[]) => {
  return await Order.find({ id: { $in: ids } });
};

export const deleteOrder = async (_id: string) => {
  return await Order.deleteOne({ _id });
};

export const retrieveAllSoftDeletedOrders = async () => {
  return await Trash.find();
};

export const storeNewOrder = async (order: any) => {
  const newOrder = new Order({ ...order, _id: undefined })
  return await new Order(newOrder).save();
};
