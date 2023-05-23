import jwt from "jsonwebtoken";
import User from "../mongodb/models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  let token;
  token = req.cookies.token;

  //   Check if token exixts
  if (!token) {
    return res.status(404).json({ "success":false,message: "Token not found" });
  }
  try {
    //verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id).select("-password");
    next();
  } catch (error) {
    res.clearCookie("token");
    next(res.status(401).json({ message: "Not authorized, token failed" }));
  }
};

export { isAuthenticated };
