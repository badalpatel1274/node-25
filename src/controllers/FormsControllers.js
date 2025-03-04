const formsModels = require('../models/FormsModels')

const addFormDetails = async (req, res) => {
        try {
            const savedInfo = await formsModels.create(req.body)
            res.json({
                message: "Form details added successfully",
                data: savedInfo
            })
        } catch (error) {
            res.status(500).json({ error: error})
        }
}

const getAllFormDetails = async (req, res) => {

    try {
        const allFormDetails = await formsModels.find().populate("userId")
        res.json({
            message: "All form details fetched successfully",
            data: allFormDetails
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }

}
module.exports = {addFormDetails, getAllFormDetails}