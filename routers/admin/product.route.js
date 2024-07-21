const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");


router.get("/",controller.index);

router.patch("/change-status/:statusChange/:id",controller.changeStatus);

router.patch("/change-multi",controller.changeMulti);

router.patch("/delete/:id",controller.deleteItem);

router.get("/trash",controller.trash);

router.patch("/restore/:id",controller.restoreItem);

router.delete("/permanentlyDelete/:id",controller.permanentlyDelete);

router.patch("/changePosition/:id",controller.changePosition)

router.get("/create",controller.create);

router.post("/create",controller.createPost);

module.exports = router;