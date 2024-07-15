import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { fileUploader } from "../../shared/fileUpload";
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

export const flatService = {
  PostAFlat,
};
