const Product = require("../../models/product.model");

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
    const pagination = {
        currentPage: 1,
        limitedItem: 4,
    };
    if(req.query.page){
        pagination.currentPage = parseInt(req.query.page);
    }
    
    pagination.skip = (pagination.currentPage - 1) * pagination.limitedItem;
    
    const countProducts = await Product.countDocuments(find);
    const totalPage = Math.ceil(countProducts / pagination.limitedItem);
    
    pagination.totalPage = totalPage;
    
    //Het Phan Trang

    const products = await Product
        .find(find)
        .limit(pagination.limitedItem)
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