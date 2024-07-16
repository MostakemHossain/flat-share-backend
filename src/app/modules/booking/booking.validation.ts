import { z } from "zod";

const postBookingRequestValidationSchema = z.object({
  body: z.object({
    flatId: z.string({
      required_error: "Flat id is required",
    }),
  }),
});

export const bookingValidation = {
  postBookingRequestValidationSchema,
};
