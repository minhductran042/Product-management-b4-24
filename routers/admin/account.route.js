const express = require('express');
const controller = require("../../controllers/admin/account.controller");
const router = express.Router();

router.get("/",controller.index);
router.get("/create",controller.create);

module.exports = router;