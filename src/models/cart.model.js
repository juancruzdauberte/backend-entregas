import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

export const Cart = model("Cart", cartSchema);
