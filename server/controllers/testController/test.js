async function test(req, res) {
  try {
    res.status(200).send({
      success: true,
      message: "Testing completed successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while testing.",
    });
  }
}

module.exports = test;
