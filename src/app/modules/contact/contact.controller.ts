import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { contactFilterAbleFields } from "./contact.constant";
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
const getAllContact = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, contactFilterAbleFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await contactService.getAllContacts(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Contact retrieved successfully!",
    data: result,
  });
});
const deleteAContact = catchAsync(async (req: Request, res: Response) => {
  const result = await contactService.deleteAContact(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact deleted successfully!",
    data: result,
  });
});

export const contactController = {
  createAContact,
  getAllContact,
  deleteAContact,
};
