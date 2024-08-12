const Product = require("../../models/product.model");
const Account = require("../../models/accounts.model");
const ProductCategory = require("../../models/product-category.model");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");
const moment = require('moment');


// [GET] /admin/products/
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
        find.title = regex;
        keyword = req.query.keyword;
    }
    //Het tim kiem 


    //Phan trang
    const pagination = await paginationHelper.paginationProduct(req, find);
    
    //Het Phan Trang

    const sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip)
        .sort(sort);

    for (const item of products) {
        //Nguoi tao
        if(item.createdBy) {
            const accountCreated = await Account.findOne({
            _id: item.createdBy
            });
            item.createdByFullName = accountCreated.fullName;
        } else {
            item.createdByFullName = "";
        }

        item.createdAtFormat = moment(item.createdAt).format("DD/MM/YY HH:mm:ss");


        //Nguoi cap nhat

        if(item.updatedBy) {
            const accountUpdated = await Account.findOne({
                _id: item.updatedBy
            });
            item.updatedByFullName = accountUpdated.fullName;

        } else {
            item.UpdatedByFullName = "";
        }

        item.updatedAtFormat = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");

    }

    // console.log(products);

    res.render("admin/pages/products/index", {
        pageTitle: "Quản lí sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus : filterStatus,
        pagination: pagination
    });
}

// [PATCH] /admin/products/change-status/:statusChange/:id

module.exports.changeStatus = async (req,res) => {
    if(res.locals.role.permissions.includes("products_edit")){
        const { id, statusChange } = req.params;
        await  Product.updateOne( 
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


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {

    if(res.locals.role.permissions.includes("products_edit")) {
        const {status , ids} = req.body;

    switch(status) {
        case "active":
        case "inactive":
            await  Product.updateMany( {
                _id: ids
            }, {
                status: status
            });
            break;
        case "delete":
            await  Product.updateMany( {
                _id: ids
            }, {
                deleted: true
            });
            break;
        default:
            break;
    }

    res.json({
        code: 200 // backend trả về code 200 
    });
   
    } else {
        res.send(`403`);
    }

    
}

// [PATCH] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {

    if(res.locals.role.permissions.includes("products_delete")){
        const id = req.params.id;

        await Product.updateOne({
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


// [GET] /admin/products/trash
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
        find.title = regex;
        keyword = req.query.keyword;
    }
    //Het tim kiem 


    //Phan trang
    const pagination = await paginationHelper.paginationProduct(req, find); 
    
    //Het Phan Trang

    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);

        for (const item of products) {
            //Nguoi tao
            if(item.deletedBy) {
                const accountDeleted = await Account.findOne({
                    _id: item.deletedBy
                });
                item.deletedByFullName = accountDeleted.fullName;
            } else {
                item.deletedByFullName = "";
            }
    
            item.deletedAtFormat = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
        }
    

    res.render("admin/pages/products/trash", {
        pageTitle: "Trang thùng rác",
        products: products,
        keyword: keyword,
        filterStatus : filterStatus,
        pagination: pagination
    });
}

// [PATCH] /admin/products/trash/restore/:id
module.exports.restoreItem = async (req,res) => {

    const id = req.params.id;

   await Product.updateOne({
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

   await Product.deleteOne({
    _id: id
   });

    res.json({
        code: 200
    });

}

// [PATCH] /products/changePosition/:id
module.exports.changePosition = async (req,res) => {

    const id = req.params.id;

    // await Product.deleteOne({
    //  _id: id
    // });

    const position = req.body.position;

    // console.log(id);
    // console.log(position);

    await Product.updateOne({
        _id: id
    }, {
        position: position
    })
 
     res.json({
         code: 200
     });
 
};


// [GET] /products/create

module.exports.create = async (req,res) => {


    const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);

    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        categories: newCategories
    });
    
}

//[POST] /admin/products/create

module.exports.createPost = async (req, res) => {

    if(res.locals.role.permissions.includes("products_create")) {
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock = parseInt(req.body.stock);
        if(req.body.position) {
            req.body.position = parseInt(req.body.position);
        } else {
            const countProducts = await Product.countDocuments({});
            req.body.position = countProducts + 1;
        }

        req.body.createdBy = res.locals.account.id;

        const newProduct = new Product(req.body);
        await newProduct.save();
        
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    } else {
        res.send(`403`);
    }
    
  }

//[GET] /admin/products/edit/:id
module.exports.edit = async (req,res) => {

    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id,
            deleted: false
        });

        

        if(product) {

            const categories = await ProductCategory.find({
                deleted: false
            });
        
            const newCategories = createTreeHelper(categories);

            res.render("admin/pages/products/edit", {
                pageTitle: "Chỉnh sửa sản phẩm",
                product: product,
                categories: newCategories
            });
        }
        else {
            res.redirect(`/${systemConfig.prefixAdmin}/products`);
        }
        
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}

//[PATCH] /admin/products/edit/:id

module.exports.editPatch = async (req,res) => {

    if(res.locals.role.permissions.includes("products_edit")) {
        try {
            const id = req.params.id;
        
            req.body.price = parseInt(req.body.price);
            req.body.discountPercentage = parseInt(req.body.discountPercentage);
            req.body.stock = parseInt(req.body.stock);
            req.body.position = parseInt(req.body.position);
        
        
            if(req.body.position){
                req.body.position = parseInt(req.body.position);
            }
            else {
                const countProduct  = await Product.countDocuments(); 
                req.body.position = countProduct + 1;    
            }

            req.body.updatedBy = res.locals.account.id;
        
            await Product.updateOne({
                _id:id,
                deleted: false 
            } , req.body);
        
            req.flash("success","Cập nhật sản phẩm thành công!");
        }
        
        catch(error) {
            res.flash("error","Id sản phẩm không hợp lệ");
        }
    
        res.redirect('back');
    }
    else {
        res.send(`403`);
    }
    
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req,res) => {

    try {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id,
            deleted: false
        });

        if(product) {
            res.render("admin/pages/products/detail", {
                pageTitle: "Chi tiết sản phẩm",
                product: product
            });
        }

        else {
            res.redirect(`/${systemConfig.prefixAdmin}/products`);
        }
        
    }
    catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
}