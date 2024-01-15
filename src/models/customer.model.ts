import mongoose, { Schema, Document } from "mongoose";

export interface IChannel extends Document {
  name: string;
  channel: string;
}

const channelSchema: Schema = new Schema({
  name: String,
  channel: String,
});

export const Channel = mongoose.model<IChannel>("Channel", channelSchema);
