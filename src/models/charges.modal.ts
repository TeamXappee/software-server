import mongoose, { Document, Schema } from "mongoose";

interface PostCode {
  name: string;
  amount: number;
}

interface Charges {
  service: String;
  charges: any[];
}
export interface IPostcodes extends Document {
  carrier: string;
  postcodesList: PostCode[];
  charges: Charges[];
}

const PostcodeSchema: Schema = new Schema(
  {
    carrier: { type: String, required: true },
    postcodesList: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    charges: [
      {
        service: { type: String, required: true },
        charges: { type: Array, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Postcodes = mongoose.model<IPostcodes>(
  "Postcodes",
  PostcodeSchema
);
