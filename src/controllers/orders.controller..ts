import { Request, Response } from "express";
import { storeImportedOrders } from "../services/orders.service";
import { TOrderDetails } from "../types";
import {
  extractOrdersData,
  fetchOrdersForChannel,
  processOrders,
} from "../helpers/orders.helper";
import { retrieveAllCharges } from "../services/postcodes.service";
require("dotenv").config();

export const importOrdersWithRange = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { from, to, channelIds, page, pagesize } = req.body;

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

  try {
    // Fetch orders for each channel ID
    const fetchPromises = channelIds.map((channelId: string) =>
      fetchOrdersForChannel(from, to, channelId)
    );

    const ordersResults = await Promise.all(fetchPromises);

    // Flatten the array of order arrays
    const allOrders = ordersResults.flat();

    // Store orders in database
    const extractedOrdersData = extractOrdersData(allOrders);
    const { addedOrders, duplicateCount } = await storeImportedOrders(
      extractedOrdersData
    );

    res.status(200).json({
      message: "Orders imported and stored successfully",
      orders: addedOrders,
      duplicateCount,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong while processing orders.",
      error: error.message,
    });
  }
};

export const calculateInvoices = async (req: Request, res: Response) => {
  const { from, to, channelIds } = req.body;
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

  try {
    // Fetch orders for each channel ID
    const fetchPromises = channelIds.map((channelId: string) =>
      fetchOrdersForChannel(from, to, channelId)
    );

    const ordersResults = await Promise.all(fetchPromises);

    // Flatten the array of order arrays
    const allOrders = ordersResults.flat();

    // Store orders in database
    const extractedOrdersData = extractOrdersData(allOrders);
    const { addedOrders } = await storeImportedOrders(extractedOrdersData);

    const charges = await retrieveAllCharges();

    const result = processOrders(addedOrders.slice(20), charges);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong while processing orders.",
      error: error.message,
    });
  }
};
