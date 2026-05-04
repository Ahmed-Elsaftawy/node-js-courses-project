import *as httpStatusText from "../utils/httpStatusText.js"

function asyncWrapper(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            next(error);
        })
    }
}


export { asyncWrapper }