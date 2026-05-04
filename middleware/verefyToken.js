import jwt from "jsonwebtoken";
import * as httpStatusText from "../utils/httpStatusText.js";
import { AppErrorHandler } from "../utils/appError.js";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeader) {
        const error = AppErrorHandler.create("token is required", 401, httpStatusText.ERROR);
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_PASSWORD);
        // أهم سطر: نضع بيانات المستخدم في الطلب ليراها الـ verifyUserRole
        req.currentUser = currentUser;
        next();
    } catch (err) {
        const error = AppErrorHandler.create("token is invalid", 401, httpStatusText.FAIL);
        return next(error);
    }
}
export { verifyToken };