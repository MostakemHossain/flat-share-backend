import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { ILoginUser } from "./auth.interface";
const prisma = new PrismaClient();

const loginUser = async (payload: ILoginUser) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      isDeleted: false,
      status: "ACTIVE",
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Incorrect password");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt__access_secret as string,
    config.jwt__access_expire_in as string
  );
  const refreshToken = jwtHelpers.generateToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt__refresh_secret as string,
    config.jwt__refresh_expire_in as string
  );
  return {
    id: userData.id,
    name: userData.userName,
    email: userData.email,
    accessToken,
    refreshToken,
  };
};

export const authService = {
  loginUser,
};
