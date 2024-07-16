import { PrismaClient } from "@prisma/client";

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
  const result = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
  });
  return result;
};

export const bookingService = {
  postBookingRequest,
  getMyBookingRequest,
};
