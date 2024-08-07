const Role = require("../../models/role.model");
var md5 = require('md5');
const Account = require("../../models/accounts.model");

const generateHelper = require("../../helpers/generate.hepler");

const systemConfig = require("../../config/system");

// [GET] /admin/account/index
module.exports.index = async (req,res) => {

    const records = await Account.find({
        deleted: false
    });

    // console.log(records);

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.roleTitle = role.title;
        
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang tài khoản",
        records: records
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

// [POST] /admin/account/create
module.exports.createPost = async (req,res) => {

    req.body.password = md5(req.body.password);

    req.body.token = generateHelper.generateRandomString(30);


    const account = new Account(req.body);
    await account.save();

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);

}


// [GET] /admin/account/edit/:id
module.exports.edit = async (req,res) => {



    const roles = await Role.find({
        deleted: false
    }).select("title"); //select trg nao thi tra ra truong do

    const id = req.params.id;

    const account = await Account.findOne({
        _id: id,
        deleted: false
    })


    res.render("admin/pages/accounts/edit", {
        pageTitle: "Trang chỉnh sửa tài khoản",
        roles: roles,
        account: account
    });
}

// [PATCH] /admin/account/edit/:id

module.exports.editPatch = async (req,res) => {

    console.log(req.body);
    
    const id = req.params.id;

    if(req.body.password == "") {
        delete req.body.password; // gui len mkhau rong thi coi nhu ko doi mk
    } else {
        req.body.password = md5(req.body.password);
    }

    await Account.updateOne({
        _id: id,
        deleted: false
    },req.body);

    req.flash("success","Cập nhật thành công")
    res.redirect('back');

}