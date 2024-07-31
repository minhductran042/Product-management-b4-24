// [GET] /admin/product-category

module.exports.index = (req,res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
    });
}