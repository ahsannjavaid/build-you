const UserSch = require("../../models/UserSch");

// deleting user...
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const result = await UserSch.findByIdAndDelete(id);

    if (result) {
      res.status(200).send({
        success: true,
        message: "User deleted successfully!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "This User does not exist.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting User.",
    });
  }
}

module.exports = deleteUser;
