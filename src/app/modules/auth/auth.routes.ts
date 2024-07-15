import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
const router = express.Router();
router.post(
  "/login-user",
  validateRequest(authValidation.loginUserValidation),
  authController.loginUser
);

export const authRoutes = router;
