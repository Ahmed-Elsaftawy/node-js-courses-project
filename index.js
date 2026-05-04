import { config } from "dotenv";
import cors from "cors"
import { error, log } from "node:console";
import mongoose from "mongoose";
import express from "express"
import { router } from "./routes/routs.js";
import *as httpStatusText from "./utils/httpStatusText.js"
import { userRouter } from './routes/users.rout.js'
import path from "node:path";
config()
const app = express();
const url = process.env.MONGO_URL;

app.use('/uploads', express.static(path.join(import.meta.dirname, 'uploads')));
mongoose.connect(url).then((result) => {
    log("mongooDB connected successfully")
})



app.use(cors());
app.use(express.json());
app.use('/api/courses', router);
app.use('/api/users', userRouter)


app.all('{/*path}', (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, msg: "NOT FOUND" });

})
// error handler middlewares
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statuseMessage || httpStatusText.ERROR, message: error.message })
});
app.listen(process.env.PORT, () => {
    log("lesten form 4000");
})


