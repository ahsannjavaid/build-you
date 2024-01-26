const ProfileSch = require("../../models/ProfileSch");
const ProjectSch = require("../../models/ProjectSch");

// getting the posted profile information...
async function getProfileAndProjects(req, res) {
  try {
    const { username } = req.params;

    const result = await ProfileSch.findOne({ username }).select(
      "-profileImage"
    );
    if (result) {
      const projects = await ProjectSch.find({ username }).select(
        "-projectImage"
      );
      res.status(200).send({
        success: true,
        message: "Profile fetched successfully!",
        projectsCount: projects.length,
        data: result,
        projectsData: projects,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "No record found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Profile.",
    });
  }
}

module.exports = getProfileAndProjects;
