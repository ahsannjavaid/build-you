const ProfileSch = require("../../models/ProfileSch");

// getting the posted profile information...
async function getProfiles(req, res) {
  try {
    const result = await ProfileSch.find();
    if (result.length) {
      res.status(200).send({
        success: true,
        message: "Profiles fetched successfully!",
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
      message: "Something went wrong while fetching Profiles.",
    });
  }
}

module.exports = getProfiles;
