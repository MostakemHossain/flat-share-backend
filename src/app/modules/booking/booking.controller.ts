import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { bookingService } from "./booking.service";

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
const getMyBookingRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingService.getMyBookingRequest(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "MY Booking Request retrieved Successfully",
      data: result,
    });
  }
);

export const bookingController = {
  postBookingRequest,
  getMyBookingRequest,
};
