
const roleModel = require("../models/RoleModels")

const getUserRole = async(req,res)=>{
const roles = await roleModel.find()

    res.json({
        message:"roles is sucessfully fetched",
       data: roles,
    })
}

const addRole = async(req,res)=>{
    const savedRole = await roleModel.create(req.body)
    res.json({
        message:"role Created",
        data:savedRole
    })
}

const deleteRole = async(req,res)=>{
console.log(req.params.id)
const deletedRole = await roleModel.findByIdAndDelete(req.params.id)

res.json({
    message:"role deleted successfully",
    data: deletedRole
})
}

const getRoleId =async(req,res)=>{
    const foundRole = await roleModel.findById(req.params.id)
    res.json({
        message:"role Fetched",
        data: foundRole
    })
}

module.exports = {getUserRole,addRole,deleteRole,getRoleId}