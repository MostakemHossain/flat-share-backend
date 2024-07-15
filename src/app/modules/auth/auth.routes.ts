import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";
import { userRole } from "@prisma/client";
const router = express.Router();
router.post(
  "/login-user",
  validateRequest(authValidation.loginUserValidation),
  authController.loginUser
);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/change-password",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER),
  authController.changePassword
);

export const authRoutes = router;
