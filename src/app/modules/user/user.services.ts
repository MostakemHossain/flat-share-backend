import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { selectUserFields } from "./user.constant";

const prisma = new PrismaClient();

const userRegistration = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      fullName: payload.fullName,
      userName: payload.userName,
      email: payload.email,
      password: hashedPassword,
    },
    select: selectUserFields,
  });
  return result;
};

export const userServices = {
  userRegistration,
};
