import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import pick from "../../shared/pick";
import sendResponse from "../../shared/sendResponse";
import { userFilterAbleFields } from "./user.constant";
import { userServices } from "./user.service";

const userRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.userRegistration(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Registered Successfully",
    data: result,
  });
});
const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, userFilterAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await userServices.getAllUsers(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users Retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getSingleUser(req.params.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User is Retrieved successfully",
      data: result,
    });
  }
);

const deleteAUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.deleteAUser(req.params.userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User is deleted successfully",
      data: result,
    });
  }
);
const updateMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userServices.updateMyProfile(user, req);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Profile Updated Successfully",
      data: result,
    });
  }
);
const getMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userServices.getMyProfile(user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Profile Retrieved Successfully",
      data: result,
    });
  }
);

const updateRoleAndStatus = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await userServices.updateRoleAndStatus(
      req.body,
      req.params.id,
      user
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Role and Status updated Successfully",
      data: result,
    });
  }
);

export const userController = {
  userRegistration,
  getAllUser,
  getSingleUser,
  deleteAUser,
  updateMyProfile,
  getMyProfile,
  updateRoleAndStatus,
};
