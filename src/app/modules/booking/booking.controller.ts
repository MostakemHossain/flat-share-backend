import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { bookingService } from "./booking.constant";

const postBookingRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.postBookingRequest(req.body, user);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Post for a Booking Successfully",
      data: result,
    });
  }
);

export const bookingController = {
  postBookingRequest,
};
