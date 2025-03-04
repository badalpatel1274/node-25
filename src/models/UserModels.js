const mongoose = require('mongoose')
// const Schema = mongoose.Schema()
const userSchema =  mongoose.Schema({

        
    username:{
        type:String
    },

    age:{
        type:Number
    },

    roleId:{
        type:mongoose.Schema.Types.ObjectId,     
        ref:"roles"
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }




},{timestamp:true})
module.exports =mongoose.model("User" , userSchema)