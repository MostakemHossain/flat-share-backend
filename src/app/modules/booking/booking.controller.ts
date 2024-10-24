import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { bookingsFilterAbleFields } from "./booking.constant";
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
const getAllBookingRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const filters = pick(req.query, bookingsFilterAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await bookingService.getAllBookingRequest(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "ALL Booking Request retrieved Successfully",
      data: result,
    });
  }
);

const approvalBookingRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await bookingService.approvalBookingRequest(
      req.body,
      req.params.bookingId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Approval Booking Successfully",
      data: result,
    });
  }
);
export const bookingController = {
  postBookingRequest,
  getMyBookingRequest,
  getAllBookingRequest,
  approvalBookingRequest,
};
