import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // HYBRID APPROACH: We query DB on every request for fresh data (role, isActive)
        // This ensures instant role changes and account deactivation
        // 
        // FOR SMALL APPS (< 1000 users): Keep this DB query ✅
        // FOR LARGE APPS (scaling): Comment out DB query below and use decodedToken directly
        //   - Pro: No DB query = much faster
        //   - Con: Role/isActive stale until token expires (15 mins)
        // 
        // To optimize for scale, replace lines 23-27 with:
        // req.user = decodedToken;
        // next();
        const user = await User.findById(decodedToken?._id).select("-password -refreshTokens");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

/**
 * Middleware: Verify user account is active
 * MUST be used after verifyJWT middleware
 * 
 * Usage:
 * router.get('/protected', verifyJWT, checkActive, controller)
 */
export const checkActive = (req, res, next) => {
    if (!req.user.isActive) {
        throw new ApiError(403, "Your account has been deactivated. Please contact support.");
    }
    next();
};

/**
 * Middleware: Verify user has required role
 * MUST be used after verifyJWT middleware
 * 
 * @param {string[]} allowedRoles - Array of allowed roles (e.g., ['admin', 'instructor'])
 * 
 * Usage:
 * router.get('/admin/users', verifyJWT, checkActive, verifyRole(['admin']), getAllUsers)
 */
export const verifyRole = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            throw new ApiError(401, "Unauthorized - No role found");
        }

        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(403, `Access denied. Required role(s): ${allowedRoles.join(', ')}`);
        }

        next();
    };
};
