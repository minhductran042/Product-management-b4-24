const { recompileSchema } = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports.notFriend = async(req,res) => {

    const userId = res.locals.user.id;

    const users = await User.find({
        _id: { $ne: userId }, //ne : not equal 
        deleted: false,
        status: "active"
    }).select("id avatar fullName");



    res.render("client/pages/users/not-friend", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}