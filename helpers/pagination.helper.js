const Product = require("../models/product.model");
const ProductCategory = require("../models/product-category.model");

module.exports.paginationProduct = async (req, find) => {
  const pagination = {
    currentPage: 1,
    limitItems: 4
  };

  if(req.query.page) {
    pagination.currentPage = parseInt(req.query.page);
  }

  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  const countProducts = await Product.countDocuments(find);
  const totalPage = Math.ceil(countProducts/pagination.limitItems);
  pagination.totalPage = totalPage;

  return pagination;
}

module.exports.paginationCategory = async (req, find) => {
  const pagination = {
    currentPage: 1,
    limitItems: 4
  };

  if(req.query.page) {
    pagination.currentPage = parseInt(req.query.page);
  }

  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  const countCategory = await ProductCategory.countDocuments(find);
  const totalPage = Math.ceil(countCategory/pagination.limitItems);
  pagination.totalPage = totalPage;

  return pagination;
}
