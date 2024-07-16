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

export const teamController = {
  createATeamMember,
};
