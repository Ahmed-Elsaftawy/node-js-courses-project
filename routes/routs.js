import { creatCourse, getAllCourses, updateCourse, deleteCourse, getSingleCourse } from "../controller/coursesControlar.js"
import express from "express"
import { body, ExpressValidator } from "express-validator";
import { verifyToken } from "../middleware/verefyToken.js";
import { verifyUserRole } from "../middleware/verifyRole.js";
import { userRoles } from "../utils/users-roles.js";

const router = express();

router.route('/')
    .get(verifyToken, verifyUserRole(userRoles.MANAGER, userRoles.ADMIN), getAllCourses)
    .post(
        [
            body('title').notEmpty().withMessage("titel is required"),
            body('price').notEmpty().withMessage("price is required")
        ]


        , creatCourse);

router.route('/:courseId')
    .get(verifyToken, getSingleCourse)
    .patch(verifyToken, updateCourse)
    .delete(verifyToken, verifyUserRole(userRoles.ADMIN, userRoles.MANAGER), deleteCourse);

export { router }