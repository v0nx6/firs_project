import mongoose from "mongoose";
import User from "./Schema.js";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

productSchema.index({ name: 1, seller: 1 }, { unique: true });

const product = mongoose.model("Product", productSchema);
export default product;
