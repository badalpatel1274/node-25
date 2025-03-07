const mongoose = require('mongoose')
const { schema } = require('./TemplateModels')
const Schema = mongoose.Schema

const resumeSchema = new Schema({

        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        templateId:{
            type:Schema.Types.ObjectId,
            ref:"Template",
            required:true
        },
        userFormId:{
            type:Schema.Types.ObjectId,
            ref:"Forms",
            required:true

        }

},{timestamps:true})


module.exports = mongoose.model("Resume", resumeSchema)