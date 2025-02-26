const userModel = require('../models/UserModels')

const addUser = async(req,res)=>{
        const user = await userModel.create(req.body)

        res.json({
            message:"User is created",
            data : user
        })
        
}

const getUser = async(req,res)=>{
    const savedUser = await userModel.find()
    res.json({
        message:"all the Users are fetched !",
        data:savedUser
    })
}

const deleteUser = async(req,res)=>{
        const deleted = await userModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"user is deleted.......",
            data:deleted
        })
}

const getUserId = async(req,res)=>{
        const getId = await userModel.findById(req.params.id)     
        res.json({
            message:"user Id is fetched !!",
            data : getId
        })
}


module.exports = {addUser,getUser,deleteUser,getUserId}