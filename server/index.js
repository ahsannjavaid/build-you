const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const Users = require('./db/UserSch')
const Profiles = require('./db/ProfileSch')
const Projects = require('./db/ProjectSch')
require('./db/config')

const app = express()
const PORT = process.env.PORT || 1234

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))

// posting users...
app.post("/users", async (req, res) => {
    const user = await Users(req.body)
    await user.save();
})

// getting users...
app.get("/users-details", async (req, res) => {
    const result = await Users.find()
    res.send(result)
})

// posting profile...
app.post("/profiles", async (req, res) => {
    if (req.files) {
        var pp = req.files.profileImage
        pp.mv("public/uploads/" + pp.name, async function (err) {
            if (err) {
                res.json({ "status": "File not uploaded!" })
            }
            else {
                const profile = await Profiles({
                    username: req.body.username,
                    profession: req.body.profession,
                    description: req.body.description,
                    phoneNum: req.body.phoneNum,
                    email: req.body.email,
                    countryName: req.body.countryName,
                    projects: req.body.projects,
                    followers: req.body.followers,
                    following: req.body.following,
                    profileImage: pp.name
                })
                await profile.save()
                res.json({ "status": "Record inserted successfully!" })
            }
        })
    }
    else {
        const profile = await Profiles({
            username: req.body.username,
            profession: req.body.profession,
            description: req.body.description,
            phoneNum: req.body.phoneNum,
            email: req.body.email,
            countryName: req.body.countryName,
            projects: req.body.projects,
            followers: req.body.followers,
            following: req.body.following,
        })
        await profile.save()
        res.json({ "status": "Record inserted successfully!" })
    }
})

// getting the posted profile information...
app.get("/profiles-details", async (req, res) => {
    const result = await Profiles.find()
    res.send(result)
})

// editing the profile information...
app.put("/profile-details/:id", async (req, res) => {
    const _id = req.params.id
    if (req.files) {
        var pp = req.files.profileImage
        pp.mv("public/uploads/" + pp.name, async function (err) {
            if (err) {
                res.json({ "status": "File not uploaded!" })
            }
            else {
                const updateProfile = await Profiles.findByIdAndUpdate(_id, {
                    username: req.body.username,
                    profession: req.body.profession,
                    description: req.body.description,
                    phoneNum: req.body.phoneNum,
                    email: req.body.email,
                    countryName: req.body.countryName,
                    projects: req.body.projects,
                    followers: req.body.followers,
                    following: req.body.following,
                    profileImage: pp.name
                })
                res.send(updateProfile)
            }

        })
    }
    else {
        const updateProfile = await Profiles.findByIdAndUpdate(_id, {
            username: req.body.username,
            profession: req.body.profession,
            description: req.body.description,
            phoneNum: req.body.phoneNum,
            email: req.body.email,
            countryName: req.body.countryName,
            projects: req.body.projects,
            followers: req.body.followers,
            following: req.body.following,
        })
        res.send(updateProfile)
    }
})








// posting the project...
app.put("/profile-increment", async(req, res) => {
    const incProject = await Profiles.updateOne({username: req.body.username}, {$inc: {projects: 1}})
    res.send(incProject)
})
app.post("/projects", async(req, res) => {
    if (req.files) {
        var pi = req.files.projectImage
        pi.mv("public/uploads/" + pi.name, async function (err) {
            if (err) {
                res.json({ "status": "File not uploaded!" })
            }
            else {
                const project = await Projects({
                    username: req.body.username,
                    projectImage: pi.name,
                    projectName: req.body.projectName,
                    projectDescription: req.body.projectDescription,
                    projectTag: req.body.projectTag,
                    projectTool: req.body.projectTool,
                    projectLink: req.body.projectLink,
                    likes: req.body.likes,
                    views: req.body.views
                })
                await project.save()
                res.json({ "status": "Project inserted successfully!" })
            }
        })
    }
    else {
        const project = await Projects({
            username: req.body.username,
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription,
            projectTag: req.body.projectTag,
            projectTool: req.body.projectTool,
            projectLink: req.body.projectLink,
            likes: req.body.likes,
            views: req.body.views
        })
        await project.save()
        res.json({ "status": "Project inserted successfully!" })
    }
})









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