import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/mongo.db";
import router from "./router";

require("dotenv").config();

export const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/api", router)
connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
