import { userRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { bookingController } from "./booking.controller";
import { bookingValidation } from "./booking.validation";
const router = express.Router();

router.post(
  "/post-a-booking",
  // validateRequest(bookingValidation.postBookingRequestValidationSchema),
  auth(userRole.USER),
  bookingController.postBookingRequest
);
router.get(
  "/my-booking-request",
  auth(userRole.USER),
  bookingController.getMyBookingRequest
);
router.get(
  "/all-booking-request",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  bookingController.getAllBookingRequest
);
router.put(
  "/approved-booking/:bookingId",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  validateRequest(bookingValidation.approvalBookingValidationSchema),
  bookingController.approvalBookingRequest
);

export const bookingRoutes = router;
