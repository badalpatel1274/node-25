const { genSaltSync } = require('bcrypt')
const userModel = require('../models/UserModels')
const bcrypt = require('bcrypt')


const addUser = async(req,res)=>{
        const user = await userModel.create(req.body)

        res.json({
            message:"User is created",
            data : user
        })
        
}

const getUser = async(req,res)=>{
    const savedUser =  await userModel.find().populate("roleId", "roleName -_id")

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

const loginUser = async(req,res)=>{

    const email = req.body.email;
    const password = req.body.password
    const foundUserFromEmail = await userModel.findOne({email:email}).populate("roleId")
    console.log(foundUserFromEmail)
    if(foundUserFromEmail != null){
        const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password)
        if(isMatch == true ){
            res.status(200).json({
                message:"login success...",
                data: foundUserFromEmail,
            })
        }else{
            res.status(404).json({
                message:"invalid password..."
            })
        }
    }else{
        res.status(404).json({
            message:"email not found"   
        })
    }
}

const signUp = async(req,res)=>{

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword
        const createdUser= await userModel.create(req.body)
        res.status(201).json({
                    message:"user creted",
                    data:createdUser
        })
}


module.exports = {addUser,getUser,deleteUser,getUserId ,signUp,loginUser}