// [GET] /chat/
module.exports.index = async (req, res) => {

    _io.on("connection",(socket) => { // on : lắng nghe xem người nào kết nối đến server ko
        console.log('Có 1 người dùng kết nối',socket.id);
    });

    res.render("client/pages/chat/index", {
      pageTitle: "Chat",
    });
  };