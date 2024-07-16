import { Prisma, PrismaClient } from "@prisma/client";
import { Request } from "express";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { TPagination } from "../../interfaces/pagination";
import { fileUploader } from "../../shared/fileUpload";
import { flatSearchAbleFields } from "./flat.constant";
import { IFlatFilterRequest } from "./flat.interface";
const prisma = new PrismaClient();

const PostAFlat = async (user: any, req: Request) => {
  const files = req.files as Express.Multer.File[];

  let flatPhotos: string[] = [];

  if (files && files.length > 0) {
    const uploadPromises = files.map((file) =>
      fileUploader.uploadToCloudinary(file)
    );
    const uploadResults = await Promise.all(uploadPromises);

    flatPhotos = uploadResults
      .filter((result) => !!result)
      .map((result) => result!.secure_url);
  }
  req.body.userId = user.id;
  const result = await prisma.flat.create({
    data: {
      ...req.body,
      photos: flatPhotos,
    },
  });

  return result;
};

const getAllFlats = async (
  params: IFlatFilterRequest,
  options: TPagination
) => {
  const { limit, sortBy, page, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.FlatWhereInput[] = [];

  // Add search term condition if it exists
  if (searchTerm) {
    andConditions.push({
      OR: flatSearchAbleFields
        .filter((field) =>
          ["location", "utilitiesDescription", "description"].includes(field)
        )
        .map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
    });
  }

  // Add other filter conditions
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        const value = (filterData as any)[key];
        const isNumericField = [
          "squareFeet",
          "totalBedrooms",
          "totalRooms",
          "rent",
          "advanceAmount",
        ].includes(key);
        return {
          [key]: {
            equals: isNumericField ? parseInt(value as string, 10) : value,
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.FlatWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.flat.findMany({
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
  });
  const total = await prisma.flat.count({
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
const deleteAPostFlat = async (id: string) => {
  const result = await prisma.flat.delete({
    where: { id },
  });
  return result;
};
export const flatService = {
  PostAFlat,
  getAllFlats,
  deleteAPostFlat,
};
