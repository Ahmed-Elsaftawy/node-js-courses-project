import express from "express";
import * as useresControlor from "../controller/usersController.js"
import { verifyToken } from "../middleware/verefyToken.js";
import { verifyUserRole } from "../middleware/verifyRole.js";
import multer from "multer";
import { log } from "node:console";
import { AppErrorHandler } from "../utils/appError.js";
const deskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        log("FILE", file);
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const exptenstion = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${exptenstion}`;
        cb(null, fileName);
    }
})
const fileFilter = (req, file, cb) => {
    const imagetype = file.mimetype.split('/')[0];
    if (imagetype == "image") {
        return cb(null, true);
    } else {
        return cb(AppErrorHandler.create('file must be an image', 400, false), false);
    }

}
const uploads = multer({
    storage: deskStorage,
    fileFilter: fileFilter
});
const userRouter = express.Router();

//get all users
//regester
//login
userRouter.route('/')
    .get(verifyToken, useresControlor.getAllUsers)
userRouter.route('/regester')
    .post(uploads.single('avatar'), useresControlor.regester);
userRouter.route('/login')
    .post(useresControlor.login)

export { userRouter };