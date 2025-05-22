import { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const Product = model("Product", productSchema);
