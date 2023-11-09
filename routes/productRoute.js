import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  productPhotoController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
} from "../controllers/ProductController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();

//create-product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

//get-product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get-photo
router.get("/product-photo/:pid", productPhotoController);

//delete-product
router.delete("/delete-product/:pid", deleteProductController);

//update-product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

//filter
router.post("/product-filters", productFiltersController);
//product count
router.get("/product-count", productCountController);

//product per-page
router.get("/product-list/:page", productListController);
export default router;
