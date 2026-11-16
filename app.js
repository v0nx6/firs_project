import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import api from "./controller/api.js";
import user from "./controller/profile.js";
import productRoute from "./controller/productRoute.js";
import "dotenv/config";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("succes to connect!");
  } catch (error) {
    console.error(error);
  }
};
conn();

app.use("/api", api);
app.use("/user", user);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
