const ProfileSch = require("../../models/ProfileSch");
const ProjectSch = require("../../models/ProjectSch");
const fs = require("fs");

// posting project...
async function postProject(req, res) {
  try {
    const { projectName, username } = req.fields;
    const { projectImage } = req.files;

    switch (true) {
      case !projectName:
        return res.status(206).send({
          success: false,
          message: "Project name is mandatory.",
        });
      case !username:
        return res.status(206).send({
          success: false,
          message: "Username is mandatory.",
        });
      case projectImage && projectImage.size > 1000000:
        return res.status(413).send({
          success: false,
          message: "Image size exceeds the maximum allowed size.",
        });
      default:
        break;
    }

    const { profession } = await ProfileSch.findOne({username}).select("profession");
    req.fields.projectTag = profession;
    const project = await ProjectSch(req.fields);

    if (projectImage) {
      project.projectImage.data = fs.readFileSync(projectImage.path);
      project.projectImage.contentType = projectImage.type;
    }

    const result = await project.save();
    await ProfileSch.updateOne({username}, {$inc: {projects: 1}})

    const { projectImage: photo, ...objectWithoutProjectImageField } = result.toObject();

    res.status(200).send({
      success: true,
      message: "Project posted successfully!",
      data: objectWithoutProjectImageField,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while posting Project.",
    });
  }
}

module.exports = postProject;
