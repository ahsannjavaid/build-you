const express = require("express");

const router = express.Router();

router.get("/users-details", getUsers);

module.exports = router;