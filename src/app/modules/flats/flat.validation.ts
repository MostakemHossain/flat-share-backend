import { z } from "zod";

const createFlatValidationSchema = z.object({
  squareFeet: z
    .number({
      required_error: "Square feet is required",
    })
    .int()
    .min(1, "Square feet must be at least 1"),
  totalBedrooms: z
    .number({
      required_error: "Total bedrooms are required",
    })
    .int()
    .min(0, "Total bedrooms cannot be negative"),
  totalRooms: z
    .number({
      required_error: "Total rooms are required",
    })
    .int()
    .min(1, "Total rooms must be at least 1"),
  utilitiesDescription: z.string({
    required_error: "Utilities description is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  rent: z
    .number({
      required_error: "Rent is required",
    })
    .int()
    .min(0, "Rent must be at least 0"),
  parking: z.boolean(),
  availability: z.boolean(),
  advanceAmount: z
    .number({
      required_error: "Advance amount is required",
    })
    .int()
    .min(0, "Advance amount must be at least 0"),
});

export const flatValidation = {
  createFlatValidationSchema,
};
