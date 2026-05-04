import mongoose from "mongoose";
import validator from "validator"
import { userRoles } from "../utils/users-roles.js";

const userScehma = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'this is not a vild email']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    },
    avatar: {
        type: String,
        default: `profile.png`
    }
})

const userModle = mongoose.model("User", userScehma)

export { userModle }