import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  singleCategoryController,
  CreateCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

//route
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get categories
router.get("/get-category", categoryController);

//single category get
router.get("/get-category/:slug", singleCategoryController);

//delete-cateory
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
