import mongoose, { Schema } from "mongoose";


const enrollmentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true,
    },
    enrollmentType: {
        type: String,
        enum: ["free", "paid"],
        default: "paid",
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        required: true,
    },
    paymentId: { type: String },
    orderId: { type: String },
    currency: { type: String, default: "INR" },
    amountPaid: { type: Number },
    paymentMethod: { type: String }, // card, upi
    paymentDate: { type: Date },

    accessGrantedAt: { type: Date },
    isActive: { type: Boolean, default: true },

    couponCode: { type: String },
    discountAmount: { type: Number },


}, { timestamps: true })

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true })

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);