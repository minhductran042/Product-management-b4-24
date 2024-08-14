const homeRouter = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports.index = (app) => {
   app.use(categoryMiddleware.category);
   app.use("/", homeRouter);
   app.use("/products",productRouter);
   app.use("/search",searchRouter);
}
