// [GET] /admin/product-category
const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination.helper");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.index = async (req,res) => {

    const find = {
        deleted: false
    };

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

    if(req.query.status){ 
        find.status = req.query.status;
    }

    let keyword = "";
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i");
        find.title = regex;
        keyword = req.query.keyword;
    }

    const pagination = await paginationHelper.paginationCategory(req, find);


    const records = await ProductCategory
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip)
        .sort({
            position: "asc"
        });

    res.render("admin/pages/products-category/index", {
        pageTitle: "Trang danh mục sản phẩm",
        filterStatus: filterStatus,
        records: records,
        pagination: pagination,
    });
}

// [GET] /admin/product-category/create
module.exports.create = async (req,res) => {

    const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    // console.log(newCategories);
    

    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        categories: newCategories
    });
    
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req,res) => {

    if(res.locals.permissions.includes("products-category_create")) {
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
          } else {
            const countCategory = await ProductCategory.countDocuments({});
            req.body.position = countCategory + 1;
          }
          
          const newCategory = new ProductCategory(req.body);
          await newCategory.save();
          
          res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    } else {
        res.send(`403`);
    }

}


// [PATH] /admin/products-category/changeStatus/:statusChange/:id

module.exports.changeStatus = async (req,res) => {
    if(res.locals.role.permissions.includes("products-category_edit")) {
        const { id, statusChange } = req.params;
        await  ProductCategory.updateOne( 
        {
            _id: id
        }, {
            status: statusChange
        });
    
        req.flash('success','Cập nhật trạng thái thành công');
    
        res.json({
            code: 200 // backend trả về code 200 
        });
    }
    else {
        res.send(`403`);
    }
   
}




// [PATCH] /admin/products-category/delete/:id

module.exports.deleteItem = async (req,res) => {

    if(res.locals.role.permissions.includes("products-category_delete")) {
        const id = req.params.id;

        await ProductCategory.updateOne({
         _id: id
        }, {
         deleted: true
        });
     
        req.flash('success','Xóa sản phẩm thành công');
         res.json({
             code: 200
         });
    }
    else {
        res.send(`403`);
    }

}

// [GET] /admin/products-category/detail/:id

module.exports.detail = async (req,res) => {

    try {
        const id = req.params.id;

        const productCategory = await ProductCategory.findOne({
            _id: id,
            deleted: false
        });

        if(productCategory) {
            res.render("admin/pages/products-category/detail", {
                pageTitle: "Chi tiết danh mục",
                productCategory: productCategory
            });
        }

        else {
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
        
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}


// [PATCH] /changePosition/:id

module.exports.changePosition = async (req,res) => {

    if(res.locals.role.permissions.includes("products-category_edit")) {
        const id = req.params.id;

        // await Product.deleteOne({
        //  _id: id
        // });

        const position = req.body.position;

        // console.log(id);
        // console.log(position);

        await ProductCategory.updateOne({
            _id: id
        }, {
            position: position
        })
    
        res.json({
            code: 200
        });
    }
    else { 
        res.send(`403`);
    }
    
 
};


// [GET] admin/products-category/edit/:id

module.exports.edit = async (req,res) => {

    try {
        const id = req.params.id; 

        const category = await ProductCategory.findOne({
            _id : id,
            deleted: false
        })

        const categories = await ProductCategory.find({
            deleted: false
        });
    
        const newCategories = createTreeHelper(categories);
        
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            categories: newCategories,
            category: category
        });
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }

}


// [PATCH] /admin/products-category/edit/:id

module.exports.editPatch = async (req,res) => {

    if(res.locals.role.permissions.includes("products-category_edit")) {
        try{
            const id = req.params.id;
    
            if(req.body.position) {
                req.body.position = parseInt(req.body.position);
            } else {
                const countCagegory = await ProductCategory.countDocuments({});
                req.body.position = countCagegory + 1;
            }
    
            await ProductCategory.updateOne({
                _id: id,
                deleted: false
            }, req.body);
    
            req.flash("success", "Cập nhật danh mục thành công!");
    
            res.redirect(`back`);
        }
    
        catch(error) { 
            res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
        }
    } else {
        res.send(`403`);
    }

    

    
}


//[GET] /admin/products-category/trash
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


    if(req.query.status){ 
        find.status = req.query.status;
    }

    let keyword = "";
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword,"i");
        find.title = regex;
        keyword = req.query.keyword;
    }

    const pagination = await paginationHelper.paginationCategory(req, find);


    const records = await ProductCategory
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip)
        .sort({
            position: "asc"
        });

    res.render("admin/pages/products-category/trash", {
        pageTitle: "Trang thùng rác",
        filterStatus: filterStatus,
        records: records,
        pagination: pagination,
    });
}


// [PATCH] /admin/products-category/trash/restore/:id
module.exports.restoreItem = async (req,res) => {

    const id = req.params.id;

   await ProductCategory.updateOne({
    _id: id
   }, {
    deleted: false
   });

    res.json({
        code: 200
    });

}

// [DELETE] /admin/products-category/trash/delete/:id
module.exports.permanentlyDelete = async (req,res) => {

    const id = req.params.id;

   await ProductCategory.deleteOne({
    _id: id
   });

    res.json({
        code: 200
    });

}