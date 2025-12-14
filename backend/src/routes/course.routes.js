import { Router } from 'express'
import { checkActive, verifyJWT, verifyRole } from '../middlewares/auth.middleware.js';
import { createCourse } from '../controllers/course.controller.js';
import { createCourseSchema } from '../validators/course.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

// admin only routes
router.route("/create").post(verifyJWT,
    checkActive,
    verifyRole(['admin']), // isSuperAdmin is checked separately in controllers if needed
    validate(createCourseSchema),
    createCourse
)



export default router;