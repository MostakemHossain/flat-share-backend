import { Contact, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelper } from "../../helpers/paginationHelpers";
import { TPagination } from "../../interfaces/pagination";
import { contactSearchAbleFields } from "./contact.constant";
import { IContactFilterRequest } from "./contact.interface";
const prisma = new PrismaClient();

const createAContact = async (payload: Contact) => {
  const result = await prisma.contact.create({
    data: payload,
  });
  return result;
};
const getAllContacts = async (
  params: IContactFilterRequest,
  options: TPagination
) => {
  const { limit, sortBy, page, sortOrder, skip } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.ContactWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: contactSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.ContactWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.contact.findMany({
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
  const total = await prisma.contact.count({
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

const deleteAContact = async (id: string) => {
  const result = await prisma.contact.delete({
    where: {
      id,
    },
  });
  return result;
};

export const contactService = {
  createAContact,
  getAllContacts,
  deleteAContact,
};
