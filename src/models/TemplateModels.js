const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    name:{
        type:String,
        required :true,
        unique:true
    },
    desc:{
        type:String,
    },
    previewImg:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("Template", templateSchema)