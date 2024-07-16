import { z } from "zod";

const createTeamValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    contactNo: z.string({
      required_error: "Contact no is required",
    }),
    role: z.string({
      required_error: "Contact no is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
  }),
});
