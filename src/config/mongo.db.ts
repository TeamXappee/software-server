import mongoose from "mongoose";

require("dotenv").config();
const MONGODB_CONNECTION_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
  console.log("Connecting to database...");
  if (!MONGODB_CONNECTION_URI)
    return console.log("MONGODB_CONNECTION_URI is not defined");
  try {
    await mongoose.connect(MONGODB_CONNECTION_URI);
    console.log("Database connected. (MongoDB)");
  } catch (error: any) {
    console.error("couldn't connect db", error);
  }
}
