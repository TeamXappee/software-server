import { Channel } from "../models/customer.model";
import { TCahnnel } from "../types/customer";

export const saveChannel = async (channel: TCahnnel) => {
  const nweChannel = new Channel(channel);
  await nweChannel.save();
  return nweChannel;
};
