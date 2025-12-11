export const DB_NAME = "lms-backend";

// User Role Enumeration
export const userRoleEnum = {
    USER: "user",
    INSTRUCTOR: "instructor",
    ADMIN: "admin"
};

// Available user roles array for validation
export const availableUserRoles = Object.values(userRoleEnum);


export const S3ImagePrefix = {
    "AVATAR": "avatar",
    "WALLPAPER": "wallpaper",
    "COURSE_IMAGE": "course-image"
}

export const availableS3ImagePrefix = Object.values(S3ImagePrefix);
