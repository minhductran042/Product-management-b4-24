const Role = require("../../models/role.model");
var md5 = require('md5');
const Account = require("../../models/accounts.model");

const generateHelper = require("../../helpers/generate.hepler");

const systemConfig = require("../../config/system");

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

module.exports.createPost = async (req,res) => {

    req.body.password = md5(req.body.password);

    req.body.token = generateHelper.generateRandomString(30);


    const account = new Account(req.body);
    await account.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);

}