
const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");
const Role = require("../../models/role.model");

module.exports.requireAuth = async (req,res,next) => {

    if(!req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const account = await Account.findOne({
        token: req.cookies.token,
        deleted: false
    }).select("fullName email phone avatar role_id");


    if(!account) {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
        return;
    }

    const role = await Role.findOne({
        _id: account.role_id,
    }).select("title permissions");

    // console.log(role);

    res.locals.account = account; // bat ki router nao chay qua middleware se dung duoc user
    res.locals.role = role;

    next();
}