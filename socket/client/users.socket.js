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


        // Chức năng hủy gửi yêu cầu
        socket.on("CLIENT_CANCEL_FRIEND", async (userIdB) => {
            // Xóa id của A trong acceptFriends của B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                acceptFriends: userIdA
            });
    
            if(existUserAInB) {
            await User.updateOne({
                _id: userIdB
            }, {
                $pull: {
                    acceptFriends: userIdA
                }
            });
            }
    
            // Xóa id của B trong requestFriends của A 
            const existUserBInA = await User.findOne({
                _id: userIdA,
                requestFriends: userIdB
            });
    
            if(existUserBInA) {
            await User.updateOne({
                _id: userIdA
            }, {
                $pull: {
                    requestFriends: userIdB
                }
            });
            }
    
        })
        // Hết Chức năng hủy gửi yêu cầu


        //Chuc nang tu choi ket ban
        socket.on("CLIENT_REFUSE_FRIEND", async (userIdB) => {

            // Xóa id của B trong acceptFriends của A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                acceptFriends: userIdB
            });
    
            if(existUserBInA) {
                await User.updateOne({
                    _id: userIdA
                }, {
                    $pull: {
                        acceptFriends: userIdB
                    }
                });
            }
    
            // Xóa id của A trong requestFriends của B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                requestFriends: userIdA
            });
    
            if(existUserAInB) {
                await User.updateOne({
                    _id: userIdB
                }, {
                    $pull: {
                        requestFriends: userIdA
                    }
                });
            }
    
        })
        //End chuc nang tu choi ket ban


        //Chuc nang chap nhan ket ban
        socket.on("CLIENT_ACCEPT_FRIEND", async (userIdB) => {

            // Them {id,roomChatId} của B trong FriendList của A
            // Xoa id cua B trong acceptFriends cua A
            const existUserBInA = await User.findOne({
                _id: userIdA,
                acceptFriends: userIdB
            });
    
            if(existUserBInA) {
                await User.updateOne({
                    _id: userIdA
                }, {
                    $push: {
                        friendList: {
                            userId: userIdB,
                            roomChatId: ""
                        }
                    },
                    $pull: {
                        acceptFriends: userIdB
                    }
                });
            }
    
            // Them {id,roomChatId} của A trong FriendList của B
            //Xoa id cua A trong requestFriends cua B
            const existUserAInB = await User.findOne({
                _id: userIdB,
                requestFriends: userIdA
            });
    
            if(existUserAInB) {
                await User.updateOne({
                    _id: userIdB
                }, {
                    $push: {
                        friendList: {
                            userId: userIdA,
                            roomChatId: ""
                        }
                    },
                    $pull: {
                        requestFriends: userIdA
                    }
                });
            }
    
        })

        //End chuc nang ket ban
    });
}