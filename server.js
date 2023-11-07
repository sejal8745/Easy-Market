// const express = require('express')

// const colors = require('colors')
import cors from "cors";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";

dotenv.config();

//connect db
connectDB();
//rest object: to use api
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-commerce app",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//run the app
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`.bgGreen.white);
});
