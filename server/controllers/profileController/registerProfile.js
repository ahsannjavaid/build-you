const ProfileSch = require("../../models/ProfileSch");
const fs = require("fs");

// posting profiles...
async function registerProfile(req, res) {
  try {
    const { username, email } = req.fields;
    const { profileImage } = req.files;

    switch (true) {
      case !email:
        return res.status(206).send({
          success: false,
          message: "Email is mandatory.",
        });
      case !username:
        return res.status(206).send({
          success: false,
          message: "Username is mandatory.",
        });
      case profileImage && profileImage.size > 1000000:
        return res.status(413).send({
          success: false,
          message: "Image size exceeds the maximum allowed size.",
        });
      default:
        break;
    }

    const profile = await ProfileSch(req.fields);

    if (profileImage) {
      profile.profileImage.data = fs.readFileSync(profileImage.path);
      profile.profileImage.contentType = profileImage.type;
    }

    const result = await profile.save();

    const { profileImage: photo, ...objectWithoutProfileImageField } = result.toObject();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Profile registered successfully!",
        data: objectWithoutProfileImageField,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering Profile.",
    });
  }
}

module.exports = registerProfile;
