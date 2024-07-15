import { z } from "zod";

const loginUserValidation = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    password: z.string({
      required_error: "Password is Required",
    }),
  }),
});

export const authValidation = {
  loginUserValidation,
};
