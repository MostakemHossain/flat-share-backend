"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createTeamValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "Contact no is required",
        }),
        role: zod_1.z.string({
            required_error: "Contact no is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email(),
    }),
});
const updateTeamValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
        })
            .optional(),
        contactNo: zod_1.z
            .string({
            required_error: "Contact no is required",
        })
            .optional(),
        role: zod_1.z
            .string({
            required_error: "Contact no is required",
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email()
            .optional(),
    }),
});
