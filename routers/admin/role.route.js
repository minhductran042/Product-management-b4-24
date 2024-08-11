const express = require('express');
const controller = require("../../controllers/admin/role.controller");
const router = express.Router();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post("/create",controller.createPost);

router.get("/edit/:id",controller.edit);

router.patch("/edit/:id",controller.editPatch);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);

router.get("/detail/:id",controller.detail);

router.get("/trash",controller.trash);

router.patch("/delete/:id",controller.deleteItem);

router.patch("/restore/:id",controller.restoreItem);

router.delete("/permanentlyDelete/:id",controller.permanentlyDelete);


module.exports = router;