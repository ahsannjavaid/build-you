const express = require("express");
const getUsers = require("../controllers/userController/getUsers");
const registerUser = require("../controllers/userController/registerUser");
const deleteUser = require("../controllers/userController/deleteUser");

const router = express.Router();

router.get("/users-details", getUsers);
router.post("/users", registerUser);
router.delete("/user/:id", deleteUser);

module.exports = router;