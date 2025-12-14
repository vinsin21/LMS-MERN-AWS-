import { Router } from "express";
import {
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
    getCurrentUser,
    getPresignedUrlForAvatar,
    updateS3KeyInUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkActive, verifyRole } from "../middlewares/auth.middleware.js";
import { authLimiter, passwordResetLimiter } from "../middlewares/rateLimiter.js";
import {
    userRegisterSchema,
    userLoginSchema,
    verifyEmailSchema,
    resendOtpSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    getUserByIdSchema,
    deactivateUserSchema
} from "../validators/user.validator.js";

const router = Router();


// ===== PUBLIC ROUTES =====
router.route("/register").post(
    authLimiter,
    validate(userRegisterSchema),
    registerUser
);

router.route("/login").post(authLimiter, validate(userLoginSchema), loginUser);

router.route("/verify-email").post(authLimiter, validate(verifyEmailSchema), verifyEmail);
router.route("/resend-otp").post(authLimiter, validate(resendOtpSchema), resendOtp);
router.route("/refresh-token").post(refreshAccessToken);

// Password Reset Routes
router.route("/forgot-password").post(passwordResetLimiter, validate(forgotPasswordSchema), forgotPassword);
router.route("/reset-password").post(passwordResetLimiter, validate(resetPasswordSchema), resetPassword);

// ===== AUTHENTICATED ROUTES =====
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
// router.route("/avatar").patch(
//     verifyJWT,
//     checkActive,
//     upload.single("avatar"),
//     updateUserAvatar
// );
router.route("/presign-avatar").post(verifyJWT, checkActive, getPresignedUrlForAvatar)
router.route("/update-avatar-key").post(verifyJWT, checkActive, updateS3KeyInUserAvatar)

// ===== ADMIN ROUTES =====
router.route("/admin/users").get(
    verifyJWT,
    checkActive,
    verifyRole(['admin']),
    getAllUsers
);

router.route("/admin/users/:userId").get(
    verifyJWT,
    checkActive,
    verifyRole(['admin']),
    validate(getUserByIdSchema, 'params'),
    getUserById
);

router.route("/admin/users/:userId/status").patch(
    verifyJWT,
    checkActive,
    verifyRole(['admin']),
    validate(getUserByIdSchema, 'params'),
    validate(deactivateUserSchema, 'body'),
    deactivateUser
);

export default router;
