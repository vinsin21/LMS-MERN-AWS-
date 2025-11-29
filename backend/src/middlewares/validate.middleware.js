import { ApiError } from "../utils/ApiError.js";
import { z } from "zod";

/**
 * Validate middleware
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {string} source - Source of data to validate ('body', 'params', 'query')
 */
const validate = (schema, source = 'body') => (req, res, next) => {
    try {
        const dataToValidate = req[source];
        schema.parse(dataToValidate);
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
