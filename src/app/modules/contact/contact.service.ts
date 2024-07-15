import { Contact, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAContact = async (payload: Contact) => {
  const result = await prisma.contact.create({
    data: payload,
  });
  return result;
};

export const contactService = {
  createAContact,
};
