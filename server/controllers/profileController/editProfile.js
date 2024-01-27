const ProfileSch = require("../../models/ProfileSch");
const fs = require("fs");

// editing the profile information...
async function editProfile(req, res) {
  try {
    const { id } = req.params;
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

    const thisUsername = await ProfileSch.findById(id).select("username");
    const allowedLength = thisUsername.username === username ? 1 : 0;

    const isDuplicate = await ProfileSch.find({ username });

    if (isDuplicate.length <= allowedLength) {
      const result = await ProfileSch.findByIdAndUpdate(id, req.fields, {
        new: true,
      });

      if (profileImage) {
        const imageData = fs.readFileSync(profileImage.path);
      
        result.profileImage = {
          data: imageData,
          contentType: profileImage.type,
        };
      }

      await result.save();

      const { profileImage: photo, ...editedInfo } = result.toObject();

      res.status(200).send({
        success: true,
        message: "Profile edited successfully!",
        data: editedInfo,
      });
    } else {
      res.status(409).send({
        success: false,
        message: "This username already exists.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing Profile.",
    });
  }
}

module.exports = editProfile;
