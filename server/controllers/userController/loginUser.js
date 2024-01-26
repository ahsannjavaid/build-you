const UserSch = require("../../models/UserSch");
const ProfileSch = require("../../models/ProfileSch");

async function loginUser(req, res) {
    try {
        const { username, password } = req.fields;

        const result = await UserSch.findOne({ username });
        if (result) {
          if (result.password === password) {
            const profile = await ProfileSch.findOne({ username });

            res.status(200).send({
              success: true,
              message: "User login successfully!",
              hasProfile: profile ? true : false,
              data: result,
              profileData: profile
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Wrong password!",
            });
          }
        } else {
          res.status(404).send({
            success: false,
            message: "We do not have any User with this username, please signup.",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Something went wrong while logging in user.",
        });
      }
}

module.exports = loginUser;
