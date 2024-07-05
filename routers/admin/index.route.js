const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const systemConfig = require("../../config/system");
module.exports.index = (app) => {

   const path = `/${systemConfig.prefixAdmin}`;
   app.use(`${path}/dashboard`, dashboardRouter);
   app.use(`${path}/products`,productRouter);
}
