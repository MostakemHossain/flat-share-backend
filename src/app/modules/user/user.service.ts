import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { TPagination } from "../../interfaces/pagination";
import { fileUploader } from "../../shared/fileUpload";
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

const updateMyProfile = async (user: any, req: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      status: "ACTIVE",
    },
  });

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist!");
  }

  const file = req.file;

  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      req.body.profilePhoto = uploadedProfileImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Profile image upload failed!"
      );
    }
  }

  const { fullName, userName, bio, profession, address, profilePhoto } =
    req.body;

  const result = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: {
        fullName,
        userName,
        profilePhoto,
      },
    });

    const updatedUserProfile = await tx.userProfile.upsert({
      where: { userId: user.id },
      update: {
        bio,
        profession,
        address,
      },
      create: {
        userId: user.id,
        bio,
        profession,
        address,
      },
    });

    return { updatedUser, updatedUserProfile };
  });

  return result;
};

const getMyProfile = async (user: any) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: {
      userProfile: true,
    },
  });
  return result;
};

const updateRoleAndStatus = async (
  payload: Partial<User>,
  id: string,
  user: any
) => {
  if (user.role === "SUPER_ADMIN") {
    return prisma.user.update({
      where: { id },
      data: payload,
      select: selectUserFields,
    });
  } else if (user.role === "ADMIN") {
    if (payload.role === "SUPER_ADMIN") {
      throw new Error(`Admin cannot change role to super_admin.`);
    } else {
      return prisma.user.update({
        where: { id },
        data: payload,
        select: selectUserFields,
      });
    }
  } else {
    throw new Error(`User does not have permission to update roles.`);
  }
};

export const userServices = {
  userRegistration,
  getAllUsers,
  getSingleUser,
  deleteAUser,
  updateMyProfile,
  getMyProfile,
  updateRoleAndStatus,
};
