import { Response } from "express";

export const checkImportingOrdersParams = (
  from: string,
  to: string,
  channelIds: string,
  res: Response
) => {
  if (!from || !to) {
    res
      .status(400)
      .json({ message: "Didn't receive date ranges, It's required." });
    return;
  }

  if (!channelIds || channelIds.length === 0) {
    res
      .status(400)
      .json({ message: "Didn't receive channel_ids, It's required." });
    return;
  }
};
