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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const client_1 = require("@prisma/client");
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
const getMyBookingRequest = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma.booking.findMany({
        where: {
            userId: user.id,
        },
        include: {
            flat: true,
        },
    });
    return res;
});
const getAllBookingRequest = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.booking.findMany({
        include: {
            flat: true,
        },
    });
    return {
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
