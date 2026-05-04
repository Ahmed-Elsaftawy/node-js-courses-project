import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
}
)

const course = mongoose.model('Course', schema);
export { course };