const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
        name:{
            type : String,

        },
        description:{
            type:String
        }
})

module.exports = mongoose.model("roles", roleSchema)