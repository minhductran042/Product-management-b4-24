const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const ProductCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    createdBy: String,
    updatedBy: String, 
    deletedBy: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
} , {
    timestamps: true // Tu dong them truong createAt va updateAt
});

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema,"products-category");

module.exports = ProductCategory;