const ProjectSch = require("../../models/ProjectSch");

// getting the posted project information...
async function getProject(req, res) {
  try {
    const { id } = req.params;

    const result = await ProjectSch.findById(id).select("-projectImage");
  
    if (result) {
      res.status(200).send({
        success: true,
        message: "Project details fetched successfully!",
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
      message: "Something went wrong while fetching Project details.",
    });
  }
}

module.exports = getProject;
