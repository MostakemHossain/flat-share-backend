import { Request, Response } from "express";
import httpStatus from "http-status";
import { pick } from "lodash";
import { TPagination } from "../../interfaces/pagination";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { flatFilterAbleFields } from "./flat.constant";
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
const getAllFlats = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const filters = pick(req.query, flatFilterAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await flatService.getAllFlats(
      filters,
      options as TPagination
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All flats retrieved Successfully",
      data: result,
    });
  }
);

const deleteAPostFlat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await flatService.deleteAPostFlat(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Flat deleted Successfully",
      data: result,
    });
  }
);
const getAPostFlat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await flatService.getAPostFlat(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Flat Retrieved Successfully",
      data: result,
    });
  }
);
const updateAFlat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await flatService.updateAFlat(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Flat Updated Successfully",
      data: result,
    });
  }
);

export const flatController = {
  PostAFlat,
  getAllFlats,
  deleteAPostFlat,
  getAPostFlat,
  updateAFlat,
};
