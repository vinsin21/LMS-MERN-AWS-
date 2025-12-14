import { z } from "zod";

const userRegisterSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).max(20, { message: "Username must be at most 20 characters" }).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers and underscores" }),
    email: z.string().email({ message: "Invalid email address" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const userLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    username: z.string().optional(),
    password: z.string().min(1, "Password is required")
}).refine(data => data.email || data.username, {
    message: "Either email or username is required",
    path: ["email"]
});

const verifyEmailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().length(6, { message: "OTP must be 6 digits" })
});

const resendOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
});

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
});

const resetPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    token: z.string().uuid({ message: "Invalid reset token format" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
});

// Admin param validation
const getUserByIdSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID format" })
});

// Admin action validation (userId is validated in params via getUserByIdSchema)
const deactivateUserSchema = z.object({
    isActive: z.boolean({ required_error: "isActive is required" })
});

export {
    userRegisterSchema,
    userLoginSchema,
    verifyEmailSchema,
    resendOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    getUserByIdSchema,
    deactivateUserSchema
};
