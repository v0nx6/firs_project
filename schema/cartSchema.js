import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Product",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

const cart = mongoose.model("Cart", cartSchema);
export default cart;
