const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

        
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        tpye:Boolean
    }



})
module.exports =mongoose.model("User" , userSchema)