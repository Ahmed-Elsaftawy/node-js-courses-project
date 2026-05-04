import { AppErrorHandler } from "../utils/appError.js";
import * as httpStatusText from "../utils/httpStatusText.js";

const verifyUserRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            const error = AppErrorHandler.create("This role is not authorized", 403, httpStatusText.FAIL);
            return next(error);
        }
        next();
    }
}

export { verifyUserRole };