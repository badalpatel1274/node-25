const FormsModels = require("../models/FormsModels");
const Resume = require("../models/ResumeModels");

const addFormDetails = async (req, res) => {
    try {
        // ✅ Step 1: Pehle Form Data Save Karo (Resume ID ke bina)
        const savedInfo = await FormsModels.create({
            userId: req.body.userId,
            templateId: req.body.templateId,
            personal: req.body.personal,
            education: req.body.education,
            experience: req.body.experience,
            skills: req.body.skills,
        });

        if (!savedInfo._id) {
            return res.status(400).json({ error: "Form not saved correctly" });
        }

        // ✅ Step 2: Resume Entry Create Karo & Form ID Ko Link Karo
        // ✅ Step 2: Ensure `userFormId` exists before creating Resume
        const newResume = new Resume({
            userId: savedInfo.userId,
            templateId: savedInfo.templateId,
            userFormId: savedInfo._id, // ✅ Ensure userFormId is assigned
        });

        const savedResume = await newResume.save(); // ✅ Save Resume

        // ✅ Step 3: Resume ID Ko Form Model Me Update Karo
        savedInfo.resumeId = savedResume._id;
        await savedInfo.save(); // ✅ Update Form with resumeId

        res.status(200).json({
            message: "Form details added successfully",
            data: savedInfo,
        });
    } catch (error) {
        console.error("Form Submission Error:", error);
        res.status(500).json({ error: error.message });
    }
};


const getAllFormDetails = async (req, res) => {
    try {
        const allFormDetails = await FormsModels.find()
            .populate("userId", "name email") // ✅ Fetch only name & email
            .populate("templateId", "name previewImg") // ✅ Fetch only name & preview image
            .populate("resumeId"); // ✅ Fetch Full Resume Data

        res.json({
            message: "All form details fetched successfully",
            data: allFormDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {addFormDetails, getAllFormDetails}