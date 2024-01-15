import { TOrderData } from "./order";

export type TFileMetaData = {
  originalname: string;
  mimetype: string;
  channelName: string;
};

export type TFile = {
  metadata: TFileMetaData;
  rows: TOrderData[];
}[];
