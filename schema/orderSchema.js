import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    item: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

const order = mongoose.model("Order", orderSchema);
export default order;
