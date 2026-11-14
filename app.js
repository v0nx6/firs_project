import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import api from "./controller/api.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

const conn = async () => {
  try {
    await mongoose.connect("mongodb://localhost/test123");
    console.log("succes to connect!");
  } catch (error) {
    console.error(error);
  }
};
conn();

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
