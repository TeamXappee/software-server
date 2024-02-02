import { Order } from "../models/order.model";

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

