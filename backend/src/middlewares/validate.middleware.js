import { ApiError } from "../utils/ApiError.js";
import { z } from "zod";

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            // console.log("Zod Validation Error:", JSON.stringify(err, null, 2)); // Debugging
            const errors = (err.errors || err.issues || []).map((e) => e.message);
            throw new ApiError(400, "Validation Error", errors);
        }
        // If it's not a ZodError, pass it to the global error handler
        next(err);
    }
};

export { validate };
