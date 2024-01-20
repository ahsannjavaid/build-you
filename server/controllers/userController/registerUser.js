const UserSch = require("../../models/UserSch");

// posting users...
async function registerUser(req, res) {
  try {
    const { fname, username, password } = req.body;

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

    const user = await UserSch(req.body);
    const result = await user.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "User registered successfully!",
        data: result,
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
