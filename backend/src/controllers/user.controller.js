import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { hashToken, verifyTokenHash } from "../utils/hashToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { emailVerificationTemplate, passwordResetTemplate, passwordChangedTemplate } from "../utils/emailTemplates.js";
import { availableUserRoles } from "../constants.js";
import jwt from "jsonwebtoken";
import argon2 from 'argon2';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { uploadToS3Avatar } from "../utils/s3.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // 1. Get user details from body (Validation handled by middleware)
    const { fullName, email, username, password } = req.body;

    // 2. Check if user already exists: username or email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        // If the existing user is NOT verified, allow re-registration
        // by deleting the old unverified account
        if (!existedUser.isEmailVerified) {
            await User.findByIdAndDelete(existedUser._id);
        } else {
            // User exists and IS verified - block registration
            throw new ApiError(409, "User with email or username already exists");
        }
    }

    // 3. Create user object - create entry in db
    const user = new User({
        fullName,
        avatar: null, // Default to null, user can upload later
        email,
        password,
        username: username.toLowerCase()
    });

    // 4. Generate Email Verification Token
    const verificationToken = user.generateEmailVerificationToken();

    await user.save();

    // 5. Send Verification Email
    let emailMessage = "User registered successfully. Please verify your email.";
    try {
        await sendEmail(
            user.email,
            "Verify Your Email - CoderGyan",
            emailVerificationTemplate(verificationToken)
        );
    } catch (error) {
        // If email sending fails, we log it but DO NOT rollback.
        // The user can request a new OTP later.
        console.error("Failed to send verification email during registration:", error);
        emailMessage = "User registered successfully, but failed to send verification email. Please use the resend-otp endpoint.";
    }

    // 6. Remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokens -emailVerificationToken -forgotPasswordToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 7. Send response
    return res.status(201).json(
        new ApiResponse(201, createdUser, emailMessage)
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // 1. Get email/username and password
    const { email, username, password } = req.body;

    // 2. Find user
    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // 3. Check if email is verified
    if (!user.isEmailVerified) {
        throw new ApiError(403, "Please verify your email before logging in");
    }

    // 4. Check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // 5. Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // 6. Save refresh token (hashed) to DB using atomic update
    const tokenHash = await hashToken(refreshToken);
    const userAgent = req.headers['user-agent'] || 'Unknown';

    await User.findByIdAndUpdate(
        user._id,
        {
            $push: {
                refreshTokens: {
                    $each: [{
                        tokenHash,
                        userAgent,
                        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days
                    }],
                    $slice: -5 // Keep only the last 5 tokens
                }
            }
        },
        { new: true, validateBeforeSave: false }
    );

    const loggedInUser = await User.findById(user._id).select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/",
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 })
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    if (user.emailVerificationToken !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.emailVerificationExpiry < Date.now()) {
        throw new ApiError(400, "OTP has expired");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Email verified successfully")
    );
});

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    // Generate new OTP
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Send Email
    await sendEmail(
        user.email,
        "Verify Your Email - CoderGyan",
        emailVerificationTemplate(verificationToken)
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "OTP sent successfully")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        // 1. Verify JWT signature first
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // 2. Fetch user
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // 3. Defensive check
        if (!user.refreshTokens || user.refreshTokens.length === 0) {
            throw new ApiError(401, "No active sessions. Please login again.");
        }

        // 4. Find matching token via Argon2 verification
        let matchedToken = null;
        for (const rt of user.refreshTokens) {
            const isValid = await verifyTokenHash(incomingRefreshToken, rt.tokenHash);
            if (isValid) {
                matchedToken = rt;
                break;
            }
        }

        // 5. Reuse Detection
        if (!matchedToken) {
            // Token signature is valid but not in DB = potential reuse attack
            // Invalidate ALL tokens for this user
            await User.findByIdAndUpdate(user._id, {
                $set: { refreshTokens: [] }
            });

            throw new ApiError(403, "Refresh token reused. All sessions invalidated. Please login again.");
        }

        // 6. Check expiration BEFORE generating new tokens
        if (new Date(matchedToken.expiresAt) < new Date()) {
            // Remove only the expired token atomically
            await User.findByIdAndUpdate(user._id, {
                $pull: {
                    refreshTokens: { tokenHash: matchedToken.tokenHash }
                }
            });
            throw new ApiError(403, "Refresh token expired. Please login again.");
        }

        // 7. Generate new tokens (only after validation passes)
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
        const newRefreshTokenHash = await hashToken(newRefreshToken);

        // 8. ATOMIC token rotation using findOneAndUpdate
        // This prevents race conditions by using MongoDB's atomic operations
        // IMPORTANT: We preserve createdAt from the original token to maintain audit trail
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: user._id,
                "refreshTokens.tokenHash": matchedToken.tokenHash // Find the exact token
            },
            {
                $set: {
                    // Replace the matched token with new one using positional operator
                    "refreshTokens.$": {
                        tokenHash: newRefreshTokenHash,
                        userAgent: req.headers['user-agent'] || 'Unknown',
                        createdAt: matchedToken.createdAt, // Preserve original creation time
                        expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days
                    }
                }
            },
            { new: true }
        );

        // 9. Verify atomic update succeeded
        if (!updatedUser) {
            // This shouldn't happen, but if it does, it means another request modified/removed the token
            throw new ApiError(409, "Token was modified by another request. Please try again.");
        }

        // 10. Set secure cookie options
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/",
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, { ...options, maxAge: 15 * 60 * 1000 }) // 15 min for access token
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "Access token refreshed"
                )
            );

    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (incomingRefreshToken) {
        // We can't easily find the token by hash since it's Argon2.
        // But we can find the user by the token (verify it first).
        try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

            const user = await User.findById(decodedToken?._id);

            if (user) {
                // Find and remove the specific token
                let tokenToRemove = null;
                for (const rt of user.refreshTokens) {
                    const isValid = await verifyTokenHash(incomingRefreshToken, rt.tokenHash);
                    if (isValid) {
                        tokenToRemove = rt;
                        break;
                    }
                }

                if (tokenToRemove) {
                    user.refreshTokens = user.refreshTokens.filter(rt => rt.tokenHash !== tokenToRemove.tokenHash);
                    await user.save({ validateBeforeSave: false });
                }
            }
        } catch (error) {
            // Ignore errors during logout (e.g. invalid token), just clear cookies
            console.log("Logout error (ignored):", error.message);
        }
    }

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        path: "/"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Timing attack mitigation: Always take similar time even if user doesn't exist
    const user = await User.findOne({ email });

    if (!user) {
        // Simulate ALL work to prevent timing attacks
        const dummyToken = crypto.randomUUID();
        await hashToken(dummyToken); // Simulate token hashing
        // Simulate DB save delay (approximate)
        await new Promise(resolve => setTimeout(resolve, 50));

        // Always return success to prevent email enumeration
        return res.status(200).json(
            new ApiResponse(200, {}, "If email exists, password reset link has been sent")
        );
    }

    // Generate UUID token (returns plain token, sets expiry)
    const resetToken = user.generateForgotPasswordToken();

    // Hash token before storing
    const tokenHash = await hashToken(resetToken);
    user.forgotPasswordToken = tokenHash;

    await user.save({ validateBeforeSave: false });

    // Send email with reset link
    try {
        await sendEmail(
            user.email,
            "Password Reset Request - CoderGyan",
            passwordResetTemplate(resetToken, email)
        );
    } catch (error) {
        // If email fails, clear the token
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, "Error sending password reset email. Please try again.");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "If email exists, password reset link has been sent")
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { email, token, newPassword } = req.body;

    // 1. Find user with non-expired token
    const user = await User.findOne({
        email,
        forgotPasswordExpiry: { $gt: new Date() }
    });

    if (!user || !user.forgotPasswordToken) {
        throw new ApiError(400, "Invalid or expired reset token");
    }

    // 2. Verify token hash
    const isValid = await verifyTokenHash(token, user.forgotPasswordToken);

    if (!isValid) {
        // Atomic increment of failed attempts WITH lock check
        // This prevents race conditions by checking lock status atomically
        const result = await User.findOneAndUpdate(
            {
                _id: user._id,
                $or: [
                    { accountLockedUntil: { $exists: false } },
                    { accountLockedUntil: { $lt: new Date() } } // Lock expired
                ]
            },
            {
                $inc: { resetAttempts: 1 }
            },
            { new: true }
        );

        // If result is null, account is currently locked
        if (!result) {
            throw new ApiError(429, "Account is locked due to too many failed attempts. Please try again later.");
        }

        // Check if we should lock the account after this attempt
        if (result.resetAttempts >= 5) {
            await User.findByIdAndUpdate(result._id, {
                accountLockedUntil: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
            });
            throw new ApiError(429, "Too many failed attempts. Account locked for 1 hour.");
        }

        throw new ApiError(400, "Invalid reset token");
    }

    // 3. Hash new password BEFORE the atomic update
    // Pre-save hooks don't run on findOneAndUpdate, so we hash manually
    const pepper = process.env.PEPPER || "";
    const hashedPassword = await argon2.hash(newPassword + pepper);

    // 4. Atomic password update + token clear + session invalidation
    const updatedUser = await User.findOneAndUpdate(
        {
            _id: user._id,
            forgotPasswordToken: user.forgotPasswordToken, // Verify token still exists
            forgotPasswordExpiry: { $gt: new Date() } // Double-check expiry
        },
        {
            $set: {
                password: hashedPassword,
                refreshTokens: [], // Logout all devices
                resetAttempts: 0 // Reset counter on success
            },
            $unset: {
                forgotPasswordToken: "",
                forgotPasswordExpiry: "",
                accountLockedUntil: "" // Remove lock if exists
            }
        },
        { new: true }
    );

    // 5. Check if token was already used (race condition)
    if (!updatedUser) {
        throw new ApiError(409, "Reset token already used or expired. Please request a new one.");
    }

    // 6. Send confirmation email
    const timestamp = new Date().toLocaleString();
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        await sendEmail(
            user.email,
            "Password Changed Successfully - CoderGyan",
            passwordChangedTemplate(email, timestamp, ipAddress, userAgent)
        );
    } catch (error) {
        // Email failure shouldn't block password reset
        console.error("Failed to send password changed confirmation:", error);
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Password reset successful. Please login with your new password.")
    );
});

// ===== ADMIN CONTROLLERS =====

/**
 * Get all users (Admin only)
 * SECURED VERSION - Defense in depth with multiple security layers
 */
const getAllUsers = asyncHandler(async (req, res) => {
    // SECURITY LAYER 1: Authorization check in controller (defense in depth)
    if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    // SECURITY LAYER 2: Validate and sanitize query params
    const { page, limit, role, isActive, search } = req.query;

    // Validate page number (strict integer check)
    const pageNum = page ? Number(page) : 1;
    if (!Number.isInteger(pageNum) || pageNum < 1) {
        throw new ApiError(400, "Page must be a valid positive integer");
    }

    // Validate and enforce max limit (prevent DoS)
    const limitNum = limit ? Number(limit) : 10;
    const MAX_LIMIT = 100;
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > MAX_LIMIT) {
        throw new ApiError(400, `Limit must be a valid integer between 1 and ${MAX_LIMIT}`);
    }

    // Build filter with sanitized values
    const filter = {};

    // SECURITY LAYER 3: Search functionality with sanitization
    if (search && typeof search === 'string') {
        // Sanitize search: limit length and escape regex special characters
        const sanitizedSearch = search.slice(0, 50).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (sanitizedSearch.trim()) {
            filter.$or = [
                { fullName: { $regex: sanitizedSearch, $options: 'i' } },
                { email: { $regex: sanitizedSearch, $options: 'i' } },
                { username: { $regex: sanitizedSearch, $options: 'i' } }
            ];
        }
    }

    // SECURITY LAYER 3: Whitelist role values (prevent NoSQL injection)
    if (role) {
        if (!availableUserRoles.includes(role)) {
            throw new ApiError(400, `Invalid role. Must be: ${availableUserRoles.join(', ')}`);
        }
        filter.role = role; // Safe - whitelisted
    }

    // SECURITY LAYER 4: Sanitize boolean (prevent injection)
    if (isActive !== undefined) {
        if (isActive !== 'true' && isActive !== 'false') {
            throw new ApiError(400, "isActive must be 'true' or 'false'");
        }
        filter.isActive = isActive === 'true';
    }

    // SECURITY LAYER 5: Hide super admin from regular admins
    // Only super admin can see super admin account
    if (!req.user.isSuperAdmin) {
        filter.isSuperAdmin = { $ne: true };
    }

    // Get users with pagination
    const users = await User.find(filter)
        .select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken")
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .sort({ createdAt: -1 });

    // Get total count
    const count = await User.countDocuments(filter);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                users,
                totalPages: Math.ceil(count / limitNum),
                currentPage: pageNum,
                totalUsers: count,
                limit: limitNum
            },
            "Users retrieved successfully"
        )
    );
});

/**
 * Get user by ID (Admin only)
 * Returns detailed user information
 */
const getUserById = asyncHandler(async (req, res) => {
    // SECURITY: Authorization check
    if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    const { userId } = req.params;
    // Note: userId validation is handled by Zod middleware

    // Get user
    const user = await User.findById(userId)
        .select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // SECURITY: Hide super admin from regular admins
    if (!req.user.isSuperAdmin && user.isSuperAdmin) {
        throw new ApiError(403, "Access denied. Cannot view super admin details.");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User retrieved successfully")
    );
});

/**
 * Deactivate/Activate user (Admin only)
 * Toggles user's isActive status
 */
const deactivateUser = asyncHandler(async (req, res) => {
    // SECURITY: Authorization check
    if (!req.user || req.user.role !== 'admin') {
        throw new ApiError(403, "Access denied. Admin privileges required.");
    }

    const { userId } = req.params;
    const { isActive } = req.body;
    // Note: Validation handled by Zod middleware

    // SECURITY: Prevent self-deactivation
    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "Cannot modify your own account status");
    }

    // Get target user
    const targetUser = await User.findById(userId);

    if (!targetUser) {
        throw new ApiError(404, "User not found");
    }

    // SECURITY: Protect super admin
    if (!req.user.isSuperAdmin && targetUser.isSuperAdmin) {
        throw new ApiError(403, "Access denied. Cannot modify super admin account.");
    }

    // Check if already in desired state
    if (targetUser.isActive === isActive) {
        // Sanitize user before returning
        const sanitizedUser = await User.findById(userId).select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken");

        return res.status(200).json(
            new ApiResponse(200, sanitizedUser, `User is already ${isActive ? 'active' : 'deactivated'}`)
        );
    }

    // Atomic update
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                isActive,
                // If deactivating, invalidate all sessions
                ...(isActive === false && { refreshTokens: [] })
            }
        },
        { new: true }
    ).select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken");

    const action = isActive ? "activated" : "deactivated";
    return res.status(200).json(
        new ApiResponse(200, updatedUser, `User ${action} successfully`)
    );
});

// to GetPresignedUrl For frontend

export const getPresignedUrlForAvatar = asyncHandler(async (req, res) => {
    const { mimeType } = req.body;
    if (!mimeType) {
        throw new ApiError(400, "Mime type is required");
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedMimeTypes.includes(mimeType)) {
        throw new ApiError(400, "Unsupported mime type");
    }
    const { uploadUrl, key } = await uploadToS3Avatar(mimeType);
    return res.status(200).json(
        new ApiResponse(200, { uploadUrl, key }, "Presigned URL generated successfully")
    )

})

export const updateS3KeyInUserAvatar = asyncHandler(async (req, res) => {
    const { key } = req.body


    const userId = req.user._id
    try {
        const user = await User.findByIdAndUpdate(userId, { avatar: key }, { new: true });
        return res.status(200).json(
            new ApiResponse(200, user, "Avatar updated successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating avatar");
    }
})

/*
        "fieldname": "wallpaper",
        "originalname": "pic1.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "./public/temp",
        "filename": "wallpaper-1765351824682-120933956.jpeg",
        "path": "public\\temp\\wallpaper-1765351824682-120933956.jpeg",
        "size": 65037

*/
/**
 * Update User Avatar
 * Allows authenticated users to upload/update their avatar
 * SECURITY: Validates file type, cleans up old files, handles errors properly
 */
// const updateUserAvatar = asyncHandler(async (req, res) => {
//     // 1. Check if file was uploaded

//     const avatarLocalPath = req.file?.path;

//     if (!avatarLocalPath) {
//         throw new ApiError(400, "Avatar file is required");
//     }

//     // 2. Verify uploaded file exists (defensive check)
//     if (!fs.existsSync(avatarLocalPath)) {
//         throw new ApiError(500, "File upload failed. Please try again.");
//     }

//     // 3. Validate file path (prevent directory traversal)
//     const normalizedPath = path.normalize(avatarLocalPath).replace(/\\/g, '/');
//     if (!normalizedPath.startsWith('public/temp')) {
//         // Cleanup the malicious file
//         fs.unlinkSync(avatarLocalPath);
//         throw new ApiError(400, "Invalid file path");
//     }

//     // 4. Get old avatar path before update (for cleanup)
//     const currentUser = await User.findById(req.user._id).select('avatar');
//     const oldAvatarPath = currentUser?.avatar;

//     try {
//         // 5. Update user's avatar in database
//         const updatedUser = await User.findByIdAndUpdate(
//             req.user._id,
//             {
//                 $set: {
//                     avatar: avatarLocalPath
//                 }
//             },
//             { new: true }
//         ).select("-password -refreshTokens -emailVerificationToken -forgotPasswordToken -emailVerificationExpiry -forgotPasswordExpiry -resetAttempts -accountLockedUntil");

//         if (!updatedUser) {
//             throw new ApiError(404, "User not found");
//         }

//         // 6. Delete old avatar file (if exists and is a local file)
//         if (oldAvatarPath && oldAvatarPath.startsWith('public/temp') && fs.existsSync(oldAvatarPath)) {
//             try {
//                 fs.unlinkSync(oldAvatarPath);
//             } catch (error) {
//                 // Log error but don't fail the request
//                 console.error("Failed to delete old avatar:", error);
//             }
//         }

//         return res.status(200).json(
//             new ApiResponse(200, updatedUser, "Avatar updated successfully")
//         );

//     } catch (error) {
//         // 7. Rollback: Delete newly uploaded file if DB update failed
//         if (fs.existsSync(avatarLocalPath)) {
//             try {
//                 fs.unlinkSync(avatarLocalPath);
//             } catch (unlinkError) {
//                 console.error("Failed to cleanup uploaded file after error:", unlinkError);
//             }
//         }
//         throw error; // Re-throw original error
//     }
// });

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    verifyEmail,
    resendOtp,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    getAllUsers,
    getUserById,
    deactivateUser,
    // updateUserAvatar,
    getCurrentUser
};

