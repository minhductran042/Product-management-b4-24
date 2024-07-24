const multer = require('multer');

module.exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/') // khi up anh thi se luu vao day
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()}-${file.originalname}`)
    }
});
  
