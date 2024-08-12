const Role = require("../../models/role.model");
var md5 = require('md5');
const Account = require("../../models/accounts.model");
const paginationHelper = require("../../helpers/pagination.helper");

const generateHelper = require("../../helpers/generate.hepler");

const moment = require('moment');
const systemConfig = require("../../config/system");


// [GET] /admin/account/index
module.exports.index = async (req,res) => {


    const find = {
        deleted: false,
    }
    // find.status = "active";

    const filterStatus = [
        {
            label: "Tất cả",
            value: ""
        }, 
        {
            label: "Hoạt động",
            value: "active"
        },
        {
            label: "Dừng hoạt động",
            value: "inactive"
        }
    ];

    //
    if(req.query.status){ 
        find.status = req.query.status;
    }

    //Tim kiem
    let keyword = "";
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i");
        find.fullName = regex;
        keyword = req.query.keyword;
    }
    //Het tim kiem 


    //Phan trang
    const pagination = await paginationHelper.paginationAccount(req, find);
    
    //Het Phan Trang

    const records = await Account.find(find);

    // console.log(records);

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.roleTitle = role.title;
    }

    for (const item of records) {
        //Tao boi 
        if(item.createdBy) {
            const accountCreated = await Account.findOne({
                _id: item.createdBy
            })
            item.createdByFullName = accountCreated.fullName;
        } else {
            item.createdByFullName = "";
        }
        item.createdAtFormat = moment(item.createdAt).format("DD/MM/YY HH:mm:ss");

        //Cập nhật
        if(item.updatedBy) {
            const accountUpdated = await Account.findOne({
                _id: item.updatedBy
            })
            item.updatedByFullName = accountUpdated.fullName;
        } else{
            item.updatedByFullName = "";
        }
        item.updatedAtFormat = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Trang tài khoản",
        records: records,
        filterStatus: filterStatus,
        pagination: pagination,
        keyword: keyword,
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

    if(res.locals.role.permissions.includes("accounts_create")) {
        req.body.password = md5(req.body.password);

        req.body.token = generateHelper.generateRandomString(30);

        req.body.createdBy = res.locals.account.id;

        const account = new Account(req.body);
        await account.save();

        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    } else {
        res.send(`403`);
    }
    

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

    if(res.locals.role.permissions.includes("accounts_edit")) {
        const id = req.params.id;

        if(req.body.password == "") {
            delete req.body.password; // gui len mkhau rong thi coi nhu ko doi mk
        } else {
            req.body.password = md5(req.body.password);
        }

        req.body.updatedBy = res.locals.account.id;

        await Account.updateOne({
            _id: id,
            deleted: false
        },req.body);

        req.flash("success","Cập nhật thành công")
        res.redirect('back');
    } else {
        res.send(`403`);
    }
    // console.log(req.body);
    
    

}

// [PATCH] /change-status/:statusChange/:id
module.exports.changeStatus = async (req,res) => {

    if(res.locals.role.permissions.includes("accounts_edit")) {
        const { id, statusChange } = req.params;
        await  Account.updateOne( 
        {
            _id: id
        }, {
            status: statusChange
        });
    
        req.flash('success','Cập nhật trạng thái thành công');
    
        res.json({
            code: 200 // backend trả về code 200 
        });
    } else {
        res.send(`403`);
    }
    
   
} 

// [GET] /admin/accounts/detail/:id 
module.exports.detail = async (req,res) => {

    try {
        const id = req.params.id;

        const account = await Account.findOne({
            _id: id,
            deleted: false
        });

        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })

        if(account) {
            res.render("admin/pages/accounts/detail", {
                pageTitle: "Chi tiết tài khoản",
                account: account,
                role: role
            });
        }

        else {
            res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
        }
        
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
}



// [GET] /admin/accounts/trash
module.exports.trash = async (req,res) => {
    
    const find = {
        deleted: true,
    }
    // find.status = "active";

    const filterStatus = [
        {
            label: "Tất cả",
            value: ""
        }, 
        {
            label: "Hoạt động",
            value: "active"
        },
        {
            label: "Dừng hoạt động",
            value: "inactive"
        }
    ];

    //
    if(req.query.status){ 
        find.status = req.query.status;
    }

    //Tim kiem
    let keyword = "";
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i");
        find.fullName = regex;
        keyword = req.query.keyword;
    }
    //Het tim kiem 


    //Phan trang
    const pagination = await paginationHelper.paginationAccount(req, find); 
    
    //Het Phan Trang

    const records = await Account.find(find);

    // console.log(records);

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.roleTitle = role.title;
    }

    for (const item of records) {
        //Nguoi tao
        if(item.deletedBy) {
            const accountDeleted = await Account.findOne({
                _id: item.deletedBy
            });
            item.deletedByFullName = accountDeleted.fullName;
        } else {
            item.deletedByFullName = "";
        }

        item.deletedAtFormat = moment(item.deletedAt).format("DD/MM/YY HH:mm:ss");
    }
    
    res.render("admin/pages/accounts/trash", {
        pageTitle: "Trang thùng rác",
        records: records,
        keyword: keyword,
        filterStatus : filterStatus,
        pagination: pagination
    });
}


// [PATCH] /admin/accounts/delete/:id

module.exports.deleteItem = async (req,res) => {

    if(res.locals.role.permissions.includes("accounts_delete")){
        const id = req.params.id;

        await Account.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedBy: res.locals.account.id
        });

        req.flash('success','Xóa sản phẩm thành công');
        res.json({
            code: 200
        });
    } else {
        res.send(`403`);
    }

}


// [PATCH] /admin//trash/restore/:id
module.exports.restoreItem = async (req,res) => {

    const id = req.params.id;

   await Account.updateOne({
    _id: id
   }, {
    deleted: false
   });

    res.json({
        code: 200
    });

}

// [DELETE] /admin/accounts/trash/delete/:id
module.exports.permanentlyDelete = async (req,res) => {

    const id = req.params.id;

   await Account.deleteOne({
    _id: id
   });

    res.json({
        code: 200
    });

}