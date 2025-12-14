import { z } from "zod";

// MongoDB ObjectId regex pattern (24-character hex string)
const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format");

// Create Module Schema
export const createModuleSchema = z.object({
    course: objectIdSchema,
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long").optional(),
    order: z.number().min(0, "Order must be a non-negative number").optional(),
});

// Update Module Schema (all fields optional except we need to identify which module)
export const updateModuleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long").optional(),
    order: z.number().min(0, "Order must be a non-negative number").optional(),
});
