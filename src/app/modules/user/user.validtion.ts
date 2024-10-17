import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: "Full name is required",
    }),
    userName: z.string({
      required_error: "Username is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
     
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    bio: z.string().optional(),
    profession: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  createUser: createUserValidationSchema,
  updateUserValidationSchema,
};
