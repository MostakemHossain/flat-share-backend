import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import config from "../../config";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { TPagination } from "../../interfaces/pagination";
import { selectUserFields, userSearchAbleFields } from "./user.constant";
import { IUserFilterRequest } from "./user.interface";

const prisma = new PrismaClient();

const userRegistration = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

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

const getAllUsers = async (
  params: IUserFilterRequest,
  options: TPagination
) => {
  const { limit, sortBy, page, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    console.log(searchTerm);
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: selectUserFields,
  });
  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
      status: "ACTIVE",
    },
    select: selectUserFields,
  });
  return result;
};
const deleteAUser = async (id: string) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
    select: selectUserFields,
  });
  return result;
};

export const userServices = {
  userRegistration,
  getAllUsers,
  getSingleUser,
  deleteAUser,
};
