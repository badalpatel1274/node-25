const templateModel = require('../models/TemplateModels')

const addTemplate = async (req,res)=>{

        try {
            const savedTemplate =await templateModel.create(req.body)
            res.json({
                message:"Template was added...",
                data:savedTemplate
            })
        } catch (error) {
            res.status(500).json({error})
        }
    }

const getAllTemplate = async(req,res)=>{
    try {
        const getTemplate = await templateModel.find()
        res.json({
            message:"All Template...",
            data:getTemplate
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const deleteTemplate = async (req,res)=>{
    try {
        const deletedTemplate = await templateModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"Template Was Deleted !!",
            data:deletedTemplate
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

const getTemplatebyId = async(req,res)=>{
    try {
        const getId = await templateModel.findById(req.params.id)
        res.json({
            message:"Template Id is Fetched !!",
            data:getId
        })
    } catch (error) {
        res.status(500).json({error})

    }
}

module.exports ={addTemplate,getAllTemplate,deleteTemplate,getTemplatebyId}