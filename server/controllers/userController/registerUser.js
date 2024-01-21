const UserSch = require("../../models/UserSch");

// posting users...
async function registerUser(req, res) {
  try {
    const { fname, username, password } = req.fields;

    switch (true) {
      case !fname:
        return res.status(206).send({
          success: false,
          message: "First name is mandatory.",
        });
      case !username:
        return res.status(206).send({
          success: false,
          message: "Username is mandatory.",
        });
      case !password:
        return res.status(206).send({
          success: false,
          message: "Password is mandatory.",
        });
      default:
        break;
    }

    const userExists = await UserSch.findOne({ username });

    if (!userExists) {
      const user = await UserSch(req.fields);
      const result = await user.save();

      res.status(200).send({
        success: true,
        message: "User registered successfully!",
        data: result,
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
      message: "Something went wrong while registering User.",
    });
  }
}

module.exports = registerUser;
