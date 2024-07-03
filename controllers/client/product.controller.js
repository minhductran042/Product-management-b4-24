// [GET] /product/
module.exports.index = (req,res) => {
    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm"
    });
}

//[POST] /products/create
// module.exports.create = (req, res) => {
//     res.render("client/pages/products/create");
// }

// [PATH] /product/edit
// module.exports.edit = (req, res) => {
//     res.render("client/pages/products/edit");
// }

// [GET] /product/detail
// module.exports.detail = (req, res) => {
//     res.render("client/pages/products/detail");
// }