import { z } from "zod";

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is Required",
      })
      .email("Invalid email"),
    message: z.string({
      required_error: "Message is required",
    }),
    subject: z.string({
      required_error: "Subject is required",
    }),
    contactNo: z.string({
      required_error: "Contact Number is required",
    }),
  }),
});
export const contactValidation = {
  createContactValidationSchema,
};
