import { Channel } from "../models/channel.model";

export const retrieveAllChannels = async () => {
  return await Channel.find();
};
