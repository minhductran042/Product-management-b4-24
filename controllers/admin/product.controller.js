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
        .skip(pagination.skip)
        .sort({
        position: "desc"
        });
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
   
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {

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
   
}
// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id;

   await Product.updateOne({
    _id: id
   }, {
    deleted: true
   });

    res.json({
        code: 200
    });

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
    const pagination = await paginationHelper(req, find); 
    
    //Het Phan Trang

    const products = await Product
        .find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip);

    console.log(products);

    res.render("admin/pages/products/trash", {
        pageTitle: "Quản lí sản phẩm",
        products: products,
        keyword: keyword,
        filterStatus : filterStatus,
        pagination: pagination
    });
}

// [PATCH] /admin/products/restore/:id
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

// [DELETE] /admin/products/delete/:id
module.exports.permanentlyDelete = async (req,res) => {

    const id = req.params.id;

   await Product.deleteOne({
    _id: id
   });

    res.json({
        code: 200
    });

}


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