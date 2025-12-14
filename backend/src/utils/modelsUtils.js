
export function slugify(str) {
    if (!str) return "";
    return str
        .toString()
        .toLowerCase()
        .normalize("NFKD")                 // normalize accents
        .replace(/[\u0300-\u036f]/g, "")   // remove diacritics
        .replace(/[^a-z0-9\s-]/g, "")      // remove invalid chars
        .trim()
        .replace(/\s+/g, "-")              // replace spaces with -
        .replace(/-+/g, "-");              // collapse multiple -
}

export async function generateUniqueSlug(Model, base, excludeId = null) {
    let slug = base;
    let counter = 0;

    // Use a loop to find first available slug
    while (true) {
        const query = { slug };
        if (excludeId) query._id = { $ne: excludeId };

        const existing = await Model.findOne(query).lean().select("_id").exec();
        if (!existing) return slug;

        counter += 1;
        slug = `${base}-${counter}`;
    }
}


