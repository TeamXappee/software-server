import { TOrderData } from "./order";

export type TFileMetaData = {
  originalname: string;
  mimetype: string;
  size: number;
  channelName: string;
  channel: string;
};

export type TFile = {
  metadata: TFileMetaData;
  rows: TOrderData[];
}[];
