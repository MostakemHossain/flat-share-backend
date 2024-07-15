import { userRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { contactController } from "./contact.controller";
import { contactValidation } from "./contact.validation";
const router = express.Router();

router.post(
  "/create-a-contact",
  validateRequest(contactValidation.createContactValidationSchema),
  contactController.createAContact
);
router.get(
  "/",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  contactController.getAllContact
);
router.delete(
  "/:id",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  contactController.deleteAContact
);

export const contactRoutes = router;
