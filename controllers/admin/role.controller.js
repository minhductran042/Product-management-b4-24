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

// [POST] /admin/roles/createPost
module.exports.createPost = async (req,res) => {

    const record = new Role(req.body);
    await record.save();

    req.flash("success","Thêm mới thành công");
    res.redirect(`/${systemCongfig.prefixAdmin}/roles`);
    
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req,res) => {

    try {
        const id = req.params.id;

        const record = await Role.findOne({
            _id: id,
            deleted: false
        });
    

        res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record
        });
    }
    catch(error) { 
        res.redirect(`/${systemCongfig.prefixAdmin}/roles`);
    }
    
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req,res) => {

    try {
        const id = req.params.id;
        const data = req.body;
        
        await Role.updateOne({
            _id: id
        },data);

        req.flash("success","Cập nhật thành công");

        res.redirect('back');
    }
    catch(error) { 
        req.flash("success","Cập nhật thất bại");
        res.redirect(`/${systemCongfig.prefixAdmin}/roles`);
    }
    
}

// [GET] /admin/roles/permission
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
      deleted: false
    });

  
    res.render("admin/pages/roles/permissions", {
      pageTitle: "Phân quyền",
      records: records
    });
  };

// [PATCH] /admin/roles/permission
module.exports.permissionsPatch = async (req, res) => {

    const roles = req.body;

    // console.log(roles);
  
    for(const role of roles) {
        await Role.updateOne({
            _id: role.id,
            deleted:false
        },{
            permissions: role.permissions
        })
    }
  
    res.json({
      code: 200,
      message: "Cập nhật thành công!"
    });
};

// [GET] /admin/roles/detail/:id
module.exports.detail = async (req,res) => {

    try {
        const id = req.params.id;

        const role = await Role.findOne({
            _id: id,
            deleted: false
        });

        if(role) {
            res.render("admin/pages/roles/detail", {
                pageTitle: "Chi tiết nhóm quyền",
                role: role
            });
        }

        else {
            res.redirect(`/${systemConfig.prefixAdmin}/roles`);
        }
        
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}


// [GET] /admin/roles/trash

module.exports.trash = async (req,res) => {

    const find = {
        deleted: true
    }

    const records = await Role.find(find);

    res.render("admin/pages/roles/trash", {
        pageTitle: "Trang thùng rác",
        records: records
    });
}

// [PATCH] /admin/roles/delete/:id
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id;

   await Role.updateOne({
    _id: id
   }, {
    deleted: true
   });

   req.flash('success','Xóa sản phẩm thành công');
    res.json({
        code: 200
    });

}


module.exports.restoreItem = async (req,res) => {

    const id = req.params.id;

   await Role.updateOne({
    _id: id
   }, {
    deleted: false
   });

    res.json({
        code: 200
    });

}

// [DELETE] /admin/products/trash/delete/:id
module.exports.permanentlyDelete = async (req,res) => {

    const id = req.params.id;

   await Role.deleteOne({
    _id: id
   });

    res.json({
        code: 200
    });

}