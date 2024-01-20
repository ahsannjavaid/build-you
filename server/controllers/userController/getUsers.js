const UserSch = require("../../models/UserSch");

// getting users...
async function getUsers(req, res) {
  try {
    const result = await UserSch.find();
    if (result.length) {
      res.status(200).send({
        success: true,
        message: "Users fetched successfully!",
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
      message: "Something went wrong while fetching Users.",
    });
  }
}

module.exports = getUsers;
