import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validtion";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(userValidation.createUser),
  userController.userRegistration
);

export const userRoutes = router;
