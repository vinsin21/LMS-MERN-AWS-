import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
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
    videoUrl: {
        type: String,
        trim: true
    },
    duration: {
        type: Number,
        default: 0,
        min: 0
    },
    isFreePreview: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["video", "article", "quiz"],
        default: "video"
    },
    order: {// lecture no in module (eg: lecture 1, lecture 2)
        type: Number,
        default: 0
    },
}, { timestamps: true });

// Compound indexes for efficient queries
lectureSchema.index({ module: 1, order: 1 }); // Get lectures for a module sorted by order
lectureSchema.index({ course: 1, order: 1 }); // Get all lectures for a course

export const Lecture = mongoose.model("Lecture", lectureSchema);
