// [GET] /admin/product-category
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");


module.exports.index = async (req,res) => {

    const records = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        records: records 
    });
}

// [GET] /admin/product-category
module.exports.create = async (req,res) => {

    const categories = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        categories: categories
    });
    
}

module.exports.createPost = async (req,res) => {

    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countCategory = await ProductCategory.countDocuments({});
      req.body.position = countCategory + 1;
    }
    
    const newCategory = new ProductCategory(req.body);
    await newCategory.save();
    
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}