const mongoose = require('mongoose')
// const Schema = mongoose.Schema()
const userSchema =  mongoose.Schema({

        
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
        type:Boolean
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId,     
        ref:"roles"
    }




})
module.exports =mongoose.model("User" , userSchema)