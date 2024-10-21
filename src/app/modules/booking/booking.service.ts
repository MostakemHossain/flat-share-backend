import { Prisma, PrismaClient } from "@prisma/client";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { TPagination } from "../../interfaces/pagination";
import { bookingsSearchAbleFields } from "./booking.constant";
import { IBookingFilterRequest } from "./booking.interface";

const prisma = new PrismaClient();
const postBookingRequest = async (payload: any, user: any) => {
  const result = await prisma.booking.create({
    data: {
      userId: user.id,
      flatId: payload.flatId,
    },
  });
  return result;
};

const getMyBookingRequest = async (
  params: IBookingFilterRequest,
  options: TPagination,
  user: any
) => {
  const { limit, sortBy, page, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.BookingWhereInput[] = [];
  andConditions.push({
    userId: user.id,
  });

  if (searchTerm) {
    andConditions.push({
      OR: bookingsSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        let value = (filterData as any)[key];

        if (key === "isBooked" && typeof value === "string") {
          value = value === "true";
        }
        return {
          [key]: {
            equals: value,
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
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
    include: {
      flat: true,
    },
  });

  const total = await prisma.booking.count({
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

const getAllBookingRequest = async (
  params: IBookingFilterRequest,
  options: TPagination
) => {
  const { limit, sortBy, page, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.BookingWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookingsSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        let value = (filterData as any)[key];
        // Convert string to boolean if the key is isBooked
        if (key === "isBooked" && typeof value === "string") {
          value = value === "true";
        }
        return {
          [key]: {
            equals: value,
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.BookingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.booking.findMany({
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
    include: {
      flat: true,
      user: true,
    },
  });

  const total = await prisma.booking.count({
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

const approvalBookingRequest = async (payload: any, id: string) => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const bookingService = {
  postBookingRequest,
  getMyBookingRequest,
  getAllBookingRequest,
  approvalBookingRequest,
};
