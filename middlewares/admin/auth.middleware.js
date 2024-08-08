
module.exports.requireAuth = (req,res,next) => {
    console.log("Chạy vào requireAuth");
    next();
}