const dashboardRouter = require("./dashboard.route");
module.exports.index = (app) => {
   app.use("/admin/dashboard", dashboardRouter);
}
