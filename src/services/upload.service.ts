import { Charge } from "../models/charges.model";
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

const saveCharges = async (charges: any) => {
  // console.log(charges, "charges");
  // try {
  //   await Charge.insertMany(charges);
  // } catch (err: any) {
  //   handleError(err);
  // }
};

const savePostCodes = async (postCodes: any) => {
  console.log(postCodes, "postCodes");
  // try {
  //   await Charge.insertMany(charges);
  // } catch (err: any) {
  //   handleError(err);
  // }
};

export const saveNewFileData = async (metadata: any, results: any) => {
  try {
    const file = await saveFile({
      user_email: metadata.user_email,
      fileName: metadata.fileName,
      size: metadata.size,
      client_id: metadata.client_id,
      sheets: Object.keys(results),
    });

    if (file) {
      if (results["DETAILS"]) {
        await saveOrderDetails(
          results["DETAILS"].map((order: TOrderDetails) => ({
            file_id: file._id,
            ...order,
          }))
        );
      }
      if (results["CHARGES"]) {
        await saveCharges(
          results["CHARGES"].map((charge: any) => ({
            file_id: file._id,
            ...charge,
          }))
        );
      }
      if (results["OFA POSTCODE"]) {
        await savePostCodes(
          results["OFA POSTCODE"].map((postcode: any) => ({
            file_id: file._id,
            ...postcode,
          }))
        );
      }
    }
  } catch (err) {
    handleError(err);
  }
};

export const fetchfilesByUserEmail = async (user_email: string) => {
  try {
    return await File.find({ user_email: String(user_email) });
  } catch (err) {
    handleError(err);
  }
};

export const fetchFilesByClientId = async (client_id: string) => {
  try {
    const files = await File.find({ client_id });

    return files;
  } catch (err) {
    handleError(err);
  }
};

export const fetchFileByFileId = async (file_id: string) => {
  try {
    const file = await File.findById(file_id);
    return file;
  } catch (err) {
    handleError(err);
  }
};
