import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { teamService } from "./team.service";

const createATeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamService.createATeamMember(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Team member created Successfully",
    data: result,
  });
});
const getALLTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamService.getAllTeamMember();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team members are retrieved Successfully",
    data: result,
  });
});
const getSingleTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamService.getSingleTeamMember(req.params.memberId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member is retrieved Successfully",
    data: result,
  });
});
const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamService.deleteTeamMember(req.params.memberId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member is deleted Successfully",
    data: result,
  });
});

const updateATeamMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamService.updateATeamMember(req, req.params.memberId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Team member is updated Successfully",
    data: result,
  });
});

export const teamController = {
  createATeamMember,
  getALLTeamMember,
  getSingleTeamMember,
  deleteTeamMember,
  updateATeamMember,
};
