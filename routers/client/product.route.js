const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/product.controller");


router.get('/', controller.index);



// router.post("/create", controller.create);

// router.patch("/edit", contronller.edit);

// router.get("/detail", contronller.detail);

module.exports = router;