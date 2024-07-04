const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
module.exports.index = (app) => {
   app.use("/admin/dashboard", dashboardRouter);
   app.use("/admin/products",productRouter);
}
