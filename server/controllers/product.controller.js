import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import User from "../mongodb/models/userModel.js";
import Product from "../mongodb/models/productsModel.js";
import { uploadToCloudinary } from "../middleware/multer.js";


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
  console.log(req.file)
  const user = await User.findById(req.user._id);
  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.file.size > 10485760) {
      return res
        .status(500)
        .json({ message: "File too large, file must not be more than 10MB" });
    }
    //upload image in cloudinary
    const result = await uploadToCloudinary(req.file);

    const newProduct = await Product.create({
      productName,
      productDescription,
      productImage: result,
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
  const { id } = req.params;
  const { productName, productDescription, price } = req.body;
  let productImage = "";

  if (!productName || !productDescription || !price) {
    console.log(productName, productDescription, price);
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    if (req.file) {
      // If a new image is provided, upload it to Cloudinary
      productImage = await uploadToCloudinary(req.file);
    } else {
      // If no new image is provided, use the existing image from the database
      const existingProduct = await Product.findById(id);
      productImage = existingProduct.productImage;
    }
    // Update the product with the new values
    await Product.findByIdAndUpdate(id, {
      productName,
      productDescription,
      price,
      productImage,
    });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
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
