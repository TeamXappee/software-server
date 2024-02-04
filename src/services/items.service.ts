import { Item } from "../models/item.model";

export const storeItems = async (items: any) => {
  // Store the items in the database
  return await Item.insertMany(items);
};

export const retrieveAllItems = async (page: number, pageSize: number) => {
  return await Item.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
};

export const retrieveMissingOrderWeight = async (order: any) => {
  const weightPromises = order.channelSales.map(async (sale: any) => {
    const item = await Item.findOne({ sku: sale.sku });
    if (item && item.weight > 0) {
      return item.weight;
    } else {
      return 0;
    }
  });
  const weights = await Promise.all(weightPromises);
  return weights.reduce((acc, weight) => acc + weight, 0);
};
