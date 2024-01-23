const ProjectSch = require("../../models/ProjectSch");
const fs = require("fs");
const path = require("path");

// Define a function to read the default sample image file
const getDefaultImage = () => {
  const defaultImagePath = path.join(__dirname, "../../assets/sample-profile.jpg");
  return fs.readFileSync(defaultImagePath);
};

// getting the posted project image...
async function getProjectImage(req, res) {
  try {
    const { id } = req.params;
    const result = await ProjectSch.findById(id).select("projectImage");

    if (result && result.projectImage && result.projectImage.data) {
      res.set("Content-Type", result.projectImage.contentType);
      return res.status(200).send(result.projectImage.data);
    } else {
      // Send a default sample image if no record is found
      const defaultImage = getDefaultImage();
      res.set("Content-Type", "image/jpeg"); // Set the content type for your default image
      return res.status(200).send(defaultImage);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching Project Image.",
    });
  }
}

module.exports = getProjectImage;
