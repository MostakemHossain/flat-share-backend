"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fileUpload_1 = require("../../shared/fileUpload");
const prisma = new client_1.PrismaClient();
const createATeamMember = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadedProfileImage = yield fileUpload_1.fileUploader.uploadToCloudinary(file);
        if (uploadedProfileImage && uploadedProfileImage.secure_url) {
            req.body.profilePhoto = uploadedProfileImage.secure_url;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Profile image upload failed!");
        }
    }
    // delete req.body.file;
    const result = yield prisma.teamMember.create({
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
});
const getAllTeamMember = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.teamMember.findMany({});
    return result;
});
const getSingleTeamMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.teamMember.findUniqueOrThrow({
        where: {
            id,
        },
    });
    return result;
});
const deleteTeamMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.teamMember.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateATeamMember = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    const file = req.file;
    if (file) {
        const uploadedProfileImage = yield fileUpload_1.fileUploader.uploadToCloudinary(file);
        if (uploadedProfileImage && uploadedProfileImage.secure_url) {
            delete req.body.profilePhoto;
            req.body.profilePhoto = uploadedProfileImage.secure_url;
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Profile image upload failed!");
        }
    }
    const result = yield prisma.teamMember.update({
        where: {
            id,
        },
        data: Object.assign({}, req.body),
    });
    return result;
});
exports.teamService = {
    createATeamMember,
    getAllTeamMember,
    getSingleTeamMember,
    deleteTeamMember,
    updateATeamMember,
};
