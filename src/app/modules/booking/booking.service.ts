import { PrismaClient } from "@prisma/client";
import { TPagination } from "../../interfaces/pagination";
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

const getMyBookingRequest = async (user: any) => {
  const res = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      flat: true,
    },
  });
  return res;
};

const getAllBookingRequest = async (
  params: IBookingFilterRequest,
  options: TPagination
) => {
  const result = await prisma.booking.findMany({
    include: {
      flat: true,
    },
  });

  return {
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
