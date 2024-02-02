import { Carrier } from "../models/carrier.model";

export const retrieveAllCarriers = async () => {
  return await Carrier.find();
};
