import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    order: { // module no in course (eg: module 1, module 2)
        type: Number,
        default: 0
    },
}, { timestamps: true });

// Compound index for efficient queries: get all modules for a course sorted by order
moduleSchema.index({ course: 1, order: 1 });

export const Module = mongoose.model("Module", moduleSchema);
