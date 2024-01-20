// profile schema

const mongoose = require('mongoose')
const profileSchema = mongoose.Schema ({
    username: String,
    phoneNum: String,
    email: String,
    countryName: String,
    profession: String,
    description: String,
    profileImage: String,
    projects: Number,
    followers: Number,
    following: Number
})
module.exports = mongoose.model('profiles',profileSchema)