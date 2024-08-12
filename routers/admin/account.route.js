const express = require('express');
const multer  = require('multer');
const controller = require("../../controllers/admin/account.controller");
const router = express.Router();
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/",controller.index);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    controller.createPost
);

router.get("/edit/:id",controller.edit);

router.patch(
    "/edit/:id",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    controller.editPatch 
);

router.patch("/change-status/:statusChange/:id",controller.changeStatus); 

router.get("/detail/:id",controller.detail);


router.get("/trash",controller.trash);

router.patch("/delete/:id",controller.deleteItem);


router.patch("/restore/:id",controller.restoreItem);

router.delete("/permanentlyDelete/:id",controller.permanentlyDelete);


module.exports = router;