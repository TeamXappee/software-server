import mongoose, { Document, Schema } from "mongoose";

interface IChannel extends Document {
  channel_id: number;
  name: string;
  type: string;
  enable: boolean;
}

const channelSchema: Schema = new Schema(
  {
    channel_id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    enable: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Channel = mongoose.model<IChannel>("Channel", channelSchema);
