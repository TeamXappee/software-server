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

const saveOrderDetails = async (orders: any) => {
  try {
    await Order.insertMany(orders);
  } catch (err: any) {
    handleError(err);
  }
};

export const saveNewFileData = async (
  metadata: any,
  orders: TOrderDetails[]
) => {
  try {
    const file = await saveFile({
      user_email: metadata.user_email,
      fileName: metadata.fileName,
      size: metadata.size,
      client_id: metadata.client_id,
    });

    if (file) {
      await saveOrderDetails(
        orders.map((order) => ({ file_id: file._id, ...order }))
      );
    }
  } catch (err) {
    handleError(err);
  }
};

export const fetchfilesByUserEmail = async (user_email: string) => {
  try {
    console.log(user_email, "user_emadddil");
    return await File.find({ user_email: String(user_email) });
  } catch (err) {
    handleError(err);
  }
};

export const fetchFilesByClientId = async (client_id: string) => {
  try {
    const files = await File.find({ client_id });
    console.log(files, "client_id");

    return files;
  } catch (err) {
    handleError(err);
  }
};
