const express = require('express')
const cors = require('cors')
const formidableMiddleware = require("express-formidable");
// const fileUpload = require('express-fileupload')
const Profiles = require('./models/ProfileSch')
const Projects = require('./models/ProjectSch')
require('./db/config')
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");

const app = express()
const PORT = process.env.PORT || 5000

// form-data middleware
app.use(formidableMiddleware());

app.use(cors())
// app.use(express.json())
// app.use(fileUpload())
// app.use(express.static('public'))

//APIs
app.use("", userRoute);
app.use("", profileRoute);










// posting the project...
app.put("/profile-increment", async(req, res) => {
    const incProject = await Profiles.updateOne({username: req.body.username}, {$inc: {projects: 1}})
    res.send(incProject)
})
// app.post("/projects", async(req, res) => {
//     if (req.files) {
//         var pi = req.files.projectImage
//         pi.mv("public/uploads/" + pi.name, async function (err) {
//             if (err) {
//                 res.json({ "status": "File not uploaded!" })
//             }
//             else {
//                 const project = await Projects({
//                     username: req.body.username,
//                     projectImage: pi.name,
//                     projectName: req.body.projectName,
//                     projectDescription: req.body.projectDescription,
//                     projectTag: req.body.projectTag,
//                     projectTool: req.body.projectTool,
//                     projectLink: req.body.projectLink,
//                     likes: req.body.likes,
//                     views: req.body.views
//                 })
//                 await project.save()
//                 res.json({ "status": "Project inserted successfully!" })
//             }
//         })
//     }
//     else {
//         const project = await Projects({
//             username: req.body.username,
//             projectName: req.body.projectName,
//             projectDescription: req.body.projectDescription,
//             projectTag: req.body.projectTag,
//             projectTool: req.body.projectTool,
//             projectLink: req.body.projectLink,
//             likes: req.body.likes,
//             views: req.body.views
//         })
//         await project.save()
//         res.json({ "status": "Project inserted successfully!" })
//     }
// })









app.get("/projects-details",async(req,res) => {
    const projects = await Projects.find()
    res.send(projects)
})

//deleting the project...
app.delete("/project-details/:id",async(req,res) => {
    const _id = req.params.id
    const result = await Projects.findByIdAndDelete(_id)
    res.send(result)
})
app.put("/profile-decrement", async(req, res) => {
    const decProject = await Profiles.updateOne({username: req.body.username}, {$inc: {projects: -1}})
    res.send(decProject)
})


app.get("/", (req, res) => {
    res.send("Home page displayed")
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})