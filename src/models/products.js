import mongoose from 'mongoose'
import mongooseSlug from 'mongoose-slug-generator'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongooseDelete from 'mongoose-delete'

const plugins = [mongooseSlug, mongooseDelete, mongoosePaginate]

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: Number,
    desc: String,
    detail: String,
    status: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    slug: { 
        type: String, 
        slug: "name",
        unique: true 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
},{timestamps: true, versionKey: false})

plugins.forEach((plugin) => {
    productSchema.plugin(plugin, {
        deletedAt: true,
        overrideMethods: 'all',
    });
});

export default mongoose.model('Product', productSchema);