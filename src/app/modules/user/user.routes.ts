import { userRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploader } from "../../shared/fileUpload";
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

router.delete("/:userId", userController.deleteAUser);

router.patch(
  "/profile/update-my-profile",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN, userRole.USER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;
