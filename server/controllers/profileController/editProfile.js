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

    const isUsernameUnique = await ProfileSch.exists({ username });

    if (isUsernameUnique) {
      // if the username is unique, continue
      const profile = await ProfileSch.findByIdAndUpdate(id, req.fields);

      if (profileImage) {
        profile.profileImage.data = fs.readFileSync(profileImage.path);
        profile.profileImage.contentType = profileImage.type;
      }
  
      const result = await profile.save();
  
      if (result) {
        res.status(200).send({
          success: true,
          message: "Profile edited successfully!",
          data: result,
        });
      }
    } else {
      // if the username is not unique, handle accordingly
      res.status(409).send({
        success: false,
        message: "Username is not unique",
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



// app.put("/profile-details/:id", async (req, res) => {
//     const _id = req.params.id
//     if (req.files) {
//         var pp = req.files.profileImage
//         pp.mv("public/uploads/" + pp.name, async function (err) {
//             if (err) {
//                 res.json({ "status": "File not uploaded!" })
//             }
//             else {
//                 const updateProfile = await Profiles.findByIdAndUpdate(_id, {
//                     username: req.body.username,
//                     profession: req.body.profession,
//                     description: req.body.description,
//                     phoneNum: req.body.phoneNum,
//                     email: req.body.email,
//                     countryName: req.body.countryName,
//                     projects: req.body.projects,
//                     followers: req.body.followers,
//                     following: req.body.following,
//                     profileImage: pp.name
//                 })
//                 res.send(updateProfile)
//             }

//         })
//     }
//     else {
//         const updateProfile = await Profiles.findByIdAndUpdate(_id, {
//             username: req.body.username,
//             profession: req.body.profession,
//             description: req.body.description,
//             phoneNum: req.body.phoneNum,
//             email: req.body.email,
//             countryName: req.body.countryName,
//             projects: req.body.projects,
//             followers: req.body.followers,
//             following: req.body.following,
//         })
//         res.send(updateProfile)
//     }
// })