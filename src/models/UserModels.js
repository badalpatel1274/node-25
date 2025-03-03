const mongoose = require('mongoose')
// const Schema = mongoose.Schema()
const userSchema =  mongoose.Schema({

        
    username:{
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
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }




})
module.exports =mongoose.model("User" , userSchema)