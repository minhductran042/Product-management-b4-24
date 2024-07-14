const Product = require("../../models/product.model");
const paginationHelper = require("../../helpers/pagination.helper");

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
    const pagination = await paginationHelper(req, find); 
    
    //Het Phan Trang

    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);

    console.log(products);

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
    const { id, statusChange } = req.params;
    await  Product.updateOne( {
        _id: id
    },{status: statusChange});

    res.json({
        code: 200 // backend trả về code 200 
    });
   
}