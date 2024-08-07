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
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const fileUpload_1 = require("../../shared/fileUpload");
const flat_constant_1 = require("./flat.constant");
const prisma = new client_1.PrismaClient();
const PostAFlat = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    let flatPhotos = [];
    if (files && files.length > 0) {
        const uploadPromises = files.map((file) => fileUpload_1.fileUploader.uploadToCloudinary(file));
        const uploadResults = yield Promise.all(uploadPromises);
        flatPhotos = uploadResults
            .filter((result) => !!result)
            .map((result) => result.secure_url);
    }
    req.body.userId = user.id;
    const result = yield prisma.flat.create({
        data: Object.assign(Object.assign({}, req.body), { photos: flatPhotos }),
    });
    return result;
});
const getAllFlats = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, page, sortOrder, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    // Add search term condition if it exists
    if (searchTerm) {
        andConditions.push({
            OR: flat_constant_1.flatSearchAbleFields
                .filter((field) => ["location", "utilitiesDescription", "description"].includes(field))
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
                const value = filterData[key];
                const isNumericField = [
                    "squareFeet",
                    "totalBedrooms",
                    "totalRooms",
                    "rent",
                    "advanceAmount",
                ].includes(key);
                return {
                    [key]: {
                        equals: isNumericField ? parseInt(value, 10) : value,
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.flat.findMany({
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
    });
    const total = yield prisma.flat.count({
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
const deleteAPostFlat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.flat.delete({
        where: { id },
    });
    return result;
});
const getAPostFlat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.flat.findUniqueOrThrow({
        where: { id },
    });
    return result;
});
const updateAFlat = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.flat.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
exports.flatService = {
    PostAFlat,
    getAllFlats,
    deleteAPostFlat,
    getAPostFlat,
    updateAFlat,
};
