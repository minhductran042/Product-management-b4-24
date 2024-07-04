module.exports.index = (req,res) => {
    res.render("admin/pages/products/index", {
        pageTitle: "Quản lí sản phẩm"
    });
}