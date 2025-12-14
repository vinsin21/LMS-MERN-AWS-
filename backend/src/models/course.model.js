import mongoose from 'mongoose'
import { generateUniqueSlug, slugify } from '../utils/modelsUtils.js'

const timelineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    weekRange: { type: String, required: true },
    description: { type: String, required: true },

})

// Course FAQ
const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
})

// Main Course Schema 

const courseSchema = new mongoose.Schema({
    // Course Card Basic detaul
    title: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, unique: true },
    description: { type: String, required: true },
    thumbnail: { type: String, },
    price: { type: Number, required: true },// discounted price that we show
    originalPrice: { type: Number, required: true }, // actual higher price
    tag: { type: String, },
    duration: { type: Number, },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    joined: { type: Number, default: 0 },
    introduction: { type: String, trim: true, maxlength: 700 },


    // Course detail page (embedded sub-schemas)
    timeline: [timelineSchema], // your growth timeline
    learning: [{ title: String, description: String }], // what you will learn
    prerequisites: [{ type: String }],
    faq: [faqSchema],

    // References
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    testimonial: { type: mongoose.Schema.Types.ObjectId, ref: "Testimonial" },

    // Computed fields for curriculum (updated when modules/lectures change)
    moduleCount: { type: Number, default: 0 },
    lectureCount: { type: Number, default: 0 },
    totalDuration: { type: Number, default: 0 }, // total duration in seconds

    status: { type: String, enum: ["draft", "published", "deleted", "archived"], default: "draft" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
}, { timestamps: true })


courseSchema.pre("save", async function (next) {

    try {
        if (this.isNew || this.isModified("title")) {
            const base = slugify(this.title || "")

            if (!base) {
                this.slug = undefined
            } else {
                const unique = await generateUniqueSlug(this.constructor, base, this._id)
                this.slug = unique
            }
        }
        return next()
    } catch (error) {
        return next(error)
    }

})

courseSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const update = this.getUpdate() || {};

        // Title might be in update.title or update.$set.title
        const newTitle = update.title ?? (update.$set && update.$set.title);

        if (newTitle) {
            const base = slugify(newTitle || "");
            if (!base) {
                // Ensure we don't accidentally set a blank slug
                if (update.slug || (update.$set && update.$set.slug)) {
                    // remove slug if present in update
                    if (update.$set) delete update.$set.slug;
                    else delete update.slug;
                    this.setUpdate(update);
                }
            } else {
                // We need the document id to exclude the current doc from uniqueness check.
                // When using findOneAndUpdate, you might have _id in the query: this.getQuery()
                const query = this.getQuery() || {};
                const docId = query._id ?? null;

                const unique = await generateUniqueSlug(this.model, base, docId);
                // Put slug into $set so it updates
                if (!update.$set) update.$set = {};
                update.$set.slug = unique;
                this.setUpdate(update);
            }
        }

        return next();
    } catch (err) {
        return next(err);
    }
});



courseSchema.index({ slug: 1 }, { unique: true, sparse: true });

export const Course = mongoose.model("Course", courseSchema);