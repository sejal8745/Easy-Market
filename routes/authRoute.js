import express from "express";
import {
  registerController,
  loginController,
  testController,
  protectRouteController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

//text route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", requireSignIn, protectRouteController);

export default router;
