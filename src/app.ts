import express from "express";
import { connectToDatabase } from "./config/db";
import router from "./router";
import morgan from "morgan";

require("dotenv").config();
const cors = require("cors");

export const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('combined'));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
connectToDatabase();

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
