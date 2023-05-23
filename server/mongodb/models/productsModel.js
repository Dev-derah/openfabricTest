import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productImage: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", ProductSchema);

export default productModel;
