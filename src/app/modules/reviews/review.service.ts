import { PrismaClient } from "@prisma/client";
import { TReview } from "./review.interface";
const prisma = new PrismaClient();

const createAReview = async (user: any, payload: TReview) => {

  const result = await prisma.review.create({
    data: {
      ...payload,
      userId: user.id,
      email: user.email,
    },
  });
  return result;
};

export const reviewService = {
  createAReview,
};
