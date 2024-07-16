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
exports.bookingService = void 0;
const client_1 = require("@prisma/client");
const paginationHelpers_1 = require("../../helpers/paginationHelpers");
const booking_constant_1 = require("./booking.constant");
const prisma = new client_1.PrismaClient();
const postBookingRequest = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.create({
        data: {
            userId: user.id,
            flatId: payload.flatId,
        },
    });
    return result;
});
const getMyBookingRequest = (params, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, page, sortOrder, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    andConditions.push({
        userId: user.id,
    });
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingsSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                let value = filterData[key];
                // Convert string to boolean if the key is isBooked
                if (key === "isBooked" && typeof value === "string") {
                    value = value === "true";
                }
                return {
                    [key]: {
                        equals: value,
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.booking.findMany({
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
    const total = yield prisma.booking.count({
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
const getAllBookingRequest = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, page, sortOrder, skip } = paginationHelpers_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: booking_constant_1.bookingsSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => {
                let value = filterData[key];
                // Convert string to boolean if the key is isBooked
                if (key === "isBooked" && typeof value === "string") {
                    value = value === "true";
                }
                return {
                    [key]: {
                        equals: value,
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma.booking.findMany({
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
    const total = yield prisma.booking.count({
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
const approvalBookingRequest = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.bookingService = {
    postBookingRequest,
    getMyBookingRequest,
    getAllBookingRequest,
    approvalBookingRequest,
};
