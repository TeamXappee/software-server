import { PostCode } from "../models/postcode.model";

export const retrievePostCode = async (
  carrier_id: string,
  name: string,
  service?: string
) => {
  if (service) return await PostCode.findOne({ carrier_id, name, service });
  return await PostCode.findOne({ carrier_id, name, service: { $exists: false } });
};
