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
module.exports ={addTemplate,getAllTemplate}