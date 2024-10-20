"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactValidation = void 0;
const zod_1 = require("zod");
const createContactValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is Required",
        })
            .email("Invalid email"),
        message: zod_1.z.string({
            required_error: "Message is required",
        }),
        subject: zod_1.z.string({
            required_error: "Subject is required",
        }),
        contactNo: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
    }),
});
exports.contactValidation = {
    createContactValidationSchema,
};
