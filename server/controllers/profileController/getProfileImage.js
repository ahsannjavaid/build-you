const ProfileSch = require("../../models/ProfileSch");
const fs = require("fs");
const path = require("path");

// Define a function to read the default sample image file
const getDefaultImage = () => {
  const defaultImagePath = path.join(__dirname, "../../assets/sample-profile.jpg");
  return fs.readFileSync(defaultImagePath);
};

// getting the posted profile image...
async function getProfileImage(req, res) {
  try {
    const { id } = req.params;
    const result = await ProfileSch.findById(id).select("profileImage");

    if (result && result.profileImage && result.profileImage.data) {
      res.set("Content-Type", result.profileImage.contentType);
      return res.status(200).send(result.profileImage.data);
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
      message: "Something went wrong while fetching Profile Image.",
    });
  }
}

module.exports = getProfileImage;
