import express from "express";
import {
  createProduct,
  getProductDetail,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product.controller.js ";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();
router.get('/', getAllProducts)
router.post("/create",isAuthenticated,upload.single('productImage'),createProduct);
router.get("/getProductDetail/:id", getProductDetail);
router.patch(
  "/update/:id",
  isAuthenticated,
  upload.single('productImage'),
  updateProduct
);
router.delete('/delete/:id',isAuthenticated,deleteProduct)

export default router;