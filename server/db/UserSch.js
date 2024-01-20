// user schema

const mongoose = require('mongoose')
const userSchema = mongoose.Schema ({
    fname: String,
    lname: String,
    username: String,
    password: String
})
module.exports = mongoose.model('users',userSchema)