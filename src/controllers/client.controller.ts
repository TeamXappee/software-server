import { Request, Response } from "express";

export const addNewClient = async (req: Request, res: Response) => {
  const client = req.body;
  res.status(200).json({ message: "Client added successfully" });
};

export const getAllExternalClients = async (req: Request, res: Response) => {
  const response = await fetch(
    "https://app6.selro.com/api/channels?secret=0647910b-d6f8-4d73-80fc-47b7e76a3daf&key=f08b593b-fd0d-4edc-8893-4370ff8fdbed"
  );

  const data = await response.json()
  console.log(data, "he")
  res.status(200).json({ message: "Client added successfully", channels:data });
};
