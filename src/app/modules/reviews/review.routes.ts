import { userRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { reviewController } from "./review.controller";
import { reviewValidation } from "./review.validation";

const router = express.Router();
router.post(
  "/post-a-review",
  auth(userRole.USER),
  reviewController.createAReview
);

export const reviewRoutes = router;
