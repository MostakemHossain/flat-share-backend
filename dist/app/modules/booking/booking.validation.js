"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidation = void 0;
const zod_1 = require("zod");
const postBookingRequestValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        flatId: zod_1.z.string({
            required_error: "Flat id is required",
        }),
    }),
});
const BookingStatus = {
    PENDING: "PENDING",
    BOOKING: "BOOKING",
    REJECTED: "REJECTED",
};
const approvalBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            BookingStatus.PENDING,
            BookingStatus.BOOKING,
            BookingStatus.REJECTED,
        ]),
    }),
});
exports.bookingValidation = {
    postBookingRequestValidationSchema,
    approvalBookingValidationSchema,
};
