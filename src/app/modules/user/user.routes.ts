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
router.get(
  "/",
  //   auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllUser
);
router.get("/:userId", userController.getSingleUser);

export const userRoutes = router;
