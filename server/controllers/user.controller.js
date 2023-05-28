import { serialize } from "cookie";
import User from "../mongodb/models/userModel.js";
// LOGIN Authenticated user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and Password are required" });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isMatch = await user.comparePassword(password, user.password);

    // if password is incorrect, return error
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // if user and password are valid, return success
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const sendTokenResponse = async (user, statusCode, res) => {
  const token = await user.getJwtToken();
  const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: ".openfabrictest.onrender.com",
  };
  const tokenCookie = serialize("token", token, cookieOptions);
  res.setHeader("Set-Cookie", tokenCookie);

  res.status(statusCode).json({ success: true, token });
};

//create new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const userExists = await User.findOne({ email });

  try {
    if (!firstName || !lastName || !email || !phoneNumber || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (userExists)
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    const newUser = await User.create({
      firstName,
      lastName,
      phoneNumber,
      password,
      email,
    });
    // Save user to MongoDB
    await newUser.save();
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      secure: false,
      sameSite: "none",
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate("products");

  if (user) {
    res.json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        products: user.products,
      },
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
const updateUserProfile = async (req, res) => {
  const { _id } = req.user;
  const body = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { ...body },
      { new: true }
    );
    user.save();

    res.status(200).json({ mesaage: "Successfully Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUserProfile = async (req, res) => {};

export {
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  loginUser,
};
