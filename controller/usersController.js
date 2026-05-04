import { asyncWrapper } from "../middleware/asyncWrapper.js"
import { userModle } from "../models/userModle.js";
import *as httpStatusText from "../utils/httpStatusText.js"
import mongoose from "mongoose";
import { AppErrorHandler } from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { log } from "node:console";
import { createToken } from "../utils/generateJWL.js";
// get all users
const getAllUsers = asyncWrapper(async (req, res) => {
    log(req.header)


    const query = req.query;
    const limit = +query.limit;
    //get all useres 
    const users = await userModle.find({}, { "__v": false, "password": false }).limit(limit);
    res.json({ status: httpStatusText.SUCCESS, data: { users } })
});

const regester = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body;

    const securedPasswoerd = await bcrypt.hash(password, 10);

    const userData = new userModle({
        firstName,
        lastName,
        email,
        password: securedPasswoerd,
        role,
        avatar: req.file.filename
    });

    await userData.save();

    const token = await createToken({
        email: userData.email,
        _id: userData._id,
        role: userData.role,
    });

    userData.token = token;
    await userData.save();

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { user: userData } });
});


const login = asyncWrapper(async (req, res, next) => {
    const { email, password, role } = req.body;
    const emailExist = await userModle.findOne({ email: email });
    if (!email || !password) {
        const error = AppErrorHandler.create("email and password are required", 400, httpStatusText.FAIL)
        return next(error);
    }
    const user = await userModle.findOne({ email: email });
    if (!user) {
        const error = AppErrorHandler.create("user not found", 400, httpStatusText.FAIL)
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (user && matchedPassword) {
        //generate token
        const token = await createToken({ email: user.email, _id: user.id, role: user.role });
        return res.json({ status: httpStatusText.SUCCESS, data: { token } })
    } else {
        const error = AppErrorHandler.create('something went wrong', 404, httpStatusText.FAIL);
        next(error);
    }

});

export {
    getAllUsers,
    regester,
    login
}
