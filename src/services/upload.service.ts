import { TFile } from "../models/file.model";
import { File } from "../models/file.model";
import { Order, TOrderDetails } from "../models/order.modal";
import { handleError } from "../utils/handleError";

const saveFile = async (file: TFile) => {
  try {
    const newFile = new File(file);
    return await newFile.save();
  } catch (err: any) {
    handleError(err);
  }
};

const saveOrderDetails = async (orders: TOrderDetails[]) => {
  try {
    await Order.insertMany(orders);
  } catch (err: any) {
    handleError(err);
  }
};


export const saveUploadEntry = async (file: TFile, orders: TOrderDetails[]) => {

}
