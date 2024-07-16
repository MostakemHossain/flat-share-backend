import { userRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingController } from "./booking.controller";
import { bookingValidation } from "./booking.validation";
const router = express.Router();

router.post(
  "/post-a-booking",
  validateRequest(bookingValidation.postBookingRequestValidationSchema),
  auth(userRole.USER),
  bookingController.postBookingRequest
);

export const bookingRoutes = router;