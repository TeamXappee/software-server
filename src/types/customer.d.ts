import { IChannel } from "../models/customer.model";

export type TCahnnel = {
  [K in keyof IChannel]: IChannel[K];
};
