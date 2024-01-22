import { Client, TClient } from "../models/client.model";
import { handleError } from "../utils/handleError";

export const saveClient = async (customer: TClient) => {
  try {
    const newClient = new Client(customer);
    return await newClient.save();
  } catch (err: any) {
    handleError(err);
  }
};
