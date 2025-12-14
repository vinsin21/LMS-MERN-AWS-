import mongoose from "mongoose";
import fs from "fs";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let error = err;

    // Handle Multer-specific errors
    if (err.name === 'MulterError') {
        if (err.code === 'LIMIT_FILE_SIZE') {
            error = new ApiError(400, "File too large. Maximum size is 5MB");
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            error = new ApiError(400, "Unexpected file field");
        } else {
            error = new ApiError(400, err.message);
        }
    }
    // Handle file filter errors (invalid file type)
    else if (err.message && err.message.includes('Invalid file type')) {
        error = new ApiError(400, err.message);
    }
    // Handle other errors
    else if (!(error instanceof ApiError)) {
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

    // Ensure CORS headers are set even for error responses
    const origin = req.headers.origin;
    if (origin && process.env.CORS_ORIGIN) {
        // Check if origin matches allowed origin
        const allowedOrigin = process.env.CORS_ORIGIN === origin ? origin : null;
        if (allowedOrigin) {
            res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
    }

    return res.status(error.statusCode).json(response);
};

export { errorHandler };

