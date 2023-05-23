import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import User from "../mongodb/models/userModel.js";
import Product from "../mongodb/models/productsModel.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductDetail = async (req, res) => {
  const { id } = req.params;
  const productExists = await Product.findOne({ _id: id }).populate("creator");

  if (productExists) {
    res.status(200).json(productExists);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
};

const createProduct = async (req, res) => {
  const { productName, productDescription, price } = req.body;
  const user = await User.findById(req.user._id);
  const file = req.file;
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //upload image in cloudinary
    const result = await cloudinary.uploader.upload(file.path);

    const newProduct = await Product.create({
      productName,
      productDescription,
      productImage: result.secure_url,
      price,
      creator: user._id,
    });

    user.products.push(newProduct._id);
    user.save();
    await newProduct.save();

    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productDescription, price, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Product.findByIdAndUpdate(
      { _id: id },
      {
        productName,
        productDescription,
        price,
        productImage: photoUrl || photo,
        email,
        creator: user._id,
      }
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.deleteOne({ _id: id });

    res.status(200).json({ mesaage: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
