import { Request, Response } from "express";
import { userServices } from "./user.services";

const userRegistration = async (req: Request, res: Response) => {
  try {
    const result = await userServices.userRegistration(req.body);
    res.status(200).json({
      success: true,
      message: "User Registration Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const userController = {
  userRegistration,
};
