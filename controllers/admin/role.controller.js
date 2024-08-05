const Role = require("../../models/role.model");
const systemCongfig = require("../../config/system");

// [GET] /admin/roles/index
module.exports.index = async (req,res) => {

    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

//[GET] /admin/roles/createPost
module.exports.create = async (req,res) => {

    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền",
        
    });
}

// [Post] /admin/roles/createPost
module.exports.createPost = async (req,res) => {

    const record = new Role(req.body);
    await record.save();

    req.flash("success","Thêm mới thành công");
    res.redirect(`/${systemCongfig.prefixAdmin}/roles`);
    
}