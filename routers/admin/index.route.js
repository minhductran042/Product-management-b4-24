const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const roleRouter = require("./role.route");
const systemConfig = require("../../config/system");

const productCategoryRouter = require("./product-category.route");
module.exports.index = (app) => {

   const path = `/${systemConfig.prefixAdmin}`;
   app.use(`${path}/dashboard`, dashboardRouter);
   app.use(`${path}/products`,productRouter);
   app.use(`${path}/products-category`,productCategoryRouter);
   app.use(`${path}/roles`,roleRouter);
}
