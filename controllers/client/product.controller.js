// [GET] /product/
const Product = require("../../models/product.model");

module.exports.index = async (req,res) => {

    const products = await Product
    .find({
      status: "active",
      deleted: false
    })
    .sort({
      position: "desc"
    });

    for(const item of products){
        item.priceNew = (item.price * (1-item.discountPercentage/100)).toFixed(0);
    }

    // console.log(products)

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products
    });
}


module.exports.detail = async(req,res) => {
  const slug = req.params.slug;
  
  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active"
  });

  if(product){
    res.render("client/pages/products/detail",{
      title: "Trang chi tiết sản phẩm",
      product: product
    });
  } else {
    res.redirect("/");
  }

}