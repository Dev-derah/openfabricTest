import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import config from "./config.js";
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? config.production.origin
        : config.development.origin,
  })
);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    app.listen(8080, () => console.log("server started at port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();