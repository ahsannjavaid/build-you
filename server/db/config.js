const mongoose = require('mongoose')
require('dotenv').config()

const DB = process.env.DATABASE
mongoose.connect(DB).then(() => {
    console.log("Connection Successfull!")
}).catch((error) => {
    console.log(error)
})