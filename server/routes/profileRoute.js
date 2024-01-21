const express = require("express");
const getProfiles = require("../controllers/profileController/getProfiles");
const registerProfile = require("../controllers/profileController/registerProfile");
const getProfileImage = require("../controllers/profileController/getProfileImage");

const router = express.Router();

router.get("/profiles-details", getProfiles);
router.post("/profiles", registerProfile);
router.get("/profile-image/:id", getProfileImage);

module.exports = router;