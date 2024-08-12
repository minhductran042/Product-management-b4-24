const Product = require("../../models/product.model.js");

// [GET] 
module.exports.index = async (req,res) => {
    
    const productsFeatured = await Product
    .find({
        featured: "1",
        status: "active",
        deleted: false
    })
    .sort({position: "desc"})
    .limit(6)
    .select("-description"); // lay ra tat ca tru truong description
    
    console.log(productsFeatured);

    for(const item of productsFeatured){
        item.priceNew = (item.price * 
            (1-item.discountPercentage/100)).toFixed(0);
    }

    const productsNew = await Product
    .find({
        status: "active",
        deleted: false
    })
    .sort({position: "desc"})
    .limit(6)
    .select("-description");

    for(const item of productsNew){
        item.priceNew = (item.price * 
            (1-item.discountPercentage/100)).toFixed(0);
    }


    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew 
    });

    


}