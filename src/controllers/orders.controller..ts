import e, { Request, Response } from "express";
import { retrieveMissingOrderWeight } from "../services/items.service";
import {
  retrieveOrdersWithOrderId,
  storeImportedOrders,
  updateOrders,
} from "../services/orders.service";
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

    const { carrierFeesMap, missedOrders, invoiceByOrder } =
      await calculateInvoice(orders, carriers);

    res.status(200).json({
      carrierFeesMap,
      invoiceByOrder,
      errors: missedOrders.length,
      missedOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Something went wrong while calculating invoices.",
      error: error.message,
    });
  }
};

export const fixMissingWeight = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    const orders = await retrieveOrdersWithOrderId(ids);
    const fixedOrdersPromises = orders.map(async (order) => {
      const totalWeight = await retrieveMissingOrderWeight(order);
      return { ...order.toObject(), totalWeight }; // Assuming Mongoose documents, use toObject() to modify them
    });

    const fixedOrders = await Promise.all(fixedOrdersPromises);

    await updateOrders(fixedOrders); // Ensure updateOrders can handle the structure of fixedOrders

    const updatedOrders = await retrieveOrdersWithOrderId(ids);

    res.status(200).json({ updatedOrders });
  } catch (error) {
    res
      .status(500)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};
