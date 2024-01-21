const express = require("express");
const postProject = require("../controllers/projectController/postProject");
const getProjects = require("../controllers/projectController/getProjects");
const deleteProject = require("../controllers/projectController/deleteProject");

const router = express.Router();

router.post("/project", postProject);
router.get("/projects-details", getProjects);
router.delete("/delete-project/:id/:username", deleteProject);

module.exports = router;