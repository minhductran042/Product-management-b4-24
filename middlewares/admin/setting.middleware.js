const systemConfig = require("../../config/system");
const Setting = require("../../models/setting.model");

module.exports.setting = async (req, res, next) => {
  const setting = await Setting.findOne({})
  res.locals.setting = setting;
  next();
}