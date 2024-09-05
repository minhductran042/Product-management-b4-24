const User = require("../../models/user.model");

module.exports = (req,res) => {

    const userIdA = res.locals.user.id;

    // console.log("OK");

    _io.once("connection", (socket) => {

        //Khi A gui yeu cau cho B
        socket.on("CLIENT_ADD_FRIEND", async (userIdB) => {
            // console.log(userIdA);
            // console.log(userIdB);

            // Them id cua A vao accept friend cua B
            const existUserAInB = await User.findOne({ // kiem tra xem da co B chua
                _id: userIdB,
                acceptFriends: userIdA
            });

            if(!existUserAInB) {
                await User.updateOne({
                    _id: userIdB
                }, {
                    $push: {
                        acceptFriends: userIdA
                    }
                });
            }

            //Them id cua B vao request friend cua A
            const existUserBInA = await User.findOne({ // kiem tra xem da co B chua
                _id: userIdA,
                requestFriends: userIdB
            });

            if(!existUserBInA) {
                await User.updateOne({
                    _id: userIdA
                }, {
                    $push: {
                        requestFriends: userIdB
                    }
                });
            }
        })
        //End khi A gui yeu cau cho B
    });
}