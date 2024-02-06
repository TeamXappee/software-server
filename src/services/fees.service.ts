import { Fee } from "../models/fees.model";

export const retrieveAllFees = async    () => {
  return await Fee.find();
};
