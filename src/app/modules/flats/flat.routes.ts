import { userRole } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../shared/fileUpload";
import { flatController } from "./flat.controller";
import { flatValidation } from "./flat.validation";

const router = express.Router();
router.post(
  "/post-a-flat",
  auth(userRole.ADMIN, userRole.SUPER_ADMIN),
  fileUploader.upload.array("file", 3),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = flatValidation.createFlatValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return flatController.PostAFlat(req, res, next);
  }
);

router.get("/", flatController.getAllFlats);
router.delete("/:id", flatController.deleteAPostFlat);

export const flatRoutes = router;
