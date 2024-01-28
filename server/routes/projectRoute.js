const express = require("express");
const postProject = require("../controllers/projectController/postProject");
const getProjects = require("../controllers/projectController/getProjects");
const deleteProject = require("../controllers/projectController/deleteProject");
const getProjectImage = require("../controllers/projectController/getProjectImage");
const getProject = require("../controllers/projectController/getProject");

const router = express.Router();

router.post("/project", postProject);
router.get("/projects-details", getProjects);
router.get("/projects-details/:id", getProject);
router.delete("/delete-project/:id/:username", deleteProject);
router.get("/project-image/:id", getProjectImage);

module.exports = router;