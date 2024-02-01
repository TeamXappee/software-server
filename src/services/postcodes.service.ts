import { Postcodes } from "../models/charges.modal";

export const retrieveAllCharges = async () => {
  return await Postcodes.find();
};
