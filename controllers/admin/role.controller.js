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
