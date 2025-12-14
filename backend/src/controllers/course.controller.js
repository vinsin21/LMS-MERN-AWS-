import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";


export const createCourse = asyncHandler(async (req, res) => {
    // Extract validated data from body
    // Note: rating, joined, moduleCount, lectureCount, totalDuration will use schema defaults
    const {
        title,
        description,
        price,
        originalPrice,
        tag,
        duration,
        level,
        introduction,
        timeline,
        learning,
        prerequisites,
        thumbnail,
        instructor,
        faq,
        testimonial,
        status
    } = req.body;

    // Business validation: Discounted price should not be greater than original price
    if (price > originalPrice) {
        throw new ApiError(400, "Discounted price cannot be greater than original price");
    }

    // Validate instructor exists and has instructor role (if provided)
    if (instructor) {
        const instructorUser = await User.findById(instructor).select("role").lean();

        if (!instructorUser) {
            throw new ApiError(400, "Instructor not found");
        }

        if (instructorUser.role !== "instructor" && instructorUser.role !== "admin" && instructorUser.role !== "superadmin") {
            throw new ApiError(400, "Selected user is not an instructor");
        }
    }

    // Create the course
    const course = await Course.create({
        title,
        description,
        price,
        originalPrice,
        tag,
        duration,
        level,
        introduction,
        timeline,
        learning,
        prerequisites,
        thumbnail,
        instructor,
        faq,
        testimonial,
        status: status || "draft",
        createdBy: req.user._id, // Always from authenticated user, never from body
    });

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, course, "Course created successfully")
    );
});