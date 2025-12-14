import { z } from "zod";

// MongoDB ObjectId regex pattern (24-character hex string)
const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format");

// Create Lecture Schema
export const createLectureSchema = z.object({
    course: objectIdSchema,
    module: objectIdSchema,
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long").optional(),
    videoUrl: z.string().url("Invalid video URL").optional(),
    duration: z.number().min(0, "Duration must be a non-negative number").optional(),
    isFreePreview: z.boolean().optional(),
    type: z.enum(["video", "article", "quiz"]).optional(),
    order: z.number().min(0, "Order must be a non-negative number").optional(),
});

// Update Lecture Schema (all fields optional)
export const updateLectureSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long").optional(),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long").optional(),
    videoUrl: z.string().url("Invalid video URL").optional(),
    duration: z.number().min(0, "Duration must be a non-negative number").optional(),
    isFreePreview: z.boolean().optional(),
    type: z.enum(["video", "article", "quiz"]).optional(),
    order: z.number().min(0, "Order must be a non-negative number").optional(),
});
