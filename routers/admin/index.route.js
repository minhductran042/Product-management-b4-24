const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const roleRouter = require("./role.route");
const accountRouter = require("./account.route");
const authRouter = require("./auth.route");
const profileRoute = require("./profile.route");
const systemConfig = require("../../config/system");

const authMiddleware = require("../../middlewares/admin/auth.middleware"); 

const productCategoryRouter = require("./product-category.route");
module.exports.index = (app) => {

   const path = `/${systemConfig.prefixAdmin}`;
   app.use(
      `${path}/dashboard`,
      authMiddleware.requireAuth,
      dashboardRouter
   );
   app.use(
      `${path}/products`,
      authMiddleware.requireAuth,
      productRouter
   );
   app.use(
      `${path}/products-category`,
      authMiddleware.requireAuth,
      productCategoryRouter
   );
   app.use(
      `${path}/roles`,
      authMiddleware.requireAuth,
      roleRouter
   );
   app.use(`${path}/accounts`,
      authMiddleware.requireAuth,
      accountRouter
   );
   app.use(`${path}/auth`,authRouter);

   app.use(
      `${path}/profile`,
      authMiddleware.requireAuth,
      profileRoute
    );
}
