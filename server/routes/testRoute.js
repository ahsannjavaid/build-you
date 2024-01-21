const express = require("express");
const test = require("../controllers/testController/test");

const router = express.Router();

router.get("/test", test);

module.exports = router;