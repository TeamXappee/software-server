import { File } from "../models/file.model";
import { Order } from "../models/order.model";
import { TFile, TFileMetaData } from "../types/file";
import { TOrderData } from "../types/order";

const saveFile = async (file: TFileMetaData) => {
  try {
    const newFile = new File({
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      channelName: file.channelName,
      channel: file.channel,
    });

    return newFile.save();
  } catch (error) {
    console.error("Error saving file:", error);
    throw error;
  }
};

const saveOrders = async (orders: TOrderData[]) => {
  try {
    await Order.insertMany(orders);
  } catch (error) {
    console.error("Error saving orders:", error);
    throw error; // or handle the error as per your application's needs
  }
};

export const saveOrdersAndFilesMetadata = async (files: TFile) => {
  try {
    for (const file of files) {
      const savedFile = await saveFile(file.metadata);
      await saveOrders(
        file.rows.map((order) => ({ ...order, file_id: savedFile._id }))
      );
    }
  } catch (error) {
    console.error("Error populating file data:", error);
    throw error;
  }
};
