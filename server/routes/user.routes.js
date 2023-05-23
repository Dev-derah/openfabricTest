import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js"
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);
router
  .route("/profile")
  .get(isAuthenticated, getUserProfile)
  .patch(isAuthenticated, updateUserProfile);

export default router;
