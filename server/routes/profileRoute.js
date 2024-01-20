const express = require("express");
const getProfiles = require("../controllers/profileController/getProfiles");

const router = express.Router();

router.get("/profiles-details", getProfiles);

module.exports = router;