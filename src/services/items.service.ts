import { Item } from "../models/item.model";

export const storeItems = async (items: any) => {
  // Store the items in the database
  return await Item.insertMany(items);
};

export const storeOneItem = async (item: any) => {
  const newItem = new Item(item);
  return await newItem.save();
};

export const retrieveAllItems = async (page: number, pageSize: number) => {
  return await Item.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
};

export const retrieveMissingItemWeight = async (sku: string) => {
  const item = await Item.findOne({ sku: sku });
  if (item && item.weight > 0) {
    return item.weight;
  } else {
    return 0;
  }
};
export const retrieveMissingOrderWeight = async (order: any) => {
  if (order.totalWeight > 0) return order.totalWeight;

  const weightPromises = order.channelSales.map(async (sale: any) => {
    return await retrieveMissingItemWeight(sale.sku);
  });
  const weights = await Promise.all(weightPromises);
  return weights.reduce((acc, weight) => acc + weight, 0);
};
