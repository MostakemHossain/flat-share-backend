import { z } from "zod";
const createReviewValidationSchema = z.object({
  body: z.object({
    rating: z
      .number({
        required_error: "Rating is required",
      })
      .int()
      .min(1)
      .max(5),
    message: z
      .string({
        required_error: "message is required",
      })
      .min(1)
      .max(500),
   
  }),
});
export const reviewValidation = {
  createReviewValidationSchema,
};
