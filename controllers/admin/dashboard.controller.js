const Product = require("../../models/product.model");
const Category = require("../../models/product-category.model");
const Account = require("../../models/accounts.model");
const User = require("../../models/user.model");
// [GET] /
module.exports.index = async (req,res) => {

    const statistic = {
        categoryProduct: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        product: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        account: {
          total: 0,
          active: 0,
          inactive: 0,
        },
        user: {
          total: 0,
          active: 0,
          inactive: 0,
        },
    };

    // category Product
    statistic.categoryProduct.total = await Category.countDocuments({
        deleted: false
    });

    statistic.categoryProduct.active = await Category.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.categoryProduct.inactive = await Category.countDocuments({
        deleted: false,
        status: "inactive"
    });

    // End category Product


    //product
    statistic.product.total = await Product.countDocuments({
        deleted: false
    });

    statistic.product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });


    //end product

    //Account
    statistic.account.total = await Account.countDocuments({
        deleted: false
    });

    statistic.account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.account.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });
    //End Account
    
    
    //user
    statistic.user.total = await User.countDocuments({
        deleted: false
    });

    statistic.user.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });

    statistic.user.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });
    //End user

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}