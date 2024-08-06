const Role = require("../../models/role.model");

// [GET] /admin/acoount/index
module.exports.index = (req,res) => {
    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang tài khoản"
    });
}

// [GET] /admin/acoount/create
module.exports.create = async (req,res) => {

    const roles = await Role.find({
        deleted: false
    }).select("title"); //select trg nao thi tra ra truong do

    res.render("admin/pages/accounts/create", {
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    });
}