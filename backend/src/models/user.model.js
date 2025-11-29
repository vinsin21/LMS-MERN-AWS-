import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import crypto from "crypto";
import { userRoleEnum, availableUserRoles } from "../constants.js";

const refreshTokenSchema = new Schema({
    tokenHash: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { _id: false });

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // local path or cloud url
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long']
        },
        refreshTokens: [refreshTokenSchema],
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        },
        resetAttempts: {
            type: Number,
            default: 0
        },
        accountLockedUntil: {
            type: Date
        },

        // ===== RBAC Fields =====
        role: {
            type: String,
            enum: availableUserRoles,
            default: userRoleEnum.USER
        },
        isSuperAdmin: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },

        // ===== Soft Delete =====
        deletedAt: {
            type: Date
        },
        deletedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(mongooseAggregatePaginate);

// Automatically exclude soft-deleted users from all queries
userSchema.pre(/^find/, function (next) {
    // Only apply filter if deletedAt is not explicitly being queried
    if (!this.getQuery().deletedAt) {
        this.where({ deletedAt: null });
    }
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        // Append pepper to password before hashing
        const pepper = process.env.PEPPER || "";
        this.password = await argon2.hash(this.password + pepper);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    const pepper = process.env.PEPPER || "";
    return await argon2.verify(this.password, password + pepper);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            role: this.role,
            isActive: this.isActive
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateEmailVerificationToken = function () {
    // Simple random token for now
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    this.emailVerificationToken = token;
    this.emailVerificationExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    return token;
};

userSchema.methods.generateForgotPasswordToken = function () {
    const token = crypto.randomUUID(); // Generate UUID v4 (128-bit secure token)
    // Do NOT set this.forgotPasswordToken here - controller will hash and store it
    this.forgotPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
    return token;
};

export const User = mongoose.model("User", userSchema);
