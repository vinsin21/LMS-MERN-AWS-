import { z } from "zod";

// MongoDB ObjectId regex pattern (24-character hex string)
const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format");

export const createCourseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    price: z.number().min(0, "Price must be a non-negative number"),
    originalPrice: z.number().min(0, "Original price must be a non-negative number"),
    tag: z.string().optional(),
    duration: z.number().optional(),
    level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
    joined: z.number().optional(),
    introduction: z.string().min(10, "Introduction must be at least 10 characters long").max(700, "Introduction must be at most 700 characters long").optional(),
    timeline: z.array(z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
        weekRange: z.string().min(3, "Week range must be at least 3 characters long").max(100, "Week range must be at most 100 characters long"),
        description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    })).optional(),
    learning: z.array(z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must be at most 100 characters long"),
        description: z.string().min(10, "Description must be at least 10 characters long").max(1000, "Description must be at most 1000 characters long"),
    })).optional(),
    prerequisites: z.array(z.string().min(3, "Prerequisite must be at least 3 characters long").max(100, "Prerequisite must be at most 100 characters long")).optional(),
    thumbnail: z.string().optional(),
    instructor: objectIdSchema.optional(),
    faq: z.array(z.object({
        question: z.string().min(3, "Question must be at least 3 characters long").max(100, "Question must be at most 100 characters long"),
        answer: z.string().min(10, "Answer must be at least 10 characters long").max(1000, "Answer must be at most 1000 characters long"),
    })).optional(),
    testimonial: objectIdSchema.optional(),
    status: z.enum(["draft", "published", "deleted", "archived"]).optional(),
    createdBy: objectIdSchema.optional(),
    updatedBy: objectIdSchema.optional(),
})

