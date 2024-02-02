import { Request, Response } from "express";
import { storeImportedOrders } from "../services/orders.service";
import { checkImportingOrdersParams } from "../utils/order.utils";
import { importOrders } from "../helpers/orders.helper";
import { retrieveAllCarriers } from "../services/carrier.service";
import { calculateInvoice } from "../helpers/invoice.helper";

require("dotenv").config();

export const importOrdersWithRange = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { from, to, channelIds } = req.body;
  checkImportingOrdersParams(from, to, channelIds, res);

  try {
    const { orders, error } = await importOrders(from, to, channelIds);
    if (error) {
      res.status(500).json({
        message: "Something went wrong while fetching orders.",
        error,
      });
    }

    const { addedOrders, duplicateCount } = await storeImportedOrders(orders);
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
  checkImportingOrdersParams(from, to, channelIds, res);

  try {
    const { orders, error } = await importOrders(from, to, channelIds);
    if (error) {
      res.status(500).json({
        message: "Something went wrong while importing orders.",
        error,
      });
    }

    const carriers = await retrieveAllCarriers();

    const { carrierFeesMap, missedOrders } = await calculateInvoice(
      orders,
      carriers
    );
    res
      .status(200)
      .json({ carrierFeesMap, errors: missedOrders.length, missedOrders });
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong while calculating invoices.",
      error: error.message,
    });
  }
};
