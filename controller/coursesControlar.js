import { validationResult } from "express-validator";
import { log } from "node:console";
import { course } from "../models/course.modle.js"
import *as httpStatusText from "../utils/httpStatusText.js"
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { AppErrorHandler } from "../utils/appError.js";
const getAllCourses = asyncWrapper(
    async (req, res) => {
        const query = req.query
        const limit = req.limit || 10;
        const page = req.page || 1;
        const skip = (page - 1) * limit
        const courses = await course.find({}, { "__v": false }).limit(limit).skip(skip)
        res.json({ status: httpStatusText.SUCCESS, data: { courses } });
    }
)

const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
        const courese = await course.findById(req.params.courseId);
        if (!courese) {
            const error = AppErrorHandler.create('course not found', 404, httpStatusText.FAIL);
            return next(error);
            res.status(404)
            return res.json({ status: httpStatusText.FAIL, data: { course: 'course not found' } });
        }
        res.json({ status: httpStatusText.SUCCESS, data: { courese } });


        res.status(400).json({ status: httpStatusText.ERROR, data: null, message: 'invalid course id' })


    }
)

const creatCourse = asyncWrapper(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const error = AppErrorHandler.create('The Data is Invalid', 404, httpStatusText.FAIL);
        return next(error);
    }

    const newCourse = new course(req.body)
    await newCourse.save()
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { newCourse } });
})

const updateCourse = asyncWrapper(async (req, res) => {

    const myCourse = await course.updateOne({ _id: req.params.courseId }, { $set: { ...req.body } })
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });


})

const deleteCourse = async (req, res) => {
    const response = await course.deleteOne({ _id: req.params.courseId })
    res.json({ status: httpStatusText.SUCCESS, data: null });
}

export { deleteCourse, creatCourse, getAllCourses, getSingleCourse, updateCourse }