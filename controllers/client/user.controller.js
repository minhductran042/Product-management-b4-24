const md5 = require('md5');
const generateHelper = require("../../helpers/generate.hepler");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model")

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
      pageTitle: "Đăng ký tài khoản",
    });
};
  
  // [POST] /user/register
  module.exports.registerPost = async (req, res) => {
    const existUser = await User.findOne({
      email: req.body.email,
      deleted: false
    });
  
    if(existUser) {
      req.flash("error", "Email đã tồn tại!");
      res.redirect("back");
      return;
    }
  
    const userData = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      tokenUser: generateHelper.generateRandomString(30)
    };
  
    const user = new User(userData);
    await user.save();
  
    res.cookie("tokenUser", user.tokenUser);
  
    req.flash("success", "Đăng ký tài khoản thành công!");
    res.redirect("/");
  };


// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if(!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if(md5(req.body.password) != user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  if(user.status != "active") {
    req.flash("error", "Tài khoản đang bị khóa!");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  req.flash("success", "Đăng nhập thành công!");
  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
   res.clearCookie("tokenUser");
   res.redirect("/user/login");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {

  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên tài khoản",
  });
};

module.exports.forgotPasswordPost = async (req, res) => {

  const email = req.body.email;

  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  });

  if(!user) {
    req.flash("error","Email không tồn tại trong hệ thống!");
    res.redirect("back");
    return;
  }

  //Viec 1: Luu email, OTP vao database 
  const forgotPasswordData = {
    email: email,
    otp: generateHelper.generateRandomNumber(6),
    expireAt: Date.now() + 3 * 60 * 1000
  }
  
  // console.log(forgotPasswordData);

  const forgotPassword = new ForgotPassword(forgotPasswordData);
  await forgotPassword.save();

  //Viec 2 : Gui ma OTP qua email cua User


  res.send("OK");
};