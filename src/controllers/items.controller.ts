import { Request, Response } from "express";
import {
  storeItems,
  retrieveAllItems,
  storeOneItem,
} from "../services/items.service";

export const addNewItems = async (req: Request, res: Response) => {
  const { newItems } = req.body;

  if (!newItems) {
    res.status(400).json({ message: "No new items provided" });
  }
  // Add new items to the database
  try {
    const items = await storeItems(newItems);
    res.status(201).json({ message: "Items added successfully", items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addOneItem = async (req: Request, res: Response) => {
  const { newItem } = req.body;
  if (!newItem) {
    res.status(400).json({ message: "No new items provided" });
  }
  // Add new items to the database
  try {
    const item = await storeOneItem(newItem);
    res.status(201).json({ message: "Item added successfully", item });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const { page, pageSize } = req.query;
    if (!page || !pageSize) {
      res.status(400).json({ message: "Page and pageSize are required" });
    }
    const items = await retrieveAllItems(Number(page), Number(pageSize));
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
