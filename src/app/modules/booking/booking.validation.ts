import { z } from "zod";

const postBookingRequestValidationSchema = z.object({
  body: z.object({
    flatId: z.string({
      required_error: "Flat id is required",
    }),
  }),
});

const BookingStatus = {
  PENDING: "PENDING",
  BOOKING: "BOOKING",
  REJECTED: "REJECTED",
} as const;

const approvalBookingValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      BookingStatus.PENDING,
      BookingStatus.BOOKING,
      BookingStatus.REJECTED,
    ]),
  }),
});

export const bookingValidation = {
  postBookingRequestValidationSchema,
  approvalBookingValidationSchema,
};
