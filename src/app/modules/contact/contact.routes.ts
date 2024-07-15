import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { contactController } from "./contact.controller";
import { contactValidation } from "./contact.validation";
const router = express.Router();

router.post(
  "/create-a-contact",
  validateRequest(contactValidation.createContactValidationSchema),
  contactController.createAContact
);

export const contactRoutes = router;
