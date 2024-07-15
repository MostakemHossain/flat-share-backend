import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { flatService } from "./flat.service";

const PostAFlat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await flatService.PostAFlat(user, req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Add a Flat created Successfully",
      data: result,
    });
  }
);

export const flatController = {
  PostAFlat,
};
