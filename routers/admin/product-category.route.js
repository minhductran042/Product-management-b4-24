const express = require('express');
const multer  = require('multer');
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validate/admin/product-category.validate");
const upload = multer(); 

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost);

module.exports = router;