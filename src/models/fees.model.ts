import mongoose, { Document, Schema } from "mongoose";

export interface IFee extends Document {
  handling: {
    15000: 1.1;
    23000: 1.5;
    30000: 1.99;
  };
  addionalHandling: {
    15000: 0.55;
    23000: 0.75;
    30000: 0.95;
  };
  classes: {
    a: {
      15000: 0.1;
      23000: 0.1;
      30000: 0.1;
    };
    b: {
      15000: 0.45;
      23000: 0.65;
      30000: 0.85;
    };
    c: {
      15000: 0.9;
      23000: 1.25;
      30000: 1.5;
    };
    d: {
      15000: 1.99;
      23000: 2.99;
      30000: 3.99;
    };
  };
}

const FeeSchema: Schema = new Schema(
  {
    handling: {
      15000: { type: Number, required: true },
      23000: { type: Number, required: true },
      30000: { type: Number, required: true },
    },
    addionalHandling: {
      15000: { type: Number, required: true },
      23000: { type: Number, required: true },
      30000: { type: Number, required: true },
    },
    classes: {
      a: {
        15000: { type: Number, required: true },
        23000: { type: Number, required: true },
        30000: { type: Number, required: true },
      },
      b: {
        15000: { type: Number, required: true },
        23000: { type: Number, required: true },
        30000: { type: Number, required: true },
      },
      c: {
        15000: { type: Number, required: true },
        23000: { type: Number, required: true },
        30000: { type: Number, required: true },
      },
      d: {
        15000: { type: Number, required: true },
        23000: { type: Number, required: true },
        30000: { type: Number, required: true },
      },
    },
  },
  { timestamps: true }
);

export const Fee = mongoose.model<IFee>("Fee", FeeSchema);
