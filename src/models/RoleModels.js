const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
        roleName:{
            type : String,

        },
        description:{
            type:String
        }
})

module.exports = mongoose.model("roles", roleSchema)