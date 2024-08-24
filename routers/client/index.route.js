const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route"); 
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");
const chatRouter = require("./chat.route");


const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/admin/setting.middleware");

module.exports.index = (app) => {
   app.use(categoryMiddleware.category);
   app.use(cartMiddleware.cartId);
   app.use(userMiddleware.userInfo);
   app.use(settingMiddleware.setting);
   app.use("/", homeRouter);
   app.use("/products",productRouter);
   app.use("/search",searchRouter);
   app.use("/cart",cartRouter);
   app.use("/checkout",checkoutRouter);
   app.use("/user",userRouter);
   app.use("/chat",userMiddleware.requireAuth,chatRouter);
   
}
