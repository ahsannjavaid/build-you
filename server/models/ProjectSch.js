// project schema

const mongoose = require('mongoose')
const projectSchema = mongoose.Schema({
    projectImage: {
        data: Buffer,
      contentType: String
    },
    projectName: String,
    projectDescription: String,
    projectTag: String,
    projectTool: String,
    projectLink: String,
    username: String,
    likes: Number,
    views: Number
})
module.exports = mongoose.model("projects",projectSchema)