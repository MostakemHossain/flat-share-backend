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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const fileUpload_1 = require("../../shared/fileUpload");
const user_constant_1 = require("./user.constant");
const prisma = new client_1.PrismaClient();
const userRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const isUserExists = yield prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is Already exists");
    }
    const result = yield prisma.user.create({
        data: {
            fullName: payload.fullName,
            userName: payload.userName,
            email: payload.email,
            password: hashedPassword,
        },
        select: user_constant_1.selectUserFields,
    });
    return result;
});
const getAllUsers = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, page, sortOrder, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        console.log(searchTerm);
        andConditions.push({
            OR: user_constant_1.userSearchAbleFields.map((field) => ({
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
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : {
                createdAt: "desc",
            },
        select: user_constant_1.selectUserFields,
    });
    const total = yield prisma.user.count({
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
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false,
            status: "ACTIVE",
        },
        select: user_constant_1.selectUserFields,
    });
    return result;
});
const deleteAUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
        select: user_constant_1.selectUserFields,
    });
    return result;
});
const updateMyProfile = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma.user.findUniqueOrThrow({
        where: {
            id: user.id,
            status: "ACTIVE",
        },
    });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User does not exist!");
    }
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
    const { userName, bio, profession, address, profilePhoto, phone, gender, name, } = req.body;
    console.log(req.body);
    const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = yield tx.user.update({
            where: { id: user.id },
            data: {
                fullName: name,
                userName,
                gender,
                profilePhoto,
                phone,
                bio,
                address,
            },
        });
        const updatedUserProfile = yield tx.userProfile.upsert({
            where: { userId: user.id },
            update: {
                bio,
                profession,
                address,
            },
            create: {
                userId: user.id,
                bio,
                profession,
                address,
            },
        });
        return updatedUser;
    }));
    return result;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
        include: {
            userProfile: true,
        },
    });
    return result;
});
const updateRoleAndStatus = (payload, id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === "SUPER_ADMIN") {
        return prisma.user.update({
            where: { id },
            data: payload,
            select: user_constant_1.selectUserFields,
        });
    }
    else if (user.role === "ADMIN") {
        if (payload.role === "SUPER_ADMIN") {
            throw new Error(`Admin cannot change role to super_admin.`);
        }
        else {
            return prisma.user.update({
                where: { id },
                data: payload,
                select: user_constant_1.selectUserFields,
            });
        }
    }
    else {
        throw new Error(`User does not have permission to update roles.`);
    }
});
exports.userServices = {
    userRegistration,
    getAllUsers,
    getSingleUser,
    deleteAUser,
    updateMyProfile,
    getMyProfile,
    updateRoleAndStatus,
};
