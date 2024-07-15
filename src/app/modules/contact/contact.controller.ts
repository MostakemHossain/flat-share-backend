import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { contactService } from "./contact.service";

const createAContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.createAContact(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Contact Created Successfully",
    data: result,
  });
});

export const contactController = {
  createAContact,
};
