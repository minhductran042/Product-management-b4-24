const express = require('express');
const controller = require("../../controllers/admin/role.controller");
const router = express.Router();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post("/create",controller.createPost);

module.exports = router;