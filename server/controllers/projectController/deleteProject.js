const ProfileSch = require("../../models/ProfileSch");
const ProjectSch = require("../../models/ProjectSch");

// deleting the project information...
async function deleteProject(req, res) {
  try {
    const { id, username } = req.params;

    const result = await ProjectSch.findByIdAndDelete(id);

    await ProfileSch.updateOne({username}, {$inc: {projects: -1}})

    const { projectImage, ...deletedInfo } = result.toObject();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Project deleted successfully!",
        data: deletedInfo,
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
      message: "Something went wrong while deleting Project.",
    });
  }
}

module.exports = deleteProject;
