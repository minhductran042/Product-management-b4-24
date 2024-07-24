const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const multer  = require('multer');

const validate = require("../../validate/admin/product.validate");

const storageMulterHelper = require('../../helpers/storageMulter.helper');

const upload = multer({ storage: storageMulterHelper.storage }); 

router.get("/",controller.index);

router.patch("/change-status/:statusChange/:id",controller.changeStatus); 

router.patch("/change-multi",controller.changeMulti);

router.patch("/delete/:id",controller.deleteItem);

router.get("/trash",controller.trash);

router.patch("/restore/:id",controller.restoreItem);

router.delete("/permanentlyDelete/:id",controller.permanentlyDelete);

router.patch("/changePosition/:id",controller.changePosition)

router.get("/create",controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'), // up anh vao thu muc upload
    validate.createPost,
    controller.createPost  
);

module.exports = router;