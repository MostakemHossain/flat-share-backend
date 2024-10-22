import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { fileUploader } from "../../shared/fileUpload";
const prisma = new PrismaClient();

const createATeamMember = async (req: Request) => {
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

  // delete req.body.file;
  const result = await prisma.teamMember.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      contactNo: req.body.contactNo,
      role: req.body.role,
      facebookLink: req.body.facebookLink,
      twitterLink: req.body.twitterLink,
      linkedinLink: req.body.linkedinLink,
      profilePhoto: req.body.profilePhoto,
    },
  });

  return result;
};

const getAllTeamMember = async () => {
  const result = await prisma.teamMember.findMany({});
  return result;
};
const getSingleTeamMember = async (id: string) => {
  const result = await prisma.teamMember.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return result;
};
const deleteTeamMember = async (id: string) => {
  const result = await prisma.teamMember.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateATeamMember = async (req: Request, id: string) => {
  const file = req.file;
  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      delete req.body.profilePhoto;
      req.body.profilePhoto = uploadedProfileImage.secure_url;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Profile image upload failed!"
      );
    }
  }
  const result = await prisma.teamMember.update({
    where: {
      id,
    },
    data: {
      ...req.body,
    },
  });
  return result;
};

export const teamService = {
  createATeamMember,
  getAllTeamMember,
  getSingleTeamMember,
  deleteTeamMember,
  updateATeamMember,
};
