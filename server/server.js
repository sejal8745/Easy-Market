// const express = require('express')
import cors from "cors";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import bodyParser from "body-parser";
import path from "path";
import {fileURLToPath} from "url"

dotenv.config();

//connect db
connectDB();

//es-module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//rest object: to use api
const app = express();

//middleware
app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Express 3.0
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));

//app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-commerce app",
  });
});

//PORT
const PORT = process.env.PORT || 9000;

//run the app
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`.bgGreen.white);
});
