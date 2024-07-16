"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatValidation = void 0;
const zod_1 = require("zod");
const createFlatValidationSchema = zod_1.z.object({
    squareFeet: zod_1.z
        .number({
        required_error: "Square feet is required",
    })
        .int()
        .min(1, "Square feet must be at least 1"),
    totalBedrooms: zod_1.z
        .number({
        required_error: "Total bedrooms are required",
    })
        .int()
        .min(0, "Total bedrooms cannot be negative"),
    totalRooms: zod_1.z
        .number({
        required_error: "Total rooms are required",
    })
        .int()
        .min(1, "Total rooms must be at least 1"),
    utilitiesDescription: zod_1.z.string({
        required_error: "Utilities description is required",
    }),
    location: zod_1.z.string({
        required_error: "Location is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    rent: zod_1.z
        .number({
        required_error: "Rent is required",
    })
        .int()
        .min(0, "Rent must be at least 0"),
    parking: zod_1.z.boolean(),
    availability: zod_1.z.boolean(),
    advanceAmount: zod_1.z
        .number({
        required_error: "Advance amount is required",
    })
        .int()
        .min(0, "Advance amount must be at least 0"),
});
const updateFlatValidationSchema = zod_1.z.object({
    squareFeet: zod_1.z
        .number({
        required_error: "Square feet is required",
    })
        .int()
        .min(1, "Square feet must be at least 1")
        .optional(),
    totalBedrooms: zod_1.z
        .number({
        required_error: "Total bedrooms are required",
    })
        .int()
        .min(0, "Total bedrooms cannot be negative")
        .optional(),
    totalRooms: zod_1.z
        .number({
        required_error: "Total rooms are required",
    })
        .int()
        .min(1, "Total rooms must be at least 1")
        .optional(),
    utilitiesDescription: zod_1.z
        .string({
        required_error: "Utilities description is required",
    })
        .optional(),
    location: zod_1.z
        .string({
        required_error: "Location is required",
    })
        .optional(),
    description: zod_1.z
        .string({
        required_error: "Description is required",
    })
        .optional(),
    rent: zod_1.z
        .number({
        required_error: "Rent is required",
    })
        .int()
        .min(0, "Rent must be at least 0")
        .optional(),
    parking: zod_1.z.boolean().optional(),
    availability: zod_1.z.boolean().optional(),
    advanceAmount: zod_1.z
        .number({
        required_error: "Advance amount is required",
    })
        .int()
        .min(0, "Advance amount must be at least 0")
        .optional(),
});
exports.flatValidation = {
    createFlatValidationSchema,
    updateFlatValidationSchema,
};
