"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string({
            required_error: "Full name is required",
        }),
        userName: zod_1.z.string({
            required_error: "Username is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email("Invalid email address"),
        password: zod_1.z
            .string({
            required_error: "Password is required",
        })
            .min(6, "Password must be at least 6 characters long")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        profession: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.userValidation = {
    createUser: createUserValidationSchema,
    updateUserValidationSchema,
};
