import { Channel } from "../models/channel.model";

export const retrieveAllChannels = async () => {
  return await Channel.find();
};

export const retrieveChannelsById = async (ids: string) => {
  return await Channel.find({ channel_id: { $in: ids } });
};
