const express = require('express');
const multer  = require('multer');
const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validate/admin/product-category.validate");
const upload = multer(); 

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",controller.index);

router.get("/create",controller.create);

router.patch("/change-status/:statusChange/:id",controller.changeStatus); 

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost);

router.patch("/delete/:id",controller.deleteItem);

router.get("/detail/:id",controller.detail);

router.patch("/change-position/:id", controller.changePosition);

router.get("/edit/:id", controller.edit);

router.get("/trash",controller.trash);

router.patch("/restore/:id",controller.restoreItem);

router.delete("/permanentlyDelete/:id",controller.permanentlyDelete);

router.patch(
  "/edit/:id", 
  upload.single('thumbnail'),
  uploadCloud.uploadSingle,
  validate.createPost,
  controller.editPatch
);
module.exports = router;