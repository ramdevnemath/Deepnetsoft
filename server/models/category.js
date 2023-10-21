import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String
    },
    parentId: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('Category', categorySchema)