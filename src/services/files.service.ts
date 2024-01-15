import { File } from "../models/file.model";
import { Order } from "../models/order.model";
import { TFile, TFileMetaData } from "../types/file";
import { TOrder, TOrderData } from "../types/order";

const saveFile = async (file: TFileMetaData) => {
  try {
    const newFile = new File({
      originalname: file.originalname,
      type: file.mimetype,
      channelName: file.channelName,
    });

    return newFile.save();
  } catch (error) {
    console.error("Error saving file:", error);
    throw error;
  }
};

const saveOrders = async (orders: TOrder[]) => {
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
      const savedFile = await saveFile({
        ...file.metadata,
        channelName: file.rows[0].CHANNEL_NAME,
      });
      await saveOrders(
        file.rows.slice(0,15).map((order) => ({ data: order, file_id: savedFile._id }))
      );
    }
  } catch (error) {
    console.error("Error populating file data:", error);
    throw error;
  }
};

export const retrieveAllFiles = async () => {
  try {
    return await File.find();
  } catch (error:any) {
    console.error("Error retrieving files:", error);
    throw error;
  }
};
