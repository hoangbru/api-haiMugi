import mongoose from 'mongoose'
import mongooseSlugPlugin from 'mongoose-slug-plugin'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongooseDelete from 'mongoose-delete'

const plugins = [mongooseSlugPlugin, mongooseDelete, mongoosePaginate]

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
        tmpl: '<%=name%>',
        deletedAt: true,
        overrideMethods: true,
    });
});

export default mongoose.model('Product', productSchema);