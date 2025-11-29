import mongoose from "mongoose";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    // Cleanup files if an error occurred
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            if (err) console.log("Error removing file: ", err);
        });
    }
    if (req.files) {
        // req.files can be an array or an object
        const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
        files.forEach(file => {
            fs.unlink(file.path, (err) => {
                if (err) console.log("Error removing file: ", err);
            });
        });
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    };

    return res.status(error.statusCode).json(response);
};

export { errorHandler };
