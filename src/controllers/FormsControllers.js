const FormsModels = require("../models/FormsModels");
const Resume = require("../models/ResumeModels");
const multer = require('multer')
const path = require('path');
const cloudinaryUtil = require('../util/CloudinaryUtils');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({
    storage: storage,

}).single("image")



const addFormDetails = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        console.log("File Received: ", req.file);
        console.log("Request Body: ", req.body);

        let profilePicUrl = ""; // Default empty string

        if (req.file) {
            try {
                const filePath = path.resolve(req.file.path);
                console.log("Uploading File to Cloudinary: ", filePath);

                const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(fs.createReadStream(filePath));
                console.log("Cloudinary Response: ", cloudinaryResponse);

                profilePicUrl = cloudinaryResponse.secure_url;
            } catch (error) {
                console.error("Cloudinary Upload Failed:", error);
                return res.status(500).json({ error: "Cloudinary file upload failed" });
            }
        }

        try {
            // 🛠️ Parsing JSON fields manually
            const personal = JSON.parse(req.body.personal);
            const education = JSON.parse(req.body.education);
            const experience = JSON.parse(req.body.experience);
            const skills = JSON.parse(req.body.skills);

            const savedInfo = await FormsModels.create({
                userId: req.body.userId,
                templateId: req.body.templateId,
                profilePic: profilePicUrl,  // Yeh empty string bhi ho sakta hai agar file nahi mili
                personal: personal,
                education: education,
                experience: experience,
                skills: skills
            });

            if (!savedInfo._id) {
                return res.status(400).json({ error: "Form not saved correctly" });
            }

            const newResume = new Resume({
                userId: savedInfo.userId,
                templateId: savedInfo.templateId,
                userFormId: savedInfo._id
            });

            const savedResume = await newResume.save();
            savedInfo.resumeId = savedResume._id;
            await savedInfo.save();

            res.status(200).json({
                message: "Form details and file (if uploaded) saved successfully",
                data: savedInfo
            });

        } catch (error) {
            console.error("Error Saving Form Details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};







const getAllFormDetails = async (req, res) => {
    try {
        const allFormDetails = await FormsModels.find()
            .populate("userId", "name email")
            .populate("templateId", "name previewImg")
            .populate("resumeId");
        res.json({
            message: "All form details fetched successfully",
            data: allFormDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateForms = async(req,res)=>{
    try {
        console.log("Updating Form ID:", req.params.id);
        
        const updatedData = await FormsModels.findByIdAndUpdate(req.params.id, req.body, {new:true ,  runValidators: true})
        console.log("Received Data:", req.body);
      
      if (!updatedData) {
        return res.status(404).json({ message: "Form not found" });
    }
      res.json({
        message:"Updated Sucessfully !!",
        data:updatedData
      })
    } catch (error) {
        res.status(500).json({"error":error.message})

    }
}

const getFormsById = async(req,res)=>{
    try {
        const getId = await FormsModels.findById(req.params.id)
        res.json({
            message:"Form byId is Fetched !!",
            data:getId
        })
    } catch (error) {
        res.status(500).json({error})

    }
}


module.exports = { addFormDetails, getAllFormDetails ,updateForms , getFormsById }