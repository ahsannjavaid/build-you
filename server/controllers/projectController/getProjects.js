const ProjectSch = require("../../models/ProjectSch");

// getting the posted project information...
async function getProjects(req, res) {
  try {
    const result = await ProjectSch.find().select("-projectImage");;
    if (result.length) {
      res.status(200).send({
        success: true,
        message: "Projects fetched successfully!",
        data: result,
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
      message: "Something went wrong while fetching Projects.",
    });
  }
}

module.exports = getProjects;
