const express = require("express");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");

const testRoute = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
const projectRoute = require("./routes/projectRoute");
require("./db/config");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(formidableMiddleware());
app.use(cors());

//APIs
app.use("", testRoute);
app.use("", userRoute);
app.use("", profileRoute);
app.use("", projectRoute);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
