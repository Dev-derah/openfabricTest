import jwt from "jsonwebtoken";
import User from "../mongodb/models/userModel.js";

const isAuthenticated = async (req, res, next) => {
   const headers = req.headers.authorization || req.headers.Authorization;

   //   Check if token exixts
   if (!headers) {
     res.status(404).json({ message: "Token not found" });
   }

  //   Check if token exixts
  if (!token) {
    return res.status(404).json({ "success":false,message: "Token not found" });
  }
  try {
    const token = headers.split(" ")[1];
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
